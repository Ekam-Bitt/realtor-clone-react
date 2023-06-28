import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  function PathMatchRoute(route) {
    return route === location.pathname;
  }
  return (
    <div className=" bg-white border-b shadow-sm sticky top-0 z-50">
      <header className=" flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="realtor-logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`py-3 cursor-pointer text-sm font-semibold ${
                PathMatchRoute("/")
                  ? "text-black border-b-red-600"
                  : "text-gray-500 border-b-transparent"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 cursor-pointer text-sm font-semibold ${
                PathMatchRoute("/Offers")
                  ? "text-black border-b-red-600"
                  : "text-gray-500 border-b-transparent"
              }`}
              onClick={() => navigate("/Offers")}
            >
              Offers
            </li>
            <li
              className={`py-3 cursor-pointer text-sm font-semibold ${
                PathMatchRoute("/Sign-In")
                  ? "text-black border-b-red-600"
                  : "text-gray-500 border-b-transparent"
              }`}
              onClick={() => navigate("/Sign-In")}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
