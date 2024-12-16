"use client";

import { Profile } from "./components/profile";
import { SugestionList } from "./components/sugestionsList";
import { ContactInfoCard } from "./components/contact-info-card";
import { PersonalInfoCard } from "./components/personal-info-card";
import { useEffect, useState } from "react";

export default function Home() {
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

  const [mainUser, setMainUser] = useState<User>();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [savedUsers, setSavedUsers] = useState<User[]>([]);
  const [skippedUsers, setSkippedUsers] = useState<User[]>([]);

  async function fetchUser(): Promise<User | undefined> {
    try {
      const response = await fetch("https://randomuser.me/api/", {
        method: "GET",
      });
      if (!response.ok) throw new Error("Error fetching user");
      const data = await response.json();
      const user = data.results[0];
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
            postcode: user.location.postcode,
          },
          picture: user.picture.large,
        },
        contact: {
          phone: user.phone,
          email: user.email,
        },
        personal: {
          dateOfBirth: user.dob.date,
          nat: user.nat,
        },
      };

      setMainUser(mappedUser);
      console.log(mainUser);
      return mainUser;
    } catch (error) {
      setError("Failed to fetch user");
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const saved = localStorage.getItem("savedUsers");
    if (saved) {
      setSavedUsers(JSON.parse(saved));
    }
    fetchUser();
  }, []);

  useEffect(() => {
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
  }, [savedUsers]);

  if (!mainUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-500">
        {loading ? "Loading..." : error}
      </div>
    );
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-black mt-[200px]">
        <Profile
          user={mainUser.profile}
          fetchUser={fetchUser}
          setSavedUsers={setSavedUsers}
          savedUsers={savedUsers}
          skippedUsers={skippedUsers}
          setSkippedUsers={setSkippedUsers}
        />
        <div className="flex flex-row">
          <PersonalInfoCard user={mainUser.personal} />
          <ContactInfoCard user={mainUser.contact} />
        </div>
        <SugestionList
          skippedUsers={skippedUsers}
          setSkippedUsers={setSkippedUsers}
          setSavedUsers={setSavedUsers}
          savedUsers={savedUsers}
        />
      </main>
    </div>
  );
}
