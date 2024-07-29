import { useEffect, useState } from "react";
import axiosDB from "../../axios";
import { EmpNav } from "./EmpNav";
import { useNavigate } from "react-router-dom";

export const RedeemNew = () => {
    const [items, setItems] = useState([]);
    const [points,setPoints] = useState(0);

    const nav = useNavigate();

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
        getPoints();
    }, []);

    const getPoints = async() => {
        try{
            const resp = await axiosDB.get(`/Employee/getEmployeeUserID/${localStorage.getItem('userid')}`,{
                headers:{
                    "Authorization" : "Basic "+localStorage.getItem('token')
                }
            })

            setPoints(resp.data.points);
        }
        catch(e){
            alert(e);
        }
    }

    const handleRedeem = async (id) => {
        
        try{
            const resp = await axiosDB.post(`/Employee/redeemItem/${localStorage.getItem("id")}/${id}`,{},{
                headers:{
                    "Authorization" : "Basic "+localStorage.getItem('token')
                }
            });
    
            getPoints();
            if(resp.status === 200){

                alert("Item has been Redeemed");
                nav("/Employee/redeemed")
                
            }
        }
        catch(e){
       
            alert("Insufficiant Points")
            
        }

        

    };

    return (
        <>
        <EmpNav />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10">
            <h1 className="mb-20 text-white text-5xl font-bold">Redeem a new Item</h1>

            <h1 className="mb-20 text-white text-3xl font-bold">Points Remaining : {points}</h1>
            <div className="grid grid-cols-3 w-full px-6 py-8 bg-white rounded-lg shadow-md">
                {items.map((item) => (
                    <div key={item.id} className="flex flex-col justify-between px-6 py-8 bg-gray-700 rounded-lg shadow-md m-5 text-white">
                        <div className="flex items-center flex-col mb-5">
                            <h1 className="text-3xl m-2">{item.name}</h1>
                            <h1 className="m-2">{item.description}</h1>
                            <h1 className="m-2 font-bold text-3xl">{`Points: ${item.points}`}</h1>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                onClick={() => handleRedeem(item.id)}
                            >
                                Redeem Item
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};
