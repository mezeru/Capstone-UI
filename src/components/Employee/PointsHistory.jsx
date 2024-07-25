import { useEffect, useState } from "react";
import axiosDB from "../../axios";
import { EmpNav } from "./EmpNav";

export const PointsHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axiosDB.get(`/Employee/getPointsHistory/${localStorage.getItem('id')}`, {
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('token'),
          },
        });
        
        // Flatten and sort the response data
        const sortedHistory = response.data
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort descending by timestamp
        
        setHistory(sortedHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
    <EmpNav/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
      <p className="text-white text-5xl font-bold m-5">Points and Reward History</p>
      <div className="bg-white rounded-lg mt-5 shadow-lg p-8 w-full">
        <div className="flex justify-center items-center w-full">
          <table className="min-w-full bg-white rounded-t-lg">
            <thead>
              <tr>
                <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Item Name</th>
                <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Manager Name</th>
                <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Points</th>
                <th className="px-6 py-5 border-b-2 border-gray-300 text-2xl text-center leading-4 text-gray-700">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white border-none">
              {history.map((entry, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500 text-white">{entry.itemName || '-'}</td>
                  <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500 text-white">{entry.managerName || '-'}</td>
                  <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500 text-white">{entry.itemName === null ? "+":"-"} {entry.points}</td>
                  <td className="px-6 py-4 whitespace-no-wrap bg-gray-700 border-gray-500 text-white">{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

