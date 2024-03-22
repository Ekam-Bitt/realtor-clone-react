import React, { useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { IoLocationSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
export default function ListingItem({ listing, id, onDelete, onEdit }) {
  const [hovered, setHovered] = useState(false);
  const handleHover = () => {
    if (listing.imgUrls.length > 1) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div>
      <li className="bg-white p-2 rounded-xl relative overflow-hidden ">
        <Link to={`/category/${listing.type}/${id}`}>
          <img
            src={
              hovered && listing.imgUrls.length > 1
                ? listing.imgUrls[1]
                : listing.imgUrls[0]
            }
            alt="property pics"
            loading="lazy"
            className="rounded-xl h-[250px] w-full object-cover transition ease-in-out transform hover: duration-300"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          />

          <Moment
            className="absolute top-2 left-2 bg-black text-white font-semibold p-2 rounded-tl-lg border border-gray-300 rounded-br-lg text-xs"
            fromNow
          >
            {listing.timestamp?.toDate()}
          </Moment>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <IoLocationSharp className="text-green-600" />
              <p className="text-sm text-lime-700 font-semibold">
                {listing.address}
              </p>
            </div>
            <p className="text-lg font-semibold">{listing.name}</p>
            {/* <p>{listing.description}</p> */}
            {listing.type === "sell" ? (
              <p className="absolute top-[224px] right-2 bg-red-500 text-white font-semibold p-2 rounded-tl-lg border border-gray-300 rounded-br-lg text-xs">
                For Sale
              </p>
            ) : (
              <p className="absolute top-[224px] right-2 bg-red-500 text-white font-semibold p-2 rounded-tl-lg border border-gray-300 rounded-br-lg text-xs">
                For Rent
              </p>
            )}
            {listing.type === "sell" ? (
              listing.offer ? (
                <p className="text-2xl font-extrabold text-blue-600">
                  $
                  {listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              ) : (
                <p className="text-2xl font-extrabold text-blue-600">
                  $
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              )
            ) : listing.offer ? (
              <div className="flex items-end gap-1">
                <p className="text-2xl font-extrabold text-blue-600">
                  $
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                <p className="text-md font-semibold">/Month</p>
              </div>
            ) : (
              <div className="flex items-end gap-1">
                <p className="text-2xl font-extrabold text-blue-600">
                  $
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                <p className="text-md font-semibold">/Month</p>
              </div>
            )}
          </div>
          <div className="flex gap-4 font-semibold ">
            <div>
              <p>{listing.bedroom > 1 ? `${listing.bedroom} Beds` : `1 Bed`}</p>
            </div>
            <div>
              <p>
                {listing.bathroom > 1 ? `${listing.bathroom} Baths` : `1 Bath`}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-3 absolute bottom-3 right-4">
          {onDelete && (
            <FaPencil
              className=" text-lg text-blue-700"
              onClick={() =>  onEdit(listing.id)}
              cursor={"pointer"}
            />
          )}
          {onEdit && (
            <MdDelete
              className=" text-2xl text-red-700"
              onClick={() => onDelete(listing.id)}
              cursor={"pointer"}
            />
          )}
        </div>
      </li>
    </div>
  );
}
