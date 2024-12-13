import Image from "next/image";

type Location = {
  street: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

type ProfileProps = {
  user: {
    profile: {
      fullName: string;
      gender: string;
      email: string;
      phone: string;
      location: Location;
      picture: string;
    };
    contact: {
      phone: string;
      email: string;
    };
    personal: {
      dateOfBirth: string;
      age: number;
  };
}
  followUser: (email: string) => void;
}



export const SugestionCard = ({user, followUser}: ProfileProps) =>{
   
  

    return(
        
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[180px] h-[200px] relative">
      
    
      {/* Profile Image */}
      <div className="w-12 h-12 z-10 mt-10">
        <Image
          src={user.profile.picture} // Substitua pelo caminho da sua imagem
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full border-4 border-white"
        />
      </div>

      {/* User Info */}
      <div className="text-center">
        <h2 className="text-sm font-semibold">{user.profile.fullName}</h2>
        <p className="text-sm text-gray-500">{user.profile.location.city}, {user.profile.location.country}</p>
      </div>
      {/* Buttons */}
      <div className="mt-2 mb-4 flex justify-center gap-4 ">
        <button className="bg-blue-500 text-white py-1 px-1 rounded-lg hover:bg-blue-600 text-sm" onClick={() => followUser(user.profile.email)}>
          Follow
        </button>
      </div>
    </div>

    
    

        
        
    );
};

