import Image from "next/image";



export const SugestionCard = () =>{
   

    return(
        
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[180px] h-[200px] relative">
      
    
      {/* Profile Image */}
      <div className="w-12 h-12 z-10 ">
        <Image
          src="/test.png" // Substitua pelo caminho da sua imagem
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full border-4 border-white"
        />
      </div>

      {/* User Info */}
      <div className="mt-10 text-center">
        <h2 className="text-sm font-semibold">First + Last name</h2>
        <p className="text-sm text-gray-500">city, country</p>
      </div>
      {/* Buttons */}
      <div className="mt-2 mb-4 flex justify-center gap-4 ">
        <button className="bg-blue-500 text-white py-1 px-1 rounded-lg hover:bg-blue-600 text-sm">
          Follow
        </button>
      </div>
    </div>

    
    

        
        
    );
};

