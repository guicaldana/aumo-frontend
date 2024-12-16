"use client";

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

type ProfileProps = {
  user: {
    fullName: string;
    gender: string;
    email: string;
    phone: string;
    location: Location;
    picture: string;
  };
  fetchUser: () => void;
  setSavedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  savedUsers: User[];
  skippedUsers: User[];
  setSkippedUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

import Image from "next/image";
import { useEffect, useState } from "react";

export const Profile = ({
  user,
  fetchUser,
  setSavedUsers,
  savedUsers,
  setSkippedUsers,
}: ProfileProps) => {
  const isFollowed = savedUsers.some(
    (savedUser) => savedUser.profile.email === user.email
  );
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Verifica o localStorage quando o componente for montado e atualize a lista de savedUsers
    const saved = localStorage.getItem("savedUsers");
    if (saved) {
      const usersFromLocalStorage = JSON.parse(saved);
      setSavedUsers(usersFromLocalStorage);
    }
  }, [setSavedUsers]);

  useEffect(() => {
    // Atualizar savedUsers e a flag isFollowing a cada 1 segundo
    const interval = setInterval(() => {
      const saved = localStorage.getItem("savedUsers");
      if (saved) {
        const updatedSavedUsers = JSON.parse(saved);
        setSavedUsers(updatedSavedUsers); // Atualiza a lista de usuários salvos
        const isUserFollowed = savedUsers.some(
          (savedUser) => savedUser.profile.email === user.email
        );
        setIsFollowing(isUserFollowed); // Verifica se o usuário está na lista de seguidos
      }
    }, 1000); // 1 segundo de intervalo

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [savedUsers, setSavedUsers, user.email]);

  const handleFollow = () => {
    setSavedUsers((prevUsers) => {
      // Verifica se o usuário já foi seguido
      const isUserFollowed = prevUsers.some(
        (savedUser) => savedUser.profile.email === user.email
      );
      if (isUserFollowed) {
        alert("You are already following this user!");
        return prevUsers;
      }

      // Cria um objeto do tipo User para adicionar ao array
      const newUser: User = {
        profile: user,
        contact: {
          email: user.email,
          phone: user.phone,
        },
        personal: {
          dateOfBirth: "",
          nat: "",
        },
      };

      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem("savedUsers", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  const handleSkipUser = () => {
    setSkippedUsers((prevSkippedUsers) => {
      // Verifica se o usuário já foi seguido
      const isUserFollowed = savedUsers.some(
        (savedUser) => savedUser.profile.email === user.email
      );
      if (isUserFollowed) {
        return prevSkippedUsers; // Não adiciona o usuário aos pulados
      }

      // Verifica se o usuário já está na lista de skippedUsers
      const isUserSkipped = prevSkippedUsers.some(
        (skippedUser) => skippedUser.profile.email === user.email
      );
      if (isUserSkipped) return prevSkippedUsers;

      // Cria um objeto do tipo User para adicionar ao array
      const skippedUser: User = {
        profile: user,
        contact: {
          email: user.email,
          phone: user.phone,
        },
        personal: {
          dateOfBirth: "",
          nat: "",
        },
      };

      const updatedSkippedUsers = [...prevSkippedUsers, skippedUser];
      // Atualiza o localStorage
      localStorage.setItem("skippedUsers", JSON.stringify(updatedSkippedUsers));
      return updatedSkippedUsers;
    });

    // Chama a função para buscar o próximo usuário
    fetchUser();
  };

  useEffect(() => {
    const skipped = localStorage.getItem("skippedUsers");
    if (skipped) {
      const usersFromLocalStorage = JSON.parse(skipped);
      setSkippedUsers(usersFromLocalStorage);
    }
  }, [setSkippedUsers]);

  return (
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
        <p className="location text-gray-500">
          {user.location.city}, {user.location.state}, {user.location.country}
        </p>
      </div>
      {/* Buttons */}
      <div className="mt-4 mb-4 flex justify-center gap-4">
        <button
          className={`py-2 px-4 rounded-lg ${
            isFollowed
              ? "bg-gray-400 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={handleFollow}
          disabled={isFollowed}
        >
          {isFollowing ? "Seguindo" : "Seguir"}
        </button>
        <button
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
          onClick={handleSkipUser}
        >
          Próximo Usuário
        </button>
      </div>
    </div>
  );
};
