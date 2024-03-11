import React, { useState } from "react";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";

export default function CreateListing() {
    const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedroom: 1,
    bathroom: 1,
    parking: false,
    furnsihed: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });
  const {
    type,
    name,
    bedroom,
    bathroom,
    parking,
    furnsihed,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;
  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    //Boolean/text/number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (images.length > 6) {
      setLoading(false);
      toast.error("Max 6 images are allowed", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined || location.includes("undefined")) {
        setLoading(false);
        toast.error("Please enter a correct Address", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not Uploaded", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing Created", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate(`/Create-Listing/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div className=" max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center my-6 font-bold">Create Listing</h1>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div>
          <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
            Sell / Rent
          </p>
          <section className="flex gap-3">
            <button
              type="button"
              id="type"
              value="sell"
              onClick={onChange}
              className={`w-full px-4 py-2 text-xl  rounded-xl border-none shadow-lg  transition duration-200 ease-in-out ${
                type === "sell"
                  ? `text-white bg-green-600`
                  : `text-black bg-white`
              }`}
            >
              Sell
            </button>
            <button
              type="button"
              id="type"
              value="rent"
              onClick={onChange}
              className={`w-full px-4 py-2 text-xl  rounded-xl border-none shadow-lg  transition duration-200 ease-in-out ${
                type === "rent"
                  ? `text-white bg-green-600`
                  : `text-black bg-white`
              }`}
            >
              Rent
            </button>
          </section>
        </div>
        <div>
          <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
            Name
          </p>
          <section>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              maxLength="32"
              minLength="10"
              required
              className="w-full px-4 py-2 text-xl text-gray-600 bg-white rounded-xl border-none transition ease-in-out"
            />
          </section>
        </div>
        <div className="flex w-full justify-between gap-4">
          <section className="w-full">
            <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
              Beds
            </p>
            <input
              type="number"
              id="bedroom"
              value={bedroom}
              onChange={onChange}
              max="20"
              min="1"
              required
              className="w-full px-4 py-2 text-xl text-gray-600 bg-white rounded-xl border-none transition ease-in-out"
            />
          </section>
          <section className="w-full">
            <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
              Bathrooms
            </p>
            <input
              type="number"
              id="bathroom"
              value={bathroom}
              onChange={onChange}
              max="20"
              min="1"
              required
              className="w-full px-4 py-2 text-xl text-gray-600 bg-white rounded-xl border-none transition ease-in-out"
            />
          </section>
        </div>
        <div>
          <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
            Parking Spot
          </p>
          <section className="flex gap-3">
            <button
              type="button"
              id="parking"
              value={true}
              onClick={onChange}
              className={`w-full px-4 py-2 text-xl  rounded-xl border-none shadow-lg  transition duration-200 ease-in-out ${
                parking ? `text-white bg-green-600` : `text-black bg-white`
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="parking"
              value={false}
              onClick={onChange}
              className={`w-full px-4 py-2 text-xl  rounded-xl border-none shadow-lg  transition duration-200 ease-in-out ${
                !parking ? `text-white bg-green-600` : `text-black bg-white`
              }`}
            >
              No
            </button>
          </section>
        </div>
        <div>
          <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
            Furnished
          </p>
          <section className="flex gap-3">
            <button
              type="button"
              id="furnsihed"
              value={true}
              onClick={onChange}
              className={`w-full px-4 py-2 text-xl  rounded-xl border-none shadow-lg  transition duration-200 ease-in-out ${
                furnsihed ? `text-white bg-green-600` : `text-black bg-white`
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="furnsihed"
              value={false}
              onClick={onChange}
              className={`w-full px-4 py-2 text-xl  rounded-xl border-none shadow-lg  transition duration-200 ease-in-out ${
                !furnsihed ? `text-white bg-green-600` : `text-black bg-white`
              }`}
            >
              No
            </button>
          </section>
        </div>
        <div>
          <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
            Address
          </p>
          <section>
            <textarea
              type="text"
              id="address"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
              className="w-full px-4 py-2 text-xl text-gray-600 bg-white rounded-xl border-none transition ease-in-out"
            />
            {!geolocationEnabled && (
              <div className="flex w-full justify-between gap-4">
                <section className="w-full">
                  <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
                    Latitude
                  </p>
                  <input
                    type="number"
                    id="latitude"
                    value={latitude}
                    onChange={onChange}
                    max="90"
                    min="-90"
                    required
                    className="w-full px-4 py-2 text-xl text-gray-600 bg-white rounded-xl border-none transition ease-in-out"
                  />
                </section>
                <section className="w-full">
                  <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
                    Longitude
                  </p>
                  <input
                    type="number"
                    id="longitude"
                    value={longitude}
                    onChange={onChange}
                    max="180"
                    min="-180"
                    required
                    className="w-full px-4 py-2 text-xl text-gray-600 bg-white rounded-xl border-none transition ease-in-out"
                  />
                </section>
              </div>
            )}
          </section>
        </div>
        <div>
          <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
            Description
          </p>
          <section>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={onChange}
              placeholder="Description"
              required
              className="w-full px-4 py-2 text-xl text-gray-600 bg-white rounded-xl border-none transition ease-in-out"
            />
          </section>
        </div>
        <div>
          <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
            Offer
          </p>
          <section className="flex gap-3">
            <button
              type="button"
              id="offer"
              value={true}
              onClick={onChange}
              className={`w-full px-4 py-2 text-xl  rounded-xl border-none shadow-lg  transition duration-200 ease-in-out ${
                offer ? `text-white bg-green-600` : `text-black bg-white`
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="offer"
              value={false}
              onClick={onChange}
              className={`w-full px-4 py-2 text-xl  rounded-xl border-none shadow-lg  transition duration-200 ease-in-out ${
                !offer ? `text-white bg-green-600` : `text-black bg-white`
              }`}
            >
              No
            </button>
          </section>
        </div>
        <div className="w-full">
          <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
            Regular Price
          </p>
          <section className="flex w-full gap-4 items-center">
            <input
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onChange}
              min="0"
              required
              className="w-full px-4 py-2 text-xl text-gray-600 bg-white rounded-xl border-none transition ease-in-out"
            />
            {type === "rent" && (
              <div className="w-full">
                <p>$ / month</p>
              </div>
            )}
          </section>
        </div>
        {offer === true && (
          <div className="w-full">
            <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
              Discounted Price
            </p>
            <section className="flex w-full gap-4 items-center">
              <input
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onChange}
                min="0"
                max={regularPrice}
                required
                className="w-full px-4 py-2 text-xl text-gray-600 bg-white rounded-xl border-none transition ease-in-out"
              />
              {type === "rent" && (
                <div className="w-full">
                  <p>$ / month</p>
                </div>
              )}
            </section>
          </div>
        )}
        <div>
          <p className=" text-black font-semibold whitespace-nowrap text-base sm:text-lg">
            Upload Images
          </p>
          <p className=" italic mb-1">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            accept=".jpg , .png, .jpeg"
            onChange={onChange}
            multiple
            required
            className="w-full px-4 py-2 text-md text-gray-600 bg-white rounded-xl border-none transition ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-xl text-white bg-black rounded-xl border-none shadow-lg hover:text-black hover:bg-white transition duration-200 ease-in-out"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}
