import { useEffect, useState } from "react";
import axiosDB from "../../axios";

export const RedeemNew = () => {

    const[items,setItems] = useState([]);

    useEffect(() => {

        const getItems = async () => {


            const {data} = await axiosDB.get("/Items/getAll",{
                headers:{
                    'Authorization': 'Basic ' + localStorage.getItem("token")
                }
            });
            
            setItems(data);

        }

        getItems();



    },[])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10">
            <h1 className="mb-20 text-white text-5xl font-bold">Redeem a new Item</h1>
            <div className="grid grid-cols-3 w-full px-6 py-8 bg-white rounded-lg shadow-md">

                {
                   items.map( (item) => (
                    <div className="flex flex-col justify-between px-6 py-8 bg-gray-700 rounded-lg shadow-md m-5 text-white">
                        <div className="flex items-center flex-col mb-5">
                            <h1 className="text-3xl m-2">{item.name}</h1>
                            <h1 className="m-2">{item.description}</h1>
                            <h1 className="m-2">{`Points: ${item.points}`}</h1>
                        </div>
                        <div className="flex justify-center items-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Redeem Item</button>
                        </div>
                    </div>
                   ))
                }
            </div>
        </div>
    );


}