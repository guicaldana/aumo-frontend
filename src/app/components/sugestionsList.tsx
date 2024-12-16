"use client";

import { useEffect } from "react";
import { SugestionCard } from "./sugestion-card";

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

type SugestionListProps = {
  savedUsers: User[];
  setSavedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  skippedUsers: User[];
  setSkippedUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export const SugestionList = ({
  skippedUsers,
  setSkippedUsers,
  setSavedUsers,
}: SugestionListProps) => {
  const followUser = (email: string) => {
    // Encontra o usuário que será seguido
    const userToFollow = skippedUsers.find(
      (user) => user.profile.email === email
    );
    if (!userToFollow) return;

    // Atualiza a lista de usuários seguidos (`savedUsers`)
    setSavedUsers((prevSavedUsers) => {
      // Evita duplicatas em `savedUsers`
      if (
        prevSavedUsers.some((savedUser) => savedUser.profile.email === email)
      ) {
        return prevSavedUsers;
      }
      const updatedSavedUsers = [...prevSavedUsers, userToFollow];
      // Atualiza no localStorage
      localStorage.setItem("savedUsers", JSON.stringify(updatedSavedUsers));
      return updatedSavedUsers;
    });

    // Remove o usuário de `skippedUsers`
    setSkippedUsers((prevSkippedUsers) => {
      const updatedSkippedUsers = prevSkippedUsers.filter(
        (user) => user.profile.email !== email
      );
      // Atualiza no localStorage
      localStorage.setItem("skippedUsers", JSON.stringify(updatedSkippedUsers));
      return updatedSkippedUsers;
    });
  };

  useEffect(() => {
    // Ao montar o componente, verifica o localStorage para preencher as listas
    const saved = localStorage.getItem("savedUsers");
    if (saved) {
      setSavedUsers(JSON.parse(saved));
    }

    const skipped = localStorage.getItem("skippedUsers");
    if (skipped) {
      setSkippedUsers(JSON.parse(skipped));
    }
  }, [setSavedUsers, setSkippedUsers]);

  if (!skippedUsers.length) {
    return <div className="text-center">No skipped users available</div>;
  }
  const removeUser = (email: string) => {
    // Remove o usuário de skippedUsers
    setSkippedUsers((prevSkippedUsers) => {
      const updatedSkippedUsers = prevSkippedUsers.filter((user) => user.profile.email !== email);
  
      // Atualiza o localStorage com a nova lista de skippedUsers
      localStorage.setItem("skippedUsers", JSON.stringify(updatedSkippedUsers));
  
      return updatedSkippedUsers;
    });
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold">Suggestions</h2>
      <p className="text-gray-500">People you may know</p>
      <div className="flex gap-4 overflow-x-auto py-2 sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[900px]">
        <div className="flex flex-row">
          {skippedUsers.map((user) => (
            <div className="pr-1" key={user.contact.email}>
              <SugestionCard user={user} followUser={followUser} removeUser={removeUser}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
