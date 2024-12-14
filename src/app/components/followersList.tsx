import React from "react";

type ProfileProps = {
    user: {
      dateOfBirth: string;
      age: number;
    }
  }
  
  
  export const PersonalInfoCard = ({user}: ProfileProps) =>{
  
      return (
          <div className="flex flex-col grow items-center bg-white shadow-lg rounded-lg sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[450px] relative">
        {/* User Info */}
        <div className="mt-10 text-center">
          <h2 className="text-md font-semibold">Personal Info</h2>
          <p className="text-gray-500"> <b>Born at: </b>{user.dateOfBirth.split("T")[0]}</p>
          <p className="text-gray-500"><b>Age: </b>{user.age} anos</p>
        </div>
        {/* Buttons */}
        <div className="mt-4 mb-4 flex justify-end gap-4">
          <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300">
            Show more
          </button>
        </div>
      </div>
      );
  };