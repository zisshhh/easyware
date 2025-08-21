import { Heading } from "@/components/Heading"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from 'zod'
import { SubHeading } from "@/components/SubHeading"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const signupSchema = z.object({
    username: z.string().email("Invalid email"),
    password: z
        .string()
        .min(5, {
            message: "It must be at least 5 characters."
        })
        .max(10),
    firstName: z.string(),
    lastName: z.string()
})

export const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
        <div className="bg-white min-w-48 rounded-md border ">
            <Heading lable="Sign-in" />
            <SubHeading lable="Enter your information to create an accont" />
            <div className="p-4">
                <Label className="py-3" htmlFor="email" >Email</Label>
                <Input
                    type="email"
                    placeholder="zisshh@gmail.com"
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />

                <Label className="py-3" htmlFor="email" >Passoword</Label>
                <Input type="email" placeholder="123random"
                    onChange={(e) => setPassword(e.target.value)}
                />

            </div>
            <div className="pb-4">
                <Button className="cursor-pointer"
                    onClick={async () => {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        })
                        console.log(res.data)
                        navigate("/")

                    }}
                >
                    Sign in
                </Button>
            </div>
        </div>
    </div>
}