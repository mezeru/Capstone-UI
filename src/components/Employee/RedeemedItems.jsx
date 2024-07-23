import { useEffect, useState } from "react"
import axiosDB from "../../axios";

export const RedeemedItems = () => {

    const[items,setItem] = useState([]);

    useEffect(() => {

        const getItems = async () => {

            const resp = await axiosDB.get(`/Employee/getItems/${localStorage.getItem("id")}`,{
                headers:{
                    "Authorization" : "Basic "+localStorage.getItem('token')
                }
            });

            setItem(resp.data);

        }

        getItems();

    },[]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10">
            <h1 className="mb-20 text-white text-5xl font-bold">Items Redeemed</h1>
            <div className="grid grid-cols-3 w-full px-6 py-8 bg-white rounded-lg shadow-md">

                {
                   items.map( (item) => (
                    <div className="flex flex-col justify-between px-6 py-8 bg-gray-700 rounded-lg shadow-md m-5 text-white">
                        <div className="flex items-center flex-col mb-5">
                            <h1 className="text-3xl m-2">{item.name}</h1>
                            <h1 className="m-2">{item.description}</h1>
                            <h1 className="m-2">{`Points: ${item.points}`}</h1>
                        </div>
                    </div>
                   ))
                }
            </div>
        </div>
    );

}