import { useEffect, useState } from "react";
import axiosDB from "../../axios";
import { ManagerNav } from "./ManagerNav";

export const EmpSuper = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [points, setPoints] = useState("");
    const [review, setReview] = useState("");

    useEffect(() => {
        getEmps();
    }, []);

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

        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Error updating employee.");
        }
    };

    return (
        <>
        <ManagerNav/>
        <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
            {selectedEmployee ? (
                <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md mt-10">
                    <p className="font-bold text-black text-5xl">Award Employee Points</p>
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
                            id="manager"
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                            required
                        >
                            <option value="">Select Number of Points to Award</option>
                            <option value="100">200</option>
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
            ) : (
                <>
                    <p className="text-white text-5xl font-bold m-5">Employees under Supervision</p>
                    <p className="text-white text-xl">Select Employee to Reward and Review</p>
                    <div className="bg-white rounded-lg mt-5 shadow-lg p-8 w-full">
                        
                        <div className="flex justify-center items-center w-full">
                            <table className="min-w-full bg-white rounded-t-lg m-2">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Employee</th>
                                        <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Job Type</th>
                                        <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Salary</th>
                                        <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Points</th>
                                        
                                    </tr>
                                </thead>
                                <tbody className="bg-white border-none">
                                    {employees.map((employee) => (
                                        <tr key={employee.id} onClick={() => handleEmployeeClick(employee)} className="cursor-pointer border border-gray-400 rounded-md border-gray-700 hover:shadow-md hover:border-white">
                                            <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500">
                                                <div className="flex items-center justify-center">
                                                    <div>
                                                        <div className="text-white text-lg leading-5">{employee.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500">
                                                <div className="capitalize text-md leading-5 text-white m-2">{String(employee.jobtype).replace("_"," ")}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500">
                                                <div className="text-md text-white leading-5 m-2">$ {employee.salary}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500">
                                                <div className="text-md leading-5 text-white m-2">{employee.points}</div>
                                            </td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
        </>
    );
};
