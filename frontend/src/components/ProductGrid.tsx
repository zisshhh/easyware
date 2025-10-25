import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { apiService } from '@/services/api';

// Sample products data
import tshirtImage from '@/assets/product-tshirt.jpg';
import dressImage from '@/assets/product-dress.jpg';
import jeansImage from '@/assets/product-jeans.jpg';
import sweaterImage from '@/assets/product-sweater.jpg';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 2499,
    image: tshirtImage,
    category: 'Basics',
    gender: 'unisex',
    isNew: true,
  },
  {
    id: '2',
    name: 'Elegant Black Dress',
    price: 7499,
    image: dressImage,
    category: 'Dresses',
    gender: 'women',
  },
  {
    id: '3',
    name: 'Premium Denim Jeans',
    price: 6799,
    image: jeansImage,
    category: 'Denim',
    gender: 'men',
  },
  {
    id: '4',
    name: 'Cozy Knit Sweater',
    price: 5999,
    image: sweaterImage,
    category: 'Knitwear',
    gender: 'unisex',
    isNew: true,
  },
  {
    id: '5',
    name: 'Summer Cotton Dress',
    price: 4999,
    image: dressImage,
    category: 'Dresses',
    gender: 'women',
  },
  {
    id: '6',
    name: 'Women\'s Casual T-Shirt',
    price: 3999,
    image: tshirtImage,
    category: 'Tops',
    gender: 'women',
  },
  {
    id: '7',
    name: 'Slim Fit Chinos',
    price: 7299,
    image: jeansImage,
    category: 'Pants',
    gender: 'men',
  },
  {
    id: '8',
    name: 'Men\'s Wool Blazer',
    price: 12999,
    image: sweaterImage,
    category: 'Outerwear',
    gender: 'men',
    isNew: true,
  },
  {
    id: '9',
    name: 'Women\'s Floral Maxi Dress',
    price: 5499,
    image: dressImage,
    category: 'Dresses',
    gender: 'women',
    isNew: true,
  },
  {
    id: '10',
    name: 'Men\'s Casual Shirt',
    price: 3499,
    image: tshirtImage,
    category: 'Shirts',
    gender: 'men',
  },
  {
    id: '11',
    name: 'Women\'s Denim Jacket',
    price: 6999,
    image: jeansImage,
    category: 'Outerwear',
    gender: 'women',
  },
  {
    id: '12',
    name: 'Men\'s Leather Jacket',
    price: 14999,
    image: sweaterImage,
    category: 'Outerwear',
    gender: 'men',
  },
  {
    id: '13',
    name: 'Women\'s Knit Cardigan',
    price: 4499,
    image: sweaterImage,
    category: 'Knitwear',
    gender: 'women',
  },
  {
    id: '14',
    name: 'Men\'s Cargo Pants',
    price: 5999,
    image: jeansImage,
    category: 'Pants',
    gender: 'men',
  },
  {
    id: '15',
    name: 'Women\'s Silk Blouse',
    price: 3999,
    image: tshirtImage,
    category: 'Tops',
    gender: 'women',
  },
  {
    id: '16',
    name: 'Men\'s Polo T-Shirt',
    price: 2999,
    image: tshirtImage,
    category: 'Basics',
    gender: 'men',
  },
];

interface ProductGridProps {
  filterGender?: 'men' | 'women' | 'unisex';
  title?: string;
  description?: string;
  category?: string;
  featured?: boolean;
}

export const ProductGrid = ({ filterGender, title = 'Featured Products', description = 'Discover our carefully curated selection of premium fashion pieces', category, featured }: ProductGridProps = {}) => {
  const { addItem, openCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data;
        
        if (featured) {
          data = await apiService.getFeaturedProducts();
          setProducts(data || []);
        } else {
          const params: any = {
            limit: 16
          };
          
          if (category) {
            params.category = category;
          }
          
          if (filterGender) {
            // Map gender filter to category if needed
            if (filterGender === 'men') params.category = 'men';
            if (filterGender === 'women') params.category = 'women';
          }
          
          data = await apiService.getProducts(params);
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to sample data
        const filteredSampleProducts = filterGender 
          ? sampleProducts.filter(p => p.gender === filterGender || p.gender === 'unisex')
          : sampleProducts;
        setProducts(filteredSampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filterGender, category, featured]);

  const filteredProducts = filterGender 
    ? products.filter(p => p.gender === filterGender || p.gender === 'unisex')
    : products;

  const handleAddToCart = (product: Product) => {
    addItem(product);
    openCart();
  };

  const handleToggleWishlist = (product: Product) => {
    // Wishlist functionality would be implemented here
    console.log('Toggle wishlist for:', product.name);
  };

  return (
    <section className="py-20 bg-background" id="shop">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Products
          </button>
        </motion.div>
      </div>
    </section>
  );
};