"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";

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

export const Header = () => {
  const [savedUsers, setSavedUsers] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu responsivo
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Função para desfazer seguir
  const unfollowUser = (email: string) => {
    const updatedUsers = savedUsers.filter(
      (user) => user.profile.email !== email
    );
    setSavedUsers(updatedUsers);
    saveToLocalStorage(updatedUsers);
  };

  useEffect(() => {
    const saved = localStorage.getItem("savedUsers");
    if (saved) {
      setSavedUsers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
      saveToLocalStorage(savedUsers);

  }, [savedUsers]); // Salva sempre que os usuários mudarem
  
  // Atualiza a lista de usuários seguidos periodicamente
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

      // Chama a função para carregar os seguidores imediatamente
      const saved = localStorage.getItem("savedUsers");
      if (saved) {
        setSavedUsers(JSON.parse(saved));
      

      interval = setInterval(() => {
        const saved = localStorage.getItem("savedUsers");
        if (saved) {
          setSavedUsers(JSON.parse(saved));
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDropdownOpen]);

  // Fecha dropdown se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);


  const saveToLocalStorage = (users: User[]) => {
    localStorage.setItem("savedUsers", JSON.stringify(users));
  };
  
  const handleHomeClick = () => {
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers)); // Salva os dados no localStorage
    router.push("/"); // Navega para a Home
  };

  return (
    <header className="flex bg-[var(--header-background)] py-4 px-5 items-center justify-between relative">
      {/* Logo */}
      <Link href="/" className="text-[var(--header-text)] text-xl font-bold">
        users_like.me
      </Link>

      {/* Menu Hamburguer */}
      <button
        onClick={toggleMenu}
        className="sm:hidden text-[var(--header-text)] focus:outline-none"
      >
        ☰
      </button>

      {/* Menu Principal */}
      <nav
        className={`absolute sm:relative top-full left-0 w-full sm:w-auto sm:block bg-white sm:bg-transparent border sm:border-none shadow-md sm:shadow-none z-10 ${
          isMenuOpen ? "block text-black" : "hidden"
        }`}
      >
        <ul className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-0">
          <li>
            <a
              href="#"
              className="text-[var(--header-text)] cursor-pointer"
              onClick={toggleDropdown}
            >
              {savedUsers.length} Usuários seguidos
            </a>
          </li>
          <li>
            <Link
              href="/my-profile"
              className="text-[var(--header-text)] cursor-pointer"
            >
              Meu Perfil
            </Link>
          </li>
          <li>
          <button
              onClick={handleHomeClick} // Chama a função para garantir que os dados sejam salvos
              className="text-[var(--header-text)] cursor-pointer"
            >
              Home
            </button>
          </li>
        </ul>
      </nav>

      {/* Dropdown de usuários seguidos */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 text-black bg-gray-50 shadow-lg border rounded-md w-64 z-50 max-h-60 overflow-y-auto"
        >
          <ul>
            {savedUsers.length > 0 ? (
              savedUsers.map((user) => (
                <li
                  key={user.profile.email}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
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
              <li className="px-4 py-2 text-gray-500">
                Você ainda não seguiu nenhum usuário.
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
