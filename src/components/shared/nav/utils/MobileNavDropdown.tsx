"use client";

import { nanoid } from "nanoid";
import { useState, useRef, useEffect } from "react";
import { ActiveLink } from "./ActiveLink";
import { getCurrentUser, IUser, logout } from "@/services/auth.service";
import {
  navLinks,
  authLinks,
  dashboardLinks,
} from "@/constant/navigationLinks";

export const MobileNavDropdown = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  // Fetch user info.
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) setUser(currentUser);
    };
    fetchUser();
  }, []);

  // Update dropdown position based on button's viewport position.
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4, // 4px below the button
        left: rect.left - 80, // adjust horizontal offset as needed
      });
    }
  };

  // Toggle dropdown visibility.
  const handleToggleDropdown = () => {
    updateDropdownPosition();
    setShowDropDown((prev) => !prev);
  };

  // Close dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout handler.
  const handleLogout = async () => {
    await logout();
    setUser(null);
    setShowDropDown(false);
    window.location.href = "/";
  };

  return (
    <div className="relative">
      {/* Dropdown Toggle Button */}
      <button
        ref={buttonRef}
        onClick={handleToggleDropdown}
        className="flex gap-2 items-center py-2 px-3 text-tertiary-text font-geist font-normal text-sm leading-[22px] border rounded-md transition-transform duration-200 hover:shadow-md"
      >
        <span>Menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          className={`transition-transform duration-200 ${
            showDropDown ? "rotate-180" : ""
          }`}
        >
          <path
            d="M3 5.00002L6.00001 8L9.00001 5"
            stroke="#8C919A"
            strokeWidth="1.5"
            strokeMiterlimit="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showDropDown && (
        <div
          ref={dropdownRef}
          style={{
            position: "fixed", // use fixed positioning to ignore parent's transforms
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
          className="w-[150px] bg-white border border-gray-200 shadow-lg z-50 rounded-md transition-all duration-300"
        >
          {navLinks.map((link) => (
            <ActiveLink
              key={nanoid()}
              href={link.link}
              extraClasses="block py-2 px-4"
            >
              {link.title}
            </ActiveLink>
          ))}

          {user ? (
            <>
              {dashboardLinks.map((link) => (
                <ActiveLink
                  key={nanoid()}
                  href={link.link}
                  extraClasses="block py-2 px-4"
                >
                  {link.title}
                </ActiveLink>
              ))}
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 text-sm text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            authLinks.map((link) => (
              <ActiveLink
                key={nanoid()}
                href={link.link}
                extraClasses="block py-2 px-4"
              >
                {link.title}
              </ActiveLink>
            ))
          )}
        </div>
      )}
    </div>
  );
};
