import { Link } from "react-router-dom"

export const EmpNav = () => {

    return (
<nav className="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">

  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    
     
        <Link to="/Employee" className="border border-white text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Home </Link>

        <div className="flex flex-row justify-center items-center">

        <Link to="/Employee/redeemed" className="border border-white text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Redeemed Items </Link>

        <Link to="/Employee/newItem" className="border border-white text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> New Item </Link>

        <Link to="/Employee/pointshistory" className="border border-white text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Points History </Link>
      
        </div>
    </div>
    </nav>


    )

}