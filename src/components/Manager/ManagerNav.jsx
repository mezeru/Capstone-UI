import { Link, useNavigate } from "react-router-dom"


export const ManagerNav = () => {

    const nav = useNavigate();

    const logout = () => {
        localStorage.clear();
        nav("/?msg=You have Logged Out");

    }

    return (
<nav className="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">

  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        <div>
        
            <Link to="/Manager" className="border border-white text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Home </Link>
        
            <Link to="/Manager/reward" className=" text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Reward Employees </Link>

            <Link to="/Manager/history" className=" text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> View Rewards Given </Link>
            
         
            </div>
        <div>

            <div  onClick={()=> {logout()}} className="border border-white cursor-pointer text-white rounded-md mx-2 px-4 py-2 hover:bg-red-500 hover:border-red-500"> Logout </div>

        </div>   
    </div>
    </nav>


    )

}