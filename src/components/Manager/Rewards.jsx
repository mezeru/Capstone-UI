import { useEffect, useState } from "react"
import axiosDB from "../../axios";

export const Rewards = () => {

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [points,setPoints] = useState(0);
    const [review,setReview] = useState("");


    useEffect(() => {

        getEmps();

    },[])

    const getEmps = async () => {
        const resp = await axiosDB.get(`/Manager/empSuper/${localStorage.getItem('id')}`, {
            headers: {
                "Authorization": 'Basic ' + localStorage.getItem("token")
            }
        });

        setEmployees(resp.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosDB.post(`/addPoints/${localStorage.getItem("id")}/${selectedEmployee}`, {
                points,
                review
            }, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem("token"),
                },
            });
            alert("Employee information updated successfully!");

        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Error updating employee.");
        }
    }
    
    return (

            <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md mt-10">
                    <p className="font-bold text-black text-5xl">Award Employee Points</p>
                    <form onSubmit={handleSubmit} className="m-5 mt-8">
                    <label htmlFor="points" className="block text-left text-md text-gray-700">Select Employee</label>
                        <select
                            id="employee"
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            required
                        >
                            <option value="">Select Employee to Reward</option>
                            {
                                employees.map( (employee) => 
                                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                                )
                            }
                            
                            
                        </select>

                        <div className="mt-4">
                        <label htmlFor="points" className="block text-left text-md text-gray-700">Award Points</label>
                        <select
                            id="manager"
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                            required
                        >
                            <option value="">Select Number of Points to Award</option>
                            <option value="100">200</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                            
                        </select>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="review" className="block text-left text-md text-gray-700">Review</label>
                            <textarea
                                id="review"
                                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-6 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                        >
                            Update
                        </button>
                    </form>
                </div>

    )

}