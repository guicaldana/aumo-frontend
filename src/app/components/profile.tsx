'use client'

type Location = {
  street: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

type ProfileProps = {
  user: {
    fullName: string;
        gender: string;
        email: string;
        phone: string;
        location: Location;
        picture: string;
  }
  fetchUser: () => void;
}

import Image from "next/image";




export const Profile = ({user, fetchUser}: ProfileProps) =>{
  
   
    return(
        
        <div className="flex flex-col grow items-center bg-white shadow-lg rounded-lg sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[900px] relative mt-[-350px]">
      
      {/* Background */}
      
      <div className="profile-pic w-full h-36 overflow-hidden rounded-t-lg relative">
      {user && (

      <Image
          src={user.picture}
          alt="Background"
          layout="fill"
          objectFit="cover" 
          className=" filter blur-sm"
        />
      )}
      </div>

      {/* Profile Image */}
      <div className="profile-pic mt-[-100px] w-36 h-36 z-10 ">
      {user && (
        <Image
          src={user.picture}
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full border-4 border-white"
        />
      )}

      </div>

      {/* User Info */}
      <div className="mt-10 text-center">
        <h2 className="full-name text-xl font-semibold">{user.fullName}</h2>
        <p className="location text-gray-500">{user.location.city}, {user.location.state}, {user.location.country}</p>
      </div>
      {/* Buttons */}
      <div className="mt-4 mb-4 flex justify-center gap-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Follow
        </button>
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300" onClick={fetchUser}>
          try the next one
        </button>
      </div>
    </div>

    
    

        
        
    );
};



