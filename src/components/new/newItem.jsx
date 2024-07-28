
import { useEffect, useState } from "react"
import axiosDB from "../../axios";
import { HrNav } from "./HrNav";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";

export const NewItem = () => {

  const[name,setName] = useState("");
  const[desc,setDesc] = useState("");
  const[points,setPoints] = useState(0);
  const[globalFilter,setGlobalFilter] = useState("");
  const[items,setItems] = useState([]);

  useEffect(() => {

    const getItems = async () => {
      try {
          const { data } = await axiosDB.get("/Items/getAll", {
              headers: {
                  'Authorization': 'Basic ' + localStorage.getItem("token"),
              },
          });
          setItems(data);
      } catch (error) {
          console.error("Error fetching items:", error);
      }

  };

  getItems();

  },[])

  const handleSubmit = async (e) =>{

    e.preventDefault();


      try{

        const resp = await axiosDB.post("/Items/add",{
          name: name,
          description: desc,
          points: points
        },
      {
        headers:{
          'Authorization': 'Basic ' + localStorage.getItem('token')
        }
      });

      if(resp.status === 200){
        alert("Item added Successfully")
      }
        
      }
      catch(e){
        console.log(e);
      }

    

    

  }

    return (
      <>
      <HrNav/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-10 py-10">
        <p className="font-bold text-white text-4xl">Add a New Item</p>
      <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md m-5">
        
        <form onSubmit={handleSubmit} className="m-5 mt-8 ">
            
              <div className="mt-4">
                <label htmlFor="name" className="block text-left text-md text-gray-700">Enter Name</label>
                <input
                  id="Name"
                  type="text"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter Item Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="mt-4">
                <label htmlFor="points" className="block text-left text-md text-gray-700">Enter Item Points</label>
                <input
                  id="Points"
                  type="number"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter Item Points"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="Description" className="block text-left text-md text-gray-700">Enter Item Points</label>
                <textarea
                  id="Description"
                  type="text"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter Item Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
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

    <div className="bg-white rounded-lg mt-5 shadow-lg p-8 w-full">
                    <div className="mb-4">
                        <label>Search Item </label>
                        <InputText className="w-full border bg-gray-200 border-gray-700 focus:bg-white focus:border-blue-600 px-2 py-2 mt-2" type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search Item" />
                    </div>
                    <DataTable value={items} stripedRows tableStyle={{ minWidth: '50rem' }} paginator rows={10} globalFilter={globalFilter} header="Items">
                        <Column className="border-2" field="name" header="Name" body={(rowData) => <div className="text-lg leading-5">{rowData.name}</div>} filter filterPlaceholder="Search by name" />
                        <Column className="border-2" field="salary" header="Points" body={(rowData) => <div className="text-md leading-5">{rowData.points}</div>} />
                        <Column className="border-2" field="points" header="Description" body={(rowData) => <div className="text-md leading-5">{rowData.description}</div>} />
                    </DataTable>
                </div>

    </div>
    </>

    )

}