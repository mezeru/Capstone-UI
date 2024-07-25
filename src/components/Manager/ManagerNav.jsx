import { Link } from "react-router-dom"

export const ManagerNav = () => {

    return (
<nav className="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">

  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        
        
            <Link to="/Manager" className="border border-white text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Home </Link>
        <div>
            <Link to="/Manager/view" className="border border-white text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Employees </Link>

            <Link to="/Manager/history" className="border border-white text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> View Rewards Given </Link>
            
            <Link to="/Manger/history" className="border border-white text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Reward Employees </Link>
            
        </div>   
    </div>
    </nav>


    )

}