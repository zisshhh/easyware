import { Atom, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SubHeading } from './SubHeading';


export const Appbar = () => {

    const navigate = useNavigate();
    let user = true;

    return <div className="flex justify-between items-center">
        <Link to="/">
            <div className='flex items-center gap-1'>
                <Atom/>
                <div className='font-bold'>easyware</div>
            </div>
        </Link>
        <div className='flex space-x-10'>
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="contact-us">Contact Us</Link>
        </div>
        <div>
            {!user ? <Button onClick={() => navigate("/signup")}>Login</Button>
                : (
                    <DropdownMenu>
                        <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>EW</AvatarFallback>
                            </Avatar></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Zishan Mira</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem className='text-red-400'>
                                <span>
                                    <LogOut />
                                </span>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        </div>

    </div>
}