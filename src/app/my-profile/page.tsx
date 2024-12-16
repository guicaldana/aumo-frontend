"use client";

import { MyProfile } from "./my-profile";

export default function MyProfilePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 pt-12 sm:pt-16">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-gray-800">
        Meu Perfil
      </h1>
      <div className="w-full flex justify-center">
        <MyProfile />
      </div>
    </div>
  );
}
