"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
// import Link from "next/link";

type Location = {
    street: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
  }
  
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
}

export const Header = () =>{

    const [savedUsers, setSavedUsers] = useState<User[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const unfollowUser = (email: string) => {
        const updatedUsers = savedUsers.filter((user) => user.profile.email !== email);
        setSavedUsers(updatedUsers);
        localStorage.setItem("savedUsers", JSON.stringify(updatedUsers));
      };

    useEffect(() => {
        
      }, [isDropdownOpen]);

      useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
    
        if (isDropdownOpen) {
          // Chama a função para carregar os seguidores imediatamente
          const saved = localStorage.getItem("savedUsers");
        if (saved) {
          setSavedUsers(JSON.parse(saved));
        }
    
          // Configura um intervalo para atualizar a lista a cada 5 segundos
          interval = setInterval(() => {
            const saved = localStorage.getItem("savedUsers");
        if (saved) {
          setSavedUsers(JSON.parse(saved));
        }
          }, 1000);
        } else if (interval) {
          // Limpa o intervalo quando o dropdown for fechado
          clearInterval(interval);
        }
    
        // Limpa o intervalo quando o componente for desmontado
        return () => {
          if (interval) {
            clearInterval(interval);
          }
        };
      }, [isDropdownOpen, setSavedUsers]);

      const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
      };

      return (
        <header className="flex bg-[var(--header-background)] py-4 px-20 items-center justify-between relative">
      {/* Header title */}
      <h1 className="text-xl font-bold">users_like.me</h1>

      {/* Dropdown menu */}
      <nav className="relative">
      {/* <Link href="/profile">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Meu Perfil
          </button>
        </Link> */}
        <a
          href="#"
          className="text-[var(--header-text)] cursor-pointer"
          onClick={toggleDropdown}
        >
          {savedUsers.length} Usuários seguidos
        </a>
        {isDropdownOpen && (
  <div className="followedUsers absolute top-full mt-2 text-black bg-gray-50 shadow-lg border rounded-md w-64 z-50 max-h-60 overflow-y-auto">
    <ul>
      {savedUsers.length > 0 ? (
        savedUsers.map((user) => (
          <li
            key={user.profile.email}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-500"
          >
            <Image 
            src={user.profile.picture}
            alt={user.profile.fullName}
            width={120}
            height={120}
            className="w-8 h-8 rounded-full"
            />
            <span>{user.profile.fullName}</span>
            <button
          onClick={() => unfollowUser(user.profile.email)}
          className="text-red-500 hover:text-red-700"
          title="Unfollow"
        >
          ✕
        </button>
          </li>
        ))
      ) : (
        <li className="px-4 py-2 text-gray-50">Você ainda não seguiu nenhum usuário.</li>
      )}
    </ul>
  </div>
)}
      </nav>
    </header>
      );
    };