import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axiosDB from "../axios";
import { HrNav } from "./new/HrNav";

import { Knob } from 'primereact/knob';
        

export const HR = () => {

    const [user,setUser] = useState({});
    const [count, setCount] = useState({
        employeeCount: 0,
        managerCount: 0
    });

    useEffect(() =>{

        const getUserData = async () => {

            const resp = await axiosDB.get(`/HR/getHRUserID/${localStorage.getItem('userid')}`,{
                headers:{
                    "Authorization" : "Basic "+localStorage.getItem('token')
                }
            })

            setUser(resp.data);


        }

        const getCount = async () => {

            const resp = await axiosDB.get(`/HR/Getcount`,{
                headers:{
                    "Authorization" : "Basic "+localStorage.getItem('token')
                }
            });
            setCount(resp.data);

        }

        getCount();

        getUserData();

    },[])


    return (
        <>
        <HrNav/>
        
        <div className="flex flex-row items-center justify-evenly min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            
        

            <div className="flex flex-col items-center justify-center">

                <h1 className="mb-20 text-white text-5xl font-bold">Welcome, {user.name}</h1>

                <div className="flex flex-row w-full px-6 py-8 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col justify-center items-center max-w-md bg-white rounded-lg p-5 border">
                        <h1 className="mb-5 text-gray-700 text-xl font-bold">Employees Count</h1>
                        <Knob value={count?.employeeCount} size={100} strokeWidth={5} />
                    </div>
                    
                    <div className="max-w-md flex flex-col w-full px-6 py-8 bg-white rounded-lg">
                        <Link to="/HR/add" className="m-5 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                            Add New +
                        </Link>
                        <Link to="/HR/Reassign" className="m-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                            Assign Manager to Employee
                        </Link>
                        <Link to="/HR/Structure" className="m-5 bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded">
                            View the Manager and Employee Structure
                        </Link>

                        <Link to="/HR/newItem" className="m-5 bg-rose-500 hover:bg-rose-700 text-white py-2 px-4 rounded">
                            Add Items
                        </Link>
                    
                    </div>
                    <div className="flex flex-col justify-center items-center max-w-md bg-white rounded-lg p-5 border">
                        <h1 className="mb-5 text-gray-700 text-xl font-bold">Manager Count</h1>
                        <Knob value={count?.managerCount} size={100} strokeWidth={5} />
                    </div>
                </div>
                
            </div>

          
        </div>
        </>
    );
}
