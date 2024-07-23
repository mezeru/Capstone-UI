import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosDB from "../axios";

export const Employee = () => {

    const [employee,setEmployee] = useState({});

    useEffect(() =>{

        const getEmployeeData = async () => {

            const resp = await axiosDB.get(`/Employee/getEmployeeUserID/${localStorage.getItem('userid')}`,{
                headers:{
                    "Authorization" : "Basic "+localStorage.getItem('token')
                }
            })

            setEmployee(resp.data);

            localStorage.setItem('id',resp.data.id);

        }

        getEmployeeData();

    },[])

    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
            <h1 className="mb-10 text-white text-5xl font-bold">Welcome, {employee.name}</h1>
            <h1 className="mb-20 text-white text-3xl font-bold">Current Points : {employee.points}</h1>
            <div className="max-w-md flex flex-row w-full px-6 py-8 bg-white rounded-lg shadow-md">

                <Link to="/Employee/redeemed" className="font-bold m-5 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                        View Redeemed Items
                </Link>
                <Link to="/Employee/newItem" className="font-bold m-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Redeem a new Item
                </Link>
            </div>
        </div>
    );
}
