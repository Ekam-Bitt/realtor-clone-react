import { React, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const auth = getAuth();
  const [formData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  return (
    <div>
      <section>
        <h1 className="text-3xl text-center mt-6 font-bold">Profile</h1>
        <form className="flex flex-col gap-4 justify-center flex-wrap items-center max-w-md m-auto px-6 py-12">
          <input
            type="text"
            id="name"
            value={name}
            disabled
            placeholder="Name"
            className="w-full px-4 py-2 text-xl text-black bg-white rounded-xl border-none transition ease-in-out"
          />
          <input
            type="email"
            id="email"
            value={email}
            disabled
            placeholder="Email"
            className="w-full px-4 py-2 text-xl text-black bg-white rounded-xl border-none transition ease-in-out"
          />
          <div className="flex justify-between w-full px-2 whitespace-nowrap text-sm sm:text-base lg:text-md">
            <p>
              Do you want to change your name?
              <Link className="text-white hover:text-black transition duration-200 ease-in-out">
                {" "}
                Edit
              </Link>
            </p>
            <Link onClick={()=> auth.signOut()} to="/" className=" text-white hover:text-black transition duration-200 ease-in-out">
              Sign Out
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
