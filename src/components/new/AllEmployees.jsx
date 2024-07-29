import { useState, useEffect } from "react";
import axiosDB from "../../axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { HrNav } from "./HrNav";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const AllEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [managers, setManagers] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedManager, setSelectedManager] = useState("");
    const [visible, setVisible] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const getAllEmployees = async () => {
            const employeeAll = await axiosDB.get("/Employee/getAll", {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem('token'),
                },
            });
            setEmployees(employeeAll.data);
        };

        const getAllManagers = async () => {
            const managerAll = await axiosDB.get("/Manager/getAll", {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem("token"),
                },
            });
            setManagers(managerAll.data);
        };

        getAllEmployees();
        getAllManagers();
    }, []);

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
        setSelectedManager(employee.manager.id);
        setVisible(true); // Show the dialog
    };

    const getAllEmployees = async () => {
        const employeeAll = await axiosDB.get("/Employee/getAll", {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token'),
            },
        });
        setEmployees(employeeAll.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosDB.put(`/HR/updateManager/${selectedEmployee.id}/${selectedManager}`, {}, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem("token"),
                },
            });
            alert("Employee reassigned successfully!");
            setSelectedEmployee(null);  // Reset the form
            getAllEmployees();
            setVisible(false);  // Hide the dialog
        } catch (error) {
            console.error("Error reassigning employee:", error);
            alert("Error reassigning employee.");
        }
    };

    const handleEditClick = (employee) => {
        navigate(`/employee/edit/${employee.id}`); // Navigate to the edit employee page
    };

    return (
        <>
        <HrNav />
        <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-10 py-10">
            <p className="text-white text-5xl font-bold m-5">Select Employee to Reassign</p>
            
            {employees.length === 0 ? " " :
            <div className="bg-white rounded-lg mt-5 shadow-lg p-8 w-full">
                <div className="mb-4">
                    <label>Search Employee </label>
                    <InputText className="w-full border bg-gray-200 border-gray-700 focus:bg-white focus:border-blue-600 px-2 py-2 mt-2" type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search by name or job type" />
                </div>

                
                <DataTable value={employees} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} stripedRows globalFilter={globalFilter} tableStyle={{ minWidth: '50rem' }}>
                    <Column className="border" field="name" header="Employee" body={(rowData) => <div className="text-lg leading-5">{rowData.name}</div>} />
                    <Column className="border" field="jobtype" header="Job Type" body={(rowData) => <div className="capitalize text-md leading-5">{String(rowData.jobtype).replace("_", " ")}</div>} />
                    <Column className="border" field="manager.name" header="Manager" body={(rowData) => <div className="text-md leading-5">{rowData.manager.name}</div>} />
                    <Column className="border" field="salary" header="Salary" body={(rowData) => <div className="text-md leading-5">${rowData.salary}</div>} />
                    <Column className="border flex justify-center items-center" body={(rowData) => (
                        <div className="flex space-x-2">
                            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" label="Reassign" icon="pi pi-pencil" onClick={() => handleEmployeeClick(rowData)} />
                            <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" label="Edit" icon="pi pi-pencil" onClick={() => handleEditClick(rowData)} />
                        </div>
                    )} header="Actions" />
                </DataTable>
                
            </div>

            }

            <Dialog header="Reassign Employee To Manager" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                {selectedEmployee && (
                    <div className="w-full bg-white rounded-lg">
                        <form onSubmit={handleSubmit} className="m-5 mt-8">
                            <div className="mt-4">
                                <label htmlFor="name" className="block text-left text-md text-gray-700">Employee Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full bg-gray-700 text-white px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none"
                                    value={selectedEmployee.name}
                                    readOnly
                                />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="currentManager" className="block text-left text-md text-gray-700">Current Manager</label>
                                <input
                                    id="currentManager"
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                                    value={selectedEmployee.manager.name}
                                    readOnly
                                />
                            </div>
                            
                            <div className="mt-4">
                                <label htmlFor="manager" className="block text-left text-md text-gray-700">Select Manager to Reassign</label>
                                <select
                                    id="manager"
                                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                                    value={selectedManager}
                                    onChange={(e) => setSelectedManager(e.target.value)}
                                    required
                                >
                                    <option value="">Select a Manager</option>
                                    {managers.map(manager => (
                                        <option key={manager.id} value={manager.id}>{manager.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 mt-6 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                            >
                                Reassign
                            </button>
                        </form>
                    </div>
                )}
            </Dialog>
        </div>
        </>
    );
};
