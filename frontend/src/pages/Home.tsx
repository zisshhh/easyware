import { Navbar } from "@/components/Navbaar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
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

                        <div className="aspect-[4/3] md:aspect-[5/3] w-full rounded-xl border bg-secondary/50" aria-hidden>
                            <div className="w-full h-full grid place-items-center text-muted-foreground">
                                <span className="text-sm">Hero image placeholder</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="border-b">
                <div className="container mx-auto px-4 py-10 md:py-12">
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="text-xl md:text-2xl font-semibold">Shop by category</h2>
                        <Link to="/products" className="text-sm text-primary hover:underline">View all</Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { name: "Electronics" },
                            { name: "Home & Kitchen" },
                            { name: "Fashion" },
                            { name: "Beauty" },
                            { name: "Sports" },
                            { name: "Toys" },
                        ].map((cat) => (
                            <Link key={cat.name} to={`/category/${encodeURIComponent(cat.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-'))}`} className="group">
                                <div className="aspect-square rounded-lg border bg-card grid place-items-center transition-all group-hover:border-ring">
                                    <span className="text-sm text-muted-foreground">{cat.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="featured" className="border-b bg-card/30">
                <div className="container mx-auto px-4 py-10 md:py-12">
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="text-xl md:text-2xl font-semibold">Featured products</h2>
                        <Link to="/products" className="text-sm text-primary hover:underline">Browse products</Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Link key={i} to={`/product/${i + 1}`} className="group">
                                <div className="rounded-lg border overflow-hidden bg-card transition-all hover:shadow-sm">
                                    <div className="aspect-[4/3] w-full bg-secondary/60" />
                                    <div className="p-3 md:p-4 space-y-1.5">
                                        <h3 className="text-sm md:text-base font-medium">Product name {i + 1}</h3>
                                        <p className="text-muted-foreground text-xs md:text-sm">Category</p>
                                        <div className="flex items-center justify-between pt-1.5">
                                            <span className="font-semibold">$ {(19.99 + i).toFixed(2)}</span>
                                            <Button size="sm">Add to cart</Button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <section>
                <div className="container mx-auto px-4 py-10 md:py-12">
                    <div className="rounded-xl border bg-gradient-to-r from-secondary to-accent p-6 md:p-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold">Sign up and get 10% off</h3>
                                <p className="text-muted-foreground mt-1">Join our newsletter for deals, new drops, and updates.</p>
                            </div>
                            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                                <Input placeholder="Enter your email" className="h-11" />
                                <Button className="h-11">Subscribe</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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