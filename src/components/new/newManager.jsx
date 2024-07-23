
import { useState } from "react"
import axiosDB from "../../axios";

export const NewManager = () => {

  const[name,setName] = useState("");
  const[user,setUser] = useState("");
  const[pass,setPass] = useState("");
  const[repass,setRepass] = useState("");

  const handleSubmit = async (e) =>{

    e.preventDefault();

    if(pass !== repass){
      alert("Passwords do not Match !");
    }
    else{

      try{

        const resp = await axiosDB.post("/Manager/add",{
          name: name,
          userinfo:{
            username: user,
            password: pass
          }
        },
      {
        headers:{
          'Authorization': 'Basic ' + localStorage.getItem('token')
        }
      });

      if(resp.status === 200){
        alert("Manager added Successfully")
      }
        
      }
      catch(e){
        console.log(e);
      }

    }

    

  }

    return (
        
    <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <p className="font-bold text-black text-4xl">Add a New Manager</p>
        <form onSubmit={handleSubmit} className="m-5 mt-8 ">
              <div>
                <label htmlFor="email" className="block text-left text-md text-gray-700">Enter Name</label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="name" className="block text-left text-md text-gray-700">Enter Username</label>
                <input
                  id="username"
                  type="text"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-left text-md text-gray-700">Enter Password</label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="password" className="block text-left text-md text-gray-700">Confirm Password</label>
                <input
                  id="repassword"
                  type="password"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Confirm password"
                  value={repass}
                  onChange={(e) => setRepass(e.target.value)}
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

    )

}