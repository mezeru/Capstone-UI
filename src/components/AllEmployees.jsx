import { useEffect, useState } from "react";
import axiosDB from "../axios";

export const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        // Fetch managers
        const managerAll = await axiosDB.get("/Manager/getAll", {
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem("token"),
          },
        });
        setManagers(managerAll.data);

        // Fetch employees
        const employeeAll = await axiosDB.get("/Employee/getAll", {
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('token'),
          },
        });
        setEmployees(employeeAll.data); // Corrected to setEmployees

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllEmployees();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-10 py-10">
        
        <p className="text-white text-5xl font-bold mb-3">Select Employee to Reassign</p>

        <div className="grid grid-cols-5 mt-10">
      {employees.map((employee) => (
        <div className="px-10 m-5 py-2 bg-white rounded-md cursor-pointer" key={employee.id} >
          <p className="text-2xl font-bold">{employee.name}</p>
        </div>
      ))}
    </div>
    </div>
  );
};
