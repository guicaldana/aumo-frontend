'use client'

import { useState, useEffect } from "react";
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
    age: number;
  };
};

export const SugestionList = () => {
  const [users, setUsers] = useState<User[]>([]); // Mudei para usar o estado para armazenar os usuários
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const response = await fetch("https://randomuser.me/api/", { method: "GET" });
      if (!response.ok) throw new Error("Error fetching user");
      const data = await response.json();
      const user = data.results[0]; // Acessa o primeiro (e provavelmente único) usuário da lista
      const mappedUser: User = {
        profile: {
          fullName: `${user.name.title} ${user.name.first} ${user.name.last}`,
          gender: user.gender,
          email: user.email,
          phone: user.phone,
          location: {
            street: `${user.location.street.number} ${user.location.street.name}`,
            city: user.location.city,
            state: user.location.state,
            country: user.location.country,
            postcode: user.location.postcode
          },
          picture: user.picture.large
        },
        contact: {
          phone: user.phone,
          email: user.email
        },
        personal: {
          dateOfBirth: user.dob.date,
          age: user.dob.age
        }
      };

      // Atualizando o estado e limitando o número de usuários a 5
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, mappedUser];
        return updatedUsers.length > 5 ? updatedUsers.slice(0, 5) : updatedUsers; // Limita a 5
      });
    } catch (error) {
      setError("Failed to fetch user");
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  const followUser = (email: string) => {
    const updatedUsers = users.filter(user => user.profile.email !== email);
    setUsers(updatedUsers); // Atualiza o estado com o array filtrado
    fetchUser(); // Busca um novo usuário
  };

  // Ao carregar o componente, fazemos o fetch de 5 usuários
  useEffect(() => {
    const loadUsers = async () => {
      for (let i = 0; i < 5; i++) {
        await fetchUser();
      }
      setLoading(false);
    };

    loadUsers();
  }, []); // O array vazio garante que o fetch seja feito apenas uma vez

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Sugestions</h2>
      <p className="text-gray-500">People you may know</p>
      <div className="flex gap-4">
        <div className="flex flex-row">
          {users.map((user) => (
            <div className="pr-1" key={user.contact.email}>
              <SugestionCard user={user} followUser={followUser}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
