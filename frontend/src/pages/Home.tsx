import { Navbar } from "@/components/Navbaar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import heroImage from "../assets/heroImage.jpg"
import Hoodie from "../assets/Hoodie.jpg"
import Kurta from "../assets/Kurta.jpg"
import Top from "../assets/Top.jpg"
import NewArrivals from "@/components/NewArrivals"

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero-sec */}
            <section className="border-b bg-card/50">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-5">
                            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                                Discover quality products at unbeatable prices
                            </h1>
                            <p className="text-muted-foreground text-base md:text-lg">
                                Shop the latest arrivals and bestsellers, curated for everyday convenience.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link to="/products">
                                    <Button size="lg">Shop Now</Button>
                                </Link>
                                <a href="#featured">
                                    <Button size="lg" variant="outline">View Featured</Button>
                                </a>
                            </div>

                            <div className="max-w-md">
                                <div className="relative">
                                    <Input placeholder="Search products, brands, categories" className="pl-3 pr-10 h-11" />
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden aspect-4/3 md:aspect-5/3 w-full rounded-xl border bg-secondary/50" aria-hidden>
                            <img src={heroImage} alt="Featured" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories Hero Section */}
            <section className="w-full flex justify-center items-center py-8 md:py-14">
                <div className="bg-white bg-opacity-60 rounded-2xl shadow p-4 md:p-10 flex flex-col w-[95vw] max-w-5xl">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">Featured Categories</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Men category */}
                        <div className="relative rounded-xl overflow-hidden group aspect-4/3 flex items-center justify-center">
                            <Link to={"/products"}>
                                <img src={Hoodie} alt="Men's Apparel" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                                <span className="relative font-bold text-white text-lg md:text-2xl z-10">Men's Apparel</span>
                            </Link>
                        </div>
                        {/* Women category */}
                        <div className="relative rounded-xl overflow-hidden group aspect-4/3 flex items-center justify-center">
                            <Link to={"/products"}>
                                <img src={Kurta} alt="Women's Fashion" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                                <span className="relative font-bold text-white text-lg md:text-2xl z-10">Women's Fashion</span>
                            </Link>
                        </div>
                        {/* Accessories category */}
                        <div className="relative rounded-xl overflow-hidden group aspect-4/3 flex items-center justify-center">
                            <Link to={"/products"}>
                                <img src={Top} alt="Accessories" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                                <span className="relative font-bold text-white text-lg md:text-2xl z-10">Accessories</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* New Arrivals Section */}
            <NewArrivals />

            {/* Footer */}
            <footer className="border-t">
                <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                        <p>© {new Date().getFullYear()} Easyware. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <Link to="/privacy" className="hover:underline">Privacy</Link>
                            <Link to="/terms" className="hover:underline">Terms</Link>
                            <Link to="/contact" className="hover:underline">Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}