import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const { toggleCart, getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header onCartOpen={toggleCart} cartItemCount={getTotalItems()} />
      <Hero />
      <ProductGrid featured={true} title="Featured Products" description="Discover our handpicked selection of trending fashion pieces" />
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Index;
