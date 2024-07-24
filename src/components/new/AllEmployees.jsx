import { useState, useEffect } from "react";
import axiosDB from "../../axios";

export const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedManager, setSelectedManager] = useState("");



  useEffect(() => {
    const getAllEmployees = async () => {
      const employeeAll = await axiosDB.get("/Employee/getAll", {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('token'),
        },
      });
      setEmployees(employeeAll.data);
    };

    const getAllManagers = async () => {
      const managerAll = await axiosDB.get("/Manager/getAll", {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem("token"),
        },
      });
      setManagers(managerAll.data);
    };

    getAllEmployees();
    getAllManagers();
  }, []);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setSelectedManager(employee.manager.id);
  };

  const getAllEmployees = async () => {
    const employeeAll = await axiosDB.get("/Employee/getAll", {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('token'),
      },
    });
    setEmployees(employeeAll.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(selectedEmployee, selectedManager);

    try {
      await axiosDB.put(`/HR/updateManager/${selectedEmployee.id}/${selectedManager}`,{}, {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem("token"),
        },
      });
      alert("Employee reassigned successfully!");
      setSelectedEmployee(null);  // Reset the form
      getAllEmployees();
    } catch (error) {
      console.error("Error reassigning employee:", error);
      alert("Error reassigning employee.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-10 py-10">
      {selectedEmployee ? (
        // Form to reassign employee
        <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md mt-10">
          <p className="font-bold text-black text-4xl">Reassign Employee To Manager</p>
          <form onSubmit={handleSubmit} className="m-5 mt-8">
            <div className="mt-4">
              <label htmlFor="name" className="block text-left text-md text-gray-700">Employee Name</label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-gray-700 focus:outline-none"
                value={selectedEmployee.name}
                readOnly
              />
            </div>

            <div className="mt-4">
              <label htmlFor="currentManager" className="block text-left text-md text-gray-700">Current Manager</label>
              <input
                id="currentManager"
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-700 text-white border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-gray-700 focus:outline-none"
                value={selectedEmployee.manager.name}
                readOnly
              />
            </div>
            
            <div className="mt-4">
              <label htmlFor="manager" className="block text-left text-md text-gray-700">Select Manager to Reassign</label>
              <select
                id="manager"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                value={selectedManager}
                onChange={(e) => setSelectedManager(e.target.value)}
                required
              >
                <option value="">Select a Manager</option>
                {managers.map(manager => (
                  <option key={manager.id} value={manager.id}>{manager.name}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Reassign
            </button>
          </form>
        </div>
      ) : (
        // Table to list employees
        <>
          <p className="text-white text-5xl font-bold m-5">Select Employee to Reassign</p>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white rounded-t-lg mt-10">
              <thead>
                <tr>
                  <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Employee</th>
                  <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Manager</th>
                  <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Salary</th>
                </tr>
              </thead>
              <tbody className="bg-white border-none">
                {employees.map((employee) => (
                  <tr key={employee.id} onClick={() => handleEmployeeClick(employee)} className="cursor-pointer hover:border hover:border-1">
                    <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500">
                      <div className="flex items-center justify-center">
                        <div>
                          <div className="text-white font-bold text-lg leading-5">{employee.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500">
                      <div className="text-xl text-white leading-5 font-bold m-2">{employee.manager.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500">
                      <div className="text-lg leading-5 text-white m-2">${employee.salary}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
