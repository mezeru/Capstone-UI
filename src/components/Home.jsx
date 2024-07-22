import axios from "axios";
import { useEffect, useState } from "react"

export const Home = () => {

    const[role , setRole] = useState("");


    useEffect(() => {

        const getAuth = async() => {

            const resp  = await axios.get("http://localhost:8081/api/login",{
                headers:{
                    username:"Jane",
                    password:"Jane"
                }
                
            });

            setRole(resp.data.role);

        }

        getAuth();

        

    },[]);

   return (

    <>
        <div>
            <h1>{role}</h1>
        </div>
    </>

   )

}