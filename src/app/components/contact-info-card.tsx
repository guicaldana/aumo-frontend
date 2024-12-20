type ProfileProps = {
  user: {
    email: string;
    phone: string;
  };
};

export const ContactInfoCard = ({ user }: ProfileProps) => {
  return (
    <div className="flex flex-col grow items-center bg-white shadow-lg rounded-lg sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[450px] relative">
      {/* User Info */}
      <div className="mt-10 text-center">
        <h2 className="text-md font-semibold">Informações de Contato</h2>
        <p className="text-gray-500">
          {" "}
          <b>Email: </b> {user.email}
        </p>
        <p className="text-gray-500">
          <b>Telefone: </b>
          {user.phone}
        </p>
      </div>
      {/* Buttons */}
      <div className="mt-4 mb-4 flex justify-end gap-4"></div>
    </div>
  );
};
