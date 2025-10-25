import { Header } from '@/components/Header';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { useCart } from '@/contexts/CartContext';

const Men = () => {
  const { toggleCart, getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header onCartOpen={toggleCart} cartItemCount={getTotalItems()} />
      <main className="pt-32 pb-20">
        <ProductGrid 
          category="men"
          title="Men's Collection"
          description="Elevate your style with our men's essentials"
        />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Men;
