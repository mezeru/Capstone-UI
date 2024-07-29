import { useEffect, useState } from "react";
import axiosDB from "../../axios";
import { EmpNav } from "./EmpNav";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const RedeemedItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            try {
                const resp = await axiosDB.get(`/Employee/getItems/${localStorage.getItem("id")}`, {
                    headers: {
                        "Authorization": "Basic " + localStorage.getItem('token')
                    }
                });

                const data = resp.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

                setItems(data);
                console.log(resp.data)
            } catch (error) {
                console.error("Error fetching redeemed items:", error);
            }
        };

        getItems();
    }, []);

    return (
        <>
        <EmpNav />
        <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10">
            <h1 className="mb-12 text-white text-5xl font-bold">Items Redeemed</h1>
            <div className="flex justify-center items-center gap-6 w-full px-6 py-8 bg-white rounded-lg shadow-md">
                
                { items.length > 0 ?
                <DataTable className="w-full" value={items} stripedRows tableStyle={{ minWidth: '50rem' }} paginator rows={10}>
                    <Column className="border-2" field="name" header="Item Name" body={(rowData) => <div className="text-lg leading-5">{rowData.item.name}</div>}  />
                    <Column className="border-2 font-bold" field="Points" header="Points" body={(rowData) => <div className="capitalize text-md leading-5">{rowData.item.points}</div>}  />
                 
                    <Column className="border-2" field="desc" header="Description" body={(rowData) => <div className="text-md leading-5">{rowData.item.description}</div>} />
                    <Column className="border-2" field="time" header="Date Time" body={(rowData) => <div className="text-md leading-5">{new Date(rowData.timestamp).toLocaleString()}</div>} />
                </DataTable>
                :
                <p className="text-xl text-center">No Items Redeemed</p>
                }
            </div>
        </div>
        </>
    );
}
