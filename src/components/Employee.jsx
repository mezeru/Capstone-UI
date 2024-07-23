
import { Link } from "react-router-dom";

export const Employee = () => {

    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
            <h1 className="mb-20 text-white text-5xl font-bold">Welcome</h1>
            <div className="max-w-md flex flex-row w-full px-6 py-8 bg-white rounded-lg shadow-md">

                <Link to="/Employee/Redeem" className="font-bold m-5 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                        View Redeemed Items
                </Link>
                <Link to="/Employee/newItem" className="font-bold m-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Redeem a new Item
                </Link>
            </div>
        </div>
    );
}
