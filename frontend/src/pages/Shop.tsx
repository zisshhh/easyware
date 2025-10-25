import { Header } from '@/components/Header';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { useCart } from '@/contexts/CartContext';

const Shop = () => {
  const { toggleCart, getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header onCartOpen={toggleCart} cartItemCount={getTotalItems()} />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Products</h1>
          <p className="text-muted-foreground mb-12">Explore our complete collection</p>
        </div>
        <ProductGrid />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Shop;
