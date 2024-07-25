import { useEffect, useState } from "react";
import axiosDB from "../axios";
import { Link } from "react-router-dom";
import { ManagerNav } from "./Manager/ManagerNav";

export const Manager = () => {
    const [manager, setManager] = useState({});


    useEffect(() => {
        const getManagerData = async () => {
            try {
                let resp = await axiosDB.get(`/Manager/getManagerUserID/${localStorage.getItem('userid')}`, {
                    headers: {
                        "Authorization": "Basic " + localStorage.getItem('token')
                    }
                });
                setManager(resp.data);
                localStorage.setItem('id', resp.data.id);


            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        getManagerData();
    }, []);

    

    return (
        <>
        <ManagerNav />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">Welcome, {manager.name}</h1>
                <div className="text-center m-4 flex flex-col">
                <Link to="/Manager/view" className="m-5 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                    View Employees under Supervison
                </Link>
                <Link to="/Manger/history" className="m-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    View History of Points Rewarded 
                </Link>
                <Link to="/Manager/view" className="m-5 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                    Reward Employees
                </Link>
                </div>
            </div>

            
        </div>
        </>
    );
}
