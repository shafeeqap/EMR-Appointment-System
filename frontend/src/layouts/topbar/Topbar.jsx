import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Bell, Settings, UserRound } from "lucide-react";
import { getFullName, getUserRole } from "../../utils/userHelpers";
import IconButton from "../../features/dashboard/components/IconButton";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu";
import { useLocation } from "react-router-dom";
import { sidebarItems } from "../sidebar/sidebar.config";

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const currentMenu = sidebarItems.find(
    (item) => item.path === location.pathname
  );

  const dropdownRef = useRef(null);

  const fullName = getFullName(user);
  const roleLabel = getUserRole(user.role);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current) return;

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow pl-20 p-4 flex justify-between items-center">
      <h1 className="font-semibold text-lg">
        {currentMenu?.name || "Dashboard"}
      </h1>

      <div className="flex gap-2 items-center ">
        <IconButton>
          <Settings size={30} />
        </IconButton>

        <IconButton>
          <Bell size={30} />
        </IconButton>

        <div className="hidden sm:block">
          <p className="font-semibold">{fullName}</p>
          <p className="text-textPrimary">
            <small>{roleLabel}</small>
          </p>
        </div>

        {/* User profile */}
        <div ref={dropdownRef} className="relative">
          <IconButton onClick={handleDropdownToggle}>
            <UserRound size={30} />
          </IconButton>

          <div className="absolute right-0 top-16">
            {dropdownOpen && <DropdownMenu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
