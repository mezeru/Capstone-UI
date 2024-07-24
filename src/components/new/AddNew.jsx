import { useState } from "react";
import { NewManager } from "./newManager";
import { NewEmployee } from "./newEmployee";
import { NewItem } from "./newItem";

export const AddNew = () => {
  const [select, setSelect] = useState("");

  const renderComponent = () => {
    switch (select) {
      case "1":
        return <NewManager />;
      case "2":
        return <NewEmployee />;
      case "3":
        return <NewItem />;
      default:
        ;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-10 py-10">
      <div className="m-5">
        <div className="flex flex-col justify-center">
          <p className="text-white text-5xl font-bold mb-3">Add New +</p>
          <select
            id="option"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            className="w-full mt-5 px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
          >
            <option value="">Select an option</option>
            <option value="1">Add Manager</option>
            <option value="2">Add Employee</option>
            <option value="3">Add Item</option>
          </select>
        </div>
      </div>
      {renderComponent()}
    </div>
  );
};
