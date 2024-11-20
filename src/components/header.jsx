"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Header({ BackButton, username, SaveButton, handleSave, url }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("TokenX");
    router.push("/login");
  };

  return (
    <div className="grid grid-cols-3 w-full pt-14 gap-4 px-4 items-center">
      <Link href={url} className="cursor-pointer flex items-center space-x-3 justify-start">
        {BackButton && (
          <>
            <img src="/back-chevron.png" className="w-2" alt="Back Icon" />
            <span className="cursor-pointer text-md font-semibold text-white">Back</span>
          </>
        )}
      </Link>

      <div className="relative flex justify-center">
        <span
          className="text-md font-semibold text-white cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {username || ""}
        </span>
        {isDropdownOpen && (
          <div className="absolute top-8 bg-dark rounded shadow-md w-32 text-white ">
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {SaveButton && (
          <div className="cursor-pointer" onClick={handleSave}>
            <p className="text-blue-300 font-semibold">Save</p>
          </div>
        )}
      </div>
    </div>
  );
}
