import { Heading } from "@/components/heading"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from 'zod'
import { SubHeading } from "@/components/SubHeading"
import { Button } from "@/components/ui/button"

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

export const Signup = () => {
    return <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
        <div className="bg-white min-w-48 rounded-md border ">
            <Heading lable="Sign-up" />
            <SubHeading lable="Enter your information to create an accont" />
            <div className="p-4">
                <Label className="py-3" htmlFor="email" >Email</Label>
                <Input type="email" placeholder="zisshh@gmail.com" />

                <Label className="py-3" htmlFor="email" >Passoword</Label>
                <Input type="email" placeholder="123random" />

                <Label className="py-3" htmlFor="email" >FirstName</Label>
                <Input type="email" placeholder="zishan" />

                <Label className="py-3" htmlFor="email" >LastName</Label>
                <Input type="email" placeholder="mira" />
            </div>
            <div className="pb-4">
                <Button className="cursor-pointer">
                    Sign up
                </Button>
            </div>
        </div>
    </div>
}