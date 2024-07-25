import { useEffect, useState } from "react";
import axiosDB from "../../axios";

export const NewEmployee = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [managers, setManagers] = useState([]);
  const [selectManager, setSelectManager] = useState(0);
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    const getManagers = async () => {
      try {
        const resp = await axiosDB.get("/Manager/getAll", {
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem("token"),
          },
        });
        setManagers(resp.data);
      } catch (error) {
        console.error("Failed to fetch managers:", error);
      }
    };
    
    getManagers();
  }, []); // Empty dependency array to run only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass !== repass) {
      alert("Passwords do not match!");
    } else {


      try {
        const resp = await axiosDB.post(`/Employee/add/${selectManager}`, { // Assuming endpoint for employees
          name: name,
          salary: salary,
          jobtype: jobtype,
          userinfo: {
            username: user,
            password: pass,

          } // Include manager selection if needed
        },
        {
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('token'),
          },
        });

        if (resp.status === 200) {
          alert("Employee added successfully");
        }
      } catch (error) {
        console.error("Failed to add employee:", error);
      }
    }
  };

  return (
    <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md">
      <p className="font-bold text-black text-4xl">Add a New Employee</p>
      <form onSubmit={handleSubmit} className="m-5 mt-8">
        <div>
          <label htmlFor="name" className="block text-left text-md text-gray-700">Enter Name</label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mt-4">
            <label htmlFor="salary" className="block text-left text-md text-gray-700">Enter Salary</label>
            <input
                id="salary"
                type="number"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                placeholder="Enter Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
            />
        </div>

        <div className="mt-4">
              <label htmlFor="manager" className="block text-left text-md text-gray-700">Assign Manager</label>
              <select
                id="manager"
                value={selectManager}
                onChange={(e) => setSelectManager(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block"
              >
                <option value="">Select a Manager</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>{manager.name}</option>
                ))}
              </select>
        </div>

        <div className="mt-4">
              <label htmlFor="jobtype" className="block text-left text-md text-gray-700">Select Job Type</label>
              <select
                id="jobtype"
                value={jobtype}
                onChange={(e) => setJobtype(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block"
              >
                <option value="">Select a Job Type</option>
                <option value="DATA_SCIENTIST">Data Scientist</option>
                <option value="DATA_ENGINEER">Data Enginner</option>
                <option value="UI_DEVELOPER">UI Developer</option>
                <option value="SOFTWARE_ENGINEER">Software Engineer</option>	
                
              </select>
        </div>

        <label htmlFor="username" className="block mt-10 mb-4 text-center text-3xl font-bold text-gray-700">Employee Credentials</label>
              

            <div className="mt-4">
              <label htmlFor="username" className="block text-left text-md text-gray-700">Enter Username</label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                placeholder="Enter Username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-left text-md text-gray-700">Enter Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                placeholder="Enter Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="repassword" className="block text-left text-md text-gray-700">Confirm Password</label>
              <input
                id="repassword"
                type="password"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                placeholder="Confirm Password"
                value={repass}
                onChange={(e) => setRepass(e.target.value)}
                required
              />
            </div>
            
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
