import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosDB from "../axios";

export const Employee = () => {
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        const getEmployeeData = async () => {
            try {
                const resp = await axiosDB.get(`/Employee/getEmployeeUserID/${localStorage.getItem('userid')}`, {
                    headers: {
                        "Authorization": "Basic " + localStorage.getItem('token')
                    }
                });
                setEmployee(resp.data);
                localStorage.setItem('id', resp.data.id);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        getEmployeeData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">Welcome, {employee.name}</h1>
                <div className="text-center mb-4">
                    <p className="text-xl text-gray-700"><strong>Manager:</strong> {employee.manager?.name}</p>
                    <p className="text-xl text-gray-700"><strong>Salary:</strong> {employee.salary}</p>
                    <p className="text-xl text-gray-700"><strong>Current Points:</strong> {employee.points}</p>
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                    <Link
                        to="/Employee/redeemed"
                        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded shadow"
                    >
                        View Redeemed Items
                    </Link>
                    <Link
                        to="/Employee/newItem"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
                    >
                        Redeem a New Item
                    </Link>
                </div>
            </div>
        </div>
    );
}
