import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  orderBy,
  query,
  updateDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { RiHome3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigate = useNavigate();
  const { name, email } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in the firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  return (
    <>
      <h1 className="text-3xl text-center mt-6 font-bold">Profile</h1>
      <form className="flex flex-col gap-4 justify-center flex-wrap items-center max-w-md m-auto px-6 py-12">
        <input
          type="text"
          id="name"
          value={name}
          disabled={!changeDetail}
          onChange={onChange}
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
            <Link
              onClick={() => {
                changeDetail && onSubmit();
                setChangeDetail((prevState) => !prevState);
              }}
              className="text-white hover:text-black transition duration-200 ease-in-out"
            >
              {" "}
              {changeDetail ? "Apply" : "Edit"}
            </Link>
          </p>
          <Link
            onClick={() => auth.signOut()}
            to="/"
            className=" text-white hover:text-black transition duration-200 ease-in-out"
          >
            Sign Out
          </Link>
        </div>
        <Link></Link>
        <button
          type="submit"
          className="w-full px-4 py-2 text-xl flex justify-center items-center gap-3 text-white bg-black rounded-xl border-none shadow-lg hover:text-black hover:bg-white transition duration-200 ease-in-out"
          onClick={() => navigate("/Create-Listing")}
        >
          <RiHome3Line className="text-2xl" />
          Sell or Rent your Home
        </button>
      </form>
      <div>
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-3xl text-center mt-6 font-bold">My Listings</h2>
            <ul>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
