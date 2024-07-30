import { useEffect, useState } from "react";
import axiosDB from "../axios";
import { Link } from "react-router-dom";
import { ManagerNav } from "./Manager/ManagerNav";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../store/action/employee";
import { EmpSuper } from "./Manager/EmpSuper";
import PieChart from "./Pie";

export const Manager = () => {
    const [manager, setManager] = useState({});
    const [jobTypeCounts, setJobTypeCounts] = useState({});
    const dispatch = useDispatch();
    const employeeList = useSelector((state) => state.employee.list);

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

                dispatch(getEmployee());
            } catch (error) {
                console.error("Error fetching manager data:", error);
            }
        };

        getManagerData();
    }, [dispatch]);

    useEffect(() => {
        if (employeeList && employeeList.length > 0) {
            const jobTypeCounts = employeeList.reduce((acc, employee) => {
                const jobType = String(employee.jobtype).replace("_"," ");
                acc[jobType] = (acc[jobType] || 0) + 1;
                return acc;
            }, {});
            setJobTypeCounts(jobTypeCounts);
        }
    }, [employeeList]);

    return (
        <>
            <ManagerNav employees={employeeList} />
            <div className={`flex flex-row items-center pt-5 justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5`}>
                <div className="bg-white m-5 rounded-lg shadow-lg p-8 max-w-lg w-full">
                    <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">Welcome, {manager.name}</h1>
                    <div className="text-center m-4 flex flex-col">
                        <Link to="/Manager/history" className="m-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                            View History of Points Rewarded
                        </Link>
                        <Link to="/Manager/reward" className="m-5 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                            Reward Employees
                        </Link>
                        
                    </div>
                </div>

                <div className="flex justify-center items-center bg-white mt-5 rounded-lg shadow-lg p-8 max-w-lg">
                            {employeeList.length > 0 ?
                            <div>
                                <p>Employees under Supervision</p>
                            <PieChart data={jobTypeCounts} /> 
                            </div>
                            : ""}
                        </div>
                
            </div>
            <div>
                    <EmpSuper employeesList={employeeList} />
                </div>
        </>
    );
};
