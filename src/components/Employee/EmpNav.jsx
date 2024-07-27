import { Link, useNavigate } from "react-router-dom"

export const EmpNav = () => {

    const nav = useNavigate();

    const logout = () => {
        localStorage.clear();
        nav("/?msg=You have Logged Out");

    }

    return (
<nav className="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">

  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
        <div>
     
        <Link to="/Employee" className="border border-white text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Home </Link>

        

        <Link to="/Employee/redeemed" className="text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Redeemed Items </Link>

        <Link to="/Employee/newItem" className=" text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> New Item </Link>
        <Link to="/Employee/pointshistory" className=" text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Points History </Link>
      
        </div>
        <div className="flex flex-row justify-center items-center">
           
        <div  onClick={()=> {logout()}} className="border border-white cursor-pointer text-white rounded-md mx-2 px-4 py-2 hover:bg-red-500 hover:border-red-500"> Logout </div>


        </div>
    </div>
    </nav>


    )

}