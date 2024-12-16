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
      nat: string;
    };
  };
  followUser: (email: string) => void;
  removeUser: (email: string) => void;  // Função para remover o usuário
}

export const SugestionCard = ({ user, followUser, removeUser }: ProfileProps) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg sm:w-[150px] md:w-[180px] lg:w-[220px] xl:w-[250px] h-auto p-4 relative">

      {/* Profile Image */}
      <div className="w-20 h-20 z-10 mt-4">
        <Image
          src={user.profile.picture} // Substitua pelo caminho da sua imagem
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full border-4 border-white object-cover"
        />
      </div>

      {/* User Info */}
      <div className="text-center mt-4">
        <h2 className="text-sm font-semibold break-words">{user.profile.fullName}</h2>
        <p className="text-xs text-gray-500">{user.profile.location.city}, {user.profile.location.country}</p>
      </div>
      
      {/* Buttons */}
      <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2 w-full">
        {/* Follow Button */}
        <button 
          className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 text-sm w-full sm:w-auto"
          onClick={() => followUser(user.profile.email)}
        >
          Follow
        </button>
        
        {/* Remove Button */}
        <button 
          className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 text-sm w-full sm:w-auto"
          onClick={() => removeUser(user.profile.email)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
