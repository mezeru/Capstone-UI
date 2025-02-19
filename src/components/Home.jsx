
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosDB from "../axios";

export const Home = () => {

    const nav = useNavigate();

    const[email , setEmail] = useState("");
    const[pass, setPass] = useState("");
    const[role,setRole] = useState("");
    const[invalid,setInvalid] = useState("");
    const [param] = useSearchParams();
    const[msg,setMsg] = useState("");

    useEffect(() => {

      if(param.get('msg')){
        setMsg(param.get('msg'));
      }

    },[param])


    const handleSubmit = async (e) =>{
        e.preventDefault();

        

        let token = window.btoa(email+":"+pass);

        try{

            const resp = await axiosDB.get("/login",{
                        headers:{
                            'Authorization': 'Basic ' + token
                        }
                    });

            setRole(resp.data.role)


            localStorage.setItem('token',token);
            localStorage.setItem('role',role);
            localStorage.setItem('userid',resp.data.id)


            switch (resp.data?.role) {
                case "HR":
                  nav("/HR")
                  break;
                case "EMPLOYEE":
                  nav("/Employee")
                  break;
                case "MANAGER":
                  nav("/Manager")
                  break;
                default:
                  break;
              }

            

        }
        catch(e){

          setInvalid("Invalid Credentials Entered")

        }

        
        
    }

        

   return (

    <>

    {localStorage.getItem('role')}
    
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-3xl font-semibold text-gray-800">Login</h2>
            {invalid.length === 0 ? "":  <p className="mt-5 p-2 bg-red-500 rounded-lg text-white">{invalid}</p>}
            {msg.length === 0 || invalid.length > 0 ? "":  <p className="mt-5 p-2 bg-red-500 rounded-lg text-white">{msg}</p>}
            <form onSubmit={handleSubmit} className="mt-8">
              <div>
                <label htmlFor="email" className="block text-gray-700">Enter Username</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter your Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-gray-700">Enter Password</label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter your password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
    </>

   )

}