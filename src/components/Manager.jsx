import { useEffect, useState } from "react";
import axiosDB from "../axios";
import { Link } from "react-router-dom";
import { ManagerNav } from "./Manager/ManagerNav";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../store/action/employee";
import { EmpSuper } from "./Manager/EmpSuper";

export const Manager = () => {
    const [manager, setManager] = useState({});
    const dispatch = useDispatch();
    const {list} = useSelector((state)=>state.employee)

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

            
            dispatch(getEmployee());
        };

        getManagerData();
    }, [dispatch]);

    

    return (
        <>
        <ManagerNav employees={list} />
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
            <div className="bg-white mt-5 rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">Welcome, {manager.name}</h1>
                <div className="text-center m-4 flex flex-col">
                <Link to="/Manager/history" className="m-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    View History of Points Rewarded 
                </Link>
                <Link to="/Manager/view" className="m-5 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                    Reward Employees
                </Link>

                
                
                </div>
               
            </div>

             


            
        </div>
        <div>
            <EmpSuper employeesList={list} />
        </div>
        </>
    );
}
