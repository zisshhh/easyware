
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewArrivals() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/api/v1/products`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        setProducts(res.data?.allProducts || []);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">New Arrivals</h2>

        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={800}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={product.imageURL?.[0] || "https://via.placeholder.com/300x300?text=No+Image"}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white text-lg font-semibold">{product.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-blue-600 font-bold text-lg">Rs. {product.price}</p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
