import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import clsx from "clsx";
import { sidebarItems } from "./sidebar.config";
import { toggleSidebar } from "../layoutSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { sidebarOpen } = useSelector((state) => state.layout);
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 h-full bg-primary shadow-md p-2 flex flex-col duration-500 text-white z-50",
          sidebarOpen ? "w-60" : "w-16"
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-3 py-2 h-20">
          <div
            className={clsx(sidebarOpen ? "w-14" : "w-0 hidden", "rounded-md")}
          >
            Logo
          </div>
          <Menu
            size={24}
            onClick={() => dispatch(toggleSidebar())}
            className={clsx(
              "duration-500 cursor-pointer",
              sidebarOpen && "rotate-180"
            )}
          />
        </div>

        {/* Sidebar Itmes */}
        <div className="flex-1 gap-2 mt-4">
          <>
            {filteredItems.map((item) => {
              const Icon = item.icons;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(
                      "px-2 py-2 my-2 flex gap-2 items-center rounded-md duration-300 relative group",
                      isActive ? "bg-[#2D5C74]" : "hover:bg-[#2D5C74]"
                    )
                  }
                >
                  <div>
                    <Icon size={30} />
                  </div>

                  <p
                    className={clsx(
                      !sidebarOpen && "w-0 translate-x-24",
                      "duration-500 overflow-hidden"
                    )}
                  >
                    {item.name}
                  </p>

                  <p
                    className={clsx(
                      sidebarOpen && "hidden",
                      "absolute left-16 shadow-md rounded-md w-0 p-0 text-xs text-white bg-slate-600 duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16"
                    )}
                  >
                    {item.name}
                  </p>
                </NavLink>
              );
            })}
          </>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
