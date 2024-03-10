import React, { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedroom: 1,
    bathroom: 2,
    parking: false,
    furnsihed: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
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
  } = formData;
  function onChange() {}
  return (
    <div className=" max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center my-6 font-bold">Create Listing</h1>
      <form className="flex flex-col gap-4">
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
