import { useEffect, useState } from "react";
import axiosDB from "../../axios";
import { EmpNav } from "./EmpNav";

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
            <div className={`grid ${items.length ? "grid-cols-3" : "grid-cols-1"} gap-6 w-full px-6 py-8 bg-white rounded-lg shadow-md`}>
                
                { items.length > 0 ?
                items.map((item) => (
                    <div key={item.id} className="flex flex-col justify-between p-6 bg-gray-800 rounded-lg shadow-md text-white">
                        <div className="mb-5">
                            <h1 className="text-3xl font-bold mb-2">{item.item.name}</h1>
                            <p className="text-lg mb-2">{item.item.description}</p>
                            <p className="text-lg font-semibold">Points: {item.item.points}</p>
                            <p className="text-lg font-semibold"> {new Date(item.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                ))
                :
                <p className="text-xl text-center">No Items Redeemed</p>
                }
            </div>
        </div>
        </>
    );
}
