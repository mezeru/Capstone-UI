import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axiosDB from "../axios";

export const HR = () => {

    const [user,setUser] = useState({});

    useEffect(() =>{

        const getUserData = async () => {

            const resp = await axiosDB.get(`/HR/getHRUserID/${localStorage.getItem('userid')}`,{
                headers:{
                    "Authorization" : "Basic "+localStorage.getItem('token')
                }
            })

            setUser(resp.data);


        }

        getUserData();

    },[])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <h1 className="mb-20 text-white text-5xl font-bold">Welcome, {user.name}</h1>
            <div className="max-w-md flex flex-col w-full px-6 py-8 bg-white rounded-lg shadow-md">
                <Link to="/HR/add" className="m-5 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                    Add New +
                </Link>
                <Link to="/HR/Reassign" className="m-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Assign Manager to Employee
                </Link>
                <Link to="/HR/Structure" className="m-5 bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded">
                    View the Manager and Employee Structure
                </Link>
                
                {/* Create ad diffrent link for Add new Item */}
                {/* List of all managers and Employees under them */}
            </div>
        </div>
    );
}
