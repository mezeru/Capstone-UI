
import { useState } from "react"
import axiosDB from "../../axios";

export const NewItem = () => {

  const[name,setName] = useState("");
  const[desc,setDesc] = useState("");
  const[points,setPoints] = useState(0);

  const handleSubmit = async (e) =>{

    e.preventDefault();


      try{

        const resp = await axiosDB.post("/Items/add",{
          name: name,
          description: desc,
          points: points
        },
      {
        headers:{
          'Authorization': 'Basic ' + localStorage.getItem('token')
        }
      });

      if(resp.status === 200){
        alert("Item added Successfully")
      }
        
      }
      catch(e){
        console.log(e);
      }

    

    

  }

    return (
        
    <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <p className="font-bold text-black text-4xl">Add a New Item</p>
        <form onSubmit={handleSubmit} className="m-5 mt-8 ">
            
              <div className="mt-4">
                <label htmlFor="name" className="block text-left text-md text-gray-700">Enter Name</label>
                <input
                  id="Name"
                  type="text"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter Item Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="mt-4">
                <label htmlFor="points" className="block text-left text-md text-gray-700">Enter Item Points</label>
                <input
                  id="Points"
                  type="number"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter Item Points"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="Description" className="block text-left text-md text-gray-700">Enter Item Points</label>
                <textarea
                  id="Description"
                  type="text"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter Item Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
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