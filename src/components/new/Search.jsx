import { useState } from "react"
import axiosDB from "../../axios"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"




export const Search = () => {


    const[search,setSearch] = useState("");

    const[results,setResults] = useState([]);
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const resp = await axiosDB.get(`/search/${search}`,{
            headers:{
                "Authorization": "Basic "+localStorage.getItem("token")
            }
        });

        setResults(resp.data);

        console.log(resp.data)
    }

    return(
        <>
        
        <div className="rounded-lg m-5 p-8 w-full">
            
            <form onSubmit={handleSubmit}>
                <div>
                <p className="text-2xl font-bold text-white my-5">Search for an Employee or Manager</p>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="first_name" className="bg-gray-800 border border-blue-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
                </div>

                <button type="submit" className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>

                
            </form>
        </div>

        {results?.length > 0 ? 

        <DataTable value={results} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} stripedRows tableStyle={{ minWidth: '50rem' }}>
                    <Column className="border" field="id" header="Id" body={(rowData) => <div className="text-lg leading-5">{rowData.id}</div>} />
                    <Column className="border" field="name" header="Employee" body={(rowData) => <div className="text-lg leading-5">{rowData.name}</div>} />
                    <Column className="border" field="jobtype" header="Job Type" body={(rowData) => <div className="capitalize text-md leading-5">{ rowData.jobTitle ? String(rowData.jobTitle).replace("_"," ") : "Manager"   }</div>} />
                    <Column className="border" field="salary" header="Salary" body={(rowData) => <div className="text-md leading-5">{rowData.salary === 0 ? "N/A" : rowData.salary }</div>} />
        </DataTable>

        : ""}

        </>
    )

}