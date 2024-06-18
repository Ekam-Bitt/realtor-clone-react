import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import Spinner from "../components/Loading";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";
export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
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
    fetchListings();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade, Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                className="relative w-full overflow-hidden h-[250px] md:h-[400px] lg:h-[600px]"
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p className="absolute top-1 left-0 w-[215px] bg-black text-white text-center font-semibold p-2 rounded-tl-lg border border-gray-300 rounded-br-lg text-lg">
                {data.name}
              </p>
              <p className="absolute bottom-[0px] w-[215px] right-0 bg-red-500 text-white text-center font-semibold p-2 rounded-tl-lg border border-gray-300 rounded-br-lg text-lg">
                ${data.discountedPrice ?? data.regularPrice}
                {data.type === "rent" && " / month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
