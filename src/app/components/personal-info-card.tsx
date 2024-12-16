type ProfileProps = {
  user: {
    dateOfBirth: string;
    nat: string;
  }
}


export const PersonalInfoCard = ({user}: ProfileProps) =>{

  function formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
    return (
        <div className="flex flex-col grow items-center bg-white shadow-lg rounded-lg sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[450px] relative">
      {/* User Info */}
      <div className="mt-10 text-center">
        <h2 className="text-md font-semibold">Informações Pessoais</h2>
        <p className="text-gray-500"> <b>Nascido em: </b>{formatDate(user.dateOfBirth.split("T")[0])}</p>
        <p className="text-gray-500"><b>Natalidade: </b>{user.nat}</p>
      </div>
      {/* Buttons */}
      <div className="mt-4 mb-4 flex justify-end gap-4">
        {/* <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300">
          Show more
        </button> */}
      </div>
    </div>
    );
};