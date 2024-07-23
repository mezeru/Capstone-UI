import { useEffect, useState } from "react";
import axiosDB from "../../axios";

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

                setItems(resp.data);
            } catch (error) {
                console.error("Error fetching redeemed items:", error);
            }
        };

        getItems();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10">
            <h1 className="mb-12 text-white text-5xl font-bold">Items Redeemed</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6 py-8 bg-white rounded-lg shadow-md">
                {items.map((item) => (
                    <div key={item.id} className="flex flex-col justify-between p-6 bg-gray-800 rounded-lg shadow-md text-white">
                        <div className="mb-5">
                            <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
                            <p className="text-lg mb-2">{item.description}</p>
                            <p className="text-lg font-semibold">Points: {item.points}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
