import { Link } from "react-router-dom"

export const HrNav = () => {

    return (
<nav className="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">

  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    
     
        <Link to="/HR" className="text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Home </Link>
    
    <div className="flex flex-row justify-center items-center">
    
        <Link to="/HR/add" className="text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> New Onbaording </Link>

        <Link to="/HR/Reassign" className="text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Reassign Employee </Link>

        <Link to="/HR/Structure" className="text-white rounded-md mx-2 px-4 py-2 hover:bg-white hover:text-gray-800"> Organization Structure </Link>
      
        </div>
    </div>
    </nav>


    )

}