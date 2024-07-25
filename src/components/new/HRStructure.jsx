import { useEffect, useState } from "react";
import axiosDB from "../../axios";

export const HRStruct = () => {
    const [struct, setStruct] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const getStruct = async () => {
            const resp = await axiosDB.get("/hr/manager/employee", {
                headers: {
                    "Authorization": "Basic " + localStorage.getItem("token"),
                },
            });

            setStruct(resp.data);
        };

        getStruct();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10">
            <h1 className="mb-20 text-white text-5xl font-bold">Manager and Employee Strucutre</h1>
            <div className="text-sm w-full bg-gray-800 rounded-t-lg font-medium text-center text-gray-500 border-b border-gray-200 py-1 px-1">
                <ul className="flex flex-wrap -mb-px overflow-x-auto ">
                    {struct.map((manager, index) => (
                        <li key={manager.id} className="me-2">
                            <button
                                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                    activeTab === index
                                        ? "text-white border-white-200"
                                        : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => setActiveTab(index)}
                            >
                                {manager.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full px-6 py-8 bg-white rounded-b-lg shadow-md">
                {struct.length > 0 && struct[activeTab] && (
                    <div>
                        <h2 className="text-4xl font-bold mb-4">{struct[activeTab].name}</h2>
                        
                        <div>
                        <div className={`grid ${struct[activeTab].employees.length > 0 ? "grid-cols-3":"grid-cols-1"} gap-6`}>
                            {struct[activeTab].employees.length > 0 ? (
                                struct[activeTab].employees.map((employee) => (
                                    <div
                                        key={employee.id}
                                        className="p-6 bg-gray-800 rounded-lg shadow-md"
                                    >
                                        <h4 className="text-lg text-white font-medium mb-2">{employee.name}</h4>
                                        <p className="text-white">Salary: $ {employee.salary}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No employees assigned.</p>
                            )}
                        </div>
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
};
