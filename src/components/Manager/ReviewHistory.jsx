import { useEffect, useState } from "react";
import axiosDB from "../../axios";

export const ReviewHistory = () => {
    const [history, setHistory] = useState([]);
    const [activeEmployeeId, setActiveEmployeeId] = useState(null);

    useEffect(() => {
        const getHistory = async () => {
            const resp = await axiosDB.get(`/getHistory/Manager/${localStorage.getItem("id")}`, {
                headers: {
                    "Authorization": "Basic " + localStorage.getItem("token")
                }
            });

            // Sort the data by timestamp in descending order
            const sortedData = resp.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setHistory(sortedData);

            // Set the initial active employee to the first one in the sorted data
            if (sortedData.length > 0) {
                setActiveEmployeeId(sortedData[0].employee.id);
            }
        };

        getHistory();
    }, []);

    // Filter history based on the active employee
    const activeEmployeeHistory = history.filter(item => item.employee.id === activeEmployeeId);

    // Get unique employees
    const employees = [...new Map(history.map(item => [item.employee.id, item.employee])).values()];

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
            <p className="text-white text-5xl font-bold m-5">Review History of Points Awarded</p>
            <div className="bg-white rounded-lg mt-5 shadow-lg p-8 w-full">
                <div className="flex flex-row mb-4 justify-center">
                    {employees.map(employee => (
                        <button
                            key={employee.id}
                            className={`px-4 py-2 mx-2 rounded ${activeEmployeeId === employee.id ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            onClick={() => setActiveEmployeeId(employee.id)}
                        >
                            {employee.name}
                        </button>
                    ))}
                </div>
                {activeEmployeeHistory.length > 0 ? (
                    <div className="flex flex-col justify-center items-center w-full">
                        {activeEmployeeHistory.map(item => (
                            <div key={item.id} className="grid items-center grid-cols-3 bg-gray-700 text-white p-6 mb-4 rounded-lg shadow-md w-full">
                                <div>
                                    <p className="text-2xl font-bold">Review ID: {item.id}</p>
                                    <p className="text-lg mt-2">Points: {item.points}</p>
                                    <p className="text-lg mt-2">Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
                                </div>
                                <div className="mt-4">
                                    <p className="text-lg font-bold">Employee Details:</p>
                                    <p className="ml-4">ID: {item.employee.id}</p>
                                    <p className="ml-4">Name: {item.employee.name}</p>
                                    <p className="ml-4">Salary: ${item.employee.salary}</p>
                                    <p className="ml-4">Points: {item.employee.points}</p>
                                </div>
                            
                                
                                <div className="mt-4">
                                    <p className="text-lg font-bold">Review:</p>
                                    <p className="ml-4">{item.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-white text-2xl">No review history available.</p>
                )}
            </div>
        </div>
    );
};
