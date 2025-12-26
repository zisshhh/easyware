import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User } from "lucide-react";
import { Input } from "./ui/input";

export const Navbar = () => {
    const activeClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium transition-colors ${
            isActive
                ? "text-primary font-bold"      
                : "text-muted-foreground hover:text-primary" 
        }`;

    return (
        <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    <Logo />

                    <nav className="hidden md:flex items-center gap-6">
                        <NavLink to="/home" end className={activeClass}>
                            Home
                        </NavLink>

                        <NavLink to="/products" end className={activeClass}>
                            Products
                        </NavLink>

                        <NavLink to="/cart" className={activeClass}>
                            Cart
                        </NavLink>
                    </nav>

                    <div className="flex-1 max-w-md hidden lg:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                type="search"
                                placeholder="Search for clothing items..."
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to="/cart">
                            <Button variant="ghost" size="icon">
                                <ShoppingCart className="w-5 h-5" />
                            </Button>
                        </Link>

                        <Link to="/login">
                            <Button variant="ghost" size="sm">
                                <User className="w-4 h-4 mr-2" />
                                Login
                            </Button>
                        </Link>

                        <Link to="/signup">
                            <Button size="sm">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};