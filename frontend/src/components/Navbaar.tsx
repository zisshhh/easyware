import { Link } from "react-router-dom"
import { Logo } from "./Logo"
import { Button } from "./ui/button"
import { Search, ShoppingCart, User } from "lucide-react"
import { Input } from "./ui/input"

export const Navbar = () => {

    return (
        <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    <Logo />

                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/home" className="text-sm font-medium text-foreground hover:text-primary">
                            Home
                        </Link>
                        <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-primary">
                            Products
                        </Link>
                        <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary">
                            Admin
                        </Link>
                    </nav>

                    <div className="flex-1 max-w-md hidden lg:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                type="search"
                                placeholder="Search for clothing items..."
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <ShoppingCart className="w-5 h-5" />
                        </Button>
                        <Link to="/login">
                            <Button variant="ghost" size="sm">
                                <User className="w-4 h-4 mr-2" />
                                Login
                            </Button>
                        </Link>
                        <Link to="/">
                            <Button size="sm">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}