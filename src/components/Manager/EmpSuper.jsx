import { useState } from "react";
import axiosDB from "../../axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose your theme
import 'primereact/resources/primereact.min.css';

export const EmpSuper = ({ employeesList }) => {
    const [employees, setEmployees] = useState(employeesList);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [points, setPoints] = useState("");
    const [review, setReview] = useState("");
    const [visible, setVisible] = useState(false);

    const getEmps = async () => {
        const resp = await axiosDB.get(`/Manager/empSuper/${localStorage.getItem('id')}`, {
            headers: {
                "Authorization": 'Basic ' + localStorage.getItem("token")
            }
        });

        setEmployees(resp.data);
    };

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
        setPoints(employee.points);
        setVisible(true);  // Show the dialog
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosDB.post(`/addPoints/${localStorage.getItem("id")}/${selectedEmployee.id}`, {
                points,
                review
            }, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem("token"),
                },
            });
            alert("Employee information updated successfully!");
            setSelectedEmployee(null);  // Reset the form
            setPoints("");  // Clear points
            setReview("");  // Clear review
            getEmps();
            setVisible(false);  // Hide the dialog

        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Error updating employee.");
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button className="flex flex-col bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" label="Review & Award" icon="pi pi-pencil" onClick={() => handleEmployeeClick(rowData)} />
        );
    };

    return (
        <>
            <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
                <p className="text-white text-2xl font-bold m-5">Employees under Supervision</p>
                <p className="text-white text-md">Select Employee to Reward and Review</p>
                <div className="bg-white rounded-lg mt-5 shadow-lg p-8 w-full">
                    <DataTable value={employees} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} stripedRows tableStyle={{ minWidth: '50rem' }}>
                        <Column className="border 1" field="name" header="Employee" body={(rowData) => <div className="text-lg leading-5">{rowData.name}</div>} />
                        <Column className="border 1" field="jobtype" header="Job Type" body={(rowData) => <div className="capitalize text-md leading-5">{String(rowData.jobtype).replace("_", " ")}</div>} />
                        <Column className="border 1" field="salary" header="Salary" body={(rowData) => <div className="text-md leading-5">${rowData.salary}</div>} />
                        <Column className="border 1" field="points" header="Points" body={(rowData) => <div className="text-md leading-5">{rowData.points}</div>} />
                        <Column className="border 1 flex justify-center items-center" body={actionBodyTemplate} header="Actions" />
                    </DataTable>
                </div>
            </div>

            <Dialog header="Award Employee Points" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                {selectedEmployee && (
                    <div className="w-full px-6 py-2 bg-white rounded-lg">
                        <form onSubmit={handleSubmit} className="m-5 mt-8">
                            <div className="mt-4">
                                <label htmlFor="name" className="block text-left text-md text-gray-700">Employee Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full bg-gray-700  text-white px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none"
                                    value={selectedEmployee.name}
                                    readOnly
                                />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="points" className="block text-left text-md text-gray-700">Award Points</label>
                                <select
                                    id="points"
                                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                                    value={points}
                                    onChange={(e) => setPoints(e.target.value)}
                                    required
                                >
                                    <option value="">Select Number of Points to Award</option>
                                    <option value="200">200</option>
                                    <option value="500">500</option>
                                    <option value="1000">1000</option>
                                    <option value="1500">1500</option>
                                    <option value="2000">2000</option>
                                </select>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="review" className="block text-left text-md text-gray-700">Review</label>
                                <textarea
                                    id="review"
                                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 mt-6 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                )}
            </Dialog>
        </>
    );
};
