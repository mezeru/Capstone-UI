import { useEffect, useState } from "react";
import axiosDB from "../../axios";
import { EmpNav } from "./EmpNav";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
        console.log(sortedHistory);
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
        {
          history.length > 0 ?
          <DataTable className="w-full" value={history} stripedRows tableStyle={{ minWidth: '50rem' }} paginator rows={10}>
                    <Column className="border-2" field="time" header="Date Time" body={(rowData) => <div className="text-md leading-5">{new Date(rowData.timestamp).toLocaleString()}</div>} />
                    <Column className="border-2" field="item" header="Item" body={(rowData) => <div className="text-lg leading-5">{rowData.itemName}</div>}  />
                    <Column className="border-2" field="manager" header="Manager" body={(rowData) => <div className="capitalize text-md leading-5">{rowData.managerName}</div>}  />
                    <Column className="border-2" field="points" header="Points" body={(rowData) => <div className="text-md leading-5 font-bold">{rowData.managerName?.length > 0  ? `+ ${rowData.points}` : `- ${rowData.points}` }</div>} />
                    <Column className="border-2" field="Desc" header="Description" body={(rowData) => <div className={`text-md leading-5 ${rowData.managerName?.length > 0  ? "font-bold" : "" }`}>{rowData.managerName?.length > 0  ? "Review : "+rowData.desc : rowData.desc  }</div>} />
                    
        </DataTable>
        :
        "No History to Show"

        }
        </div>
      </div>
    </div>
    </>
  );
};

