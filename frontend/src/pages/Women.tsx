import { Header } from '@/components/Header';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { useCart } from '@/contexts/CartContext';

const Women = () => {
  const { toggleCart, getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header onCartOpen={toggleCart} cartItemCount={getTotalItems()} />
      <main className="pt-32 pb-20">
        <ProductGrid 
          category="women"
          title="Women's Collection"
          description="Discover the latest trends in women's fashion"
        />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Women;
