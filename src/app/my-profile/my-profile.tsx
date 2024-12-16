import Image from "next/image";

type Location = {
    street: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  
  type User = {
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
  
  export function MyProfile() {
    const myUser: User = {
      profile: {
        fullName: "Guilherme Teixeira Caldana",
        gender: "Masculino",
        email: "guicaldanapro@gmail.com",
        phone: "+55 27 99736-7973",
        location: {
          street: "123 Rua Principal",
          city: "Vila Velha",
          state: "Espírito Santo",
          country: "Brasil",
          postcode: "12345-678",
        },
        picture: "/myProfilePhoto.jpg", // Imagem do perfil
      },
      contact: {
        phone: "+55 27 99736-7973",
        email: "seuemail@exemplo.com",
      },
      personal: {
        dateOfBirth: "2002-01-31",
        nat: "BR",
      },
    };

    function formatDate(date: string): string {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
      }
  
    return (
      <div className="flex flex-col items-center gap-6 p-8 bg-gray-50 rounded-md shadow-md max-w-lg mx-auto sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[900px]">
        <div className="profile-pic w-full h-36 overflow-hidden rounded-t-lg relative">
        {myUser && (
          <Image
            src={myUser.profile.picture}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className=" filter blur-sm"
          />
        )}
      </div>

      {/* Profile Image */}
      <div className="profile-pic mt-[-100px] w-36 h-36 z-10 ">
        {myUser && (
          <Image
            src={myUser.profile.picture}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full border-4 border-white"
          />
        )}
      </div>
        <h1 className="text-2xl font-bold text-black">{myUser.profile.fullName}</h1>
        <p className="text-gray-600">{myUser.profile.email}</p>
        <div className="flex flex-col gap-2 text-gray-700">
          <p>
            <strong>Telefone:</strong> {myUser.contact.phone}
          </p>
          <p>
            <strong>Localização:</strong> {myUser.profile.location.city},{" "}
            {myUser.profile.location.state} - {myUser.profile.location.country}
          </p>
          <p>
            <strong>Data de Nascimento:</strong> {formatDate(myUser.personal.dateOfBirth)}
          </p>
          <p>
            <strong>Nacionalidade:</strong> {myUser.personal.nat}
          </p>
        </div>
      </div>
    );
  }
  