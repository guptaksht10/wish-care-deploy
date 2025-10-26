'use client' 
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Link from "next/link"
import {signIn} from "next-auth/react"
import {useState} from "react"
import {Loader} from "./ui/loader"
import { redirect } from "next/navigation"

export function SignupForm({
    className,
    ...props
} : React.ComponentProps<"div">) {
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const body = {
            name: formData.name + " " + formData.lastname,
            email: formData.email,
            password: formData.password,
            username: formData.username
        }
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (! res.ok) {
                alert(data.error || "Signup failed")
            } else {
                alert("Signup successful!")
                redirect("/")
            }
        } catch (error) {
            console.log(error)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setGoogleLoading(true)
        try {
            await signIn("google", {callbackUrl: "/"})
        } catch (error) {
            console.log(error)
        } finally {
            setGoogleLoading(false)
        }
    }

    return (<div className={
            cn("flex flex-col gap-6", className)
        }
        {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold text-purple-600">Create an account</h1>
            <p className="text-muted-foreground text-sm text-balance">
                Enter your details below to create an account
            </p>
        </div>

        <div className="grid gap-2">
            <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                    <Label htmlFor="name">First Name</Label>
                    <Input id="name" type="text" placeholder="John"
                        value={
                            formData.name
                        }
                        onChange={handleChange}/>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input id="lastname" type="text" placeholder="Doe"
                        value={
                            formData.lastname
                        }
                        onChange={handleChange}/>
                </div>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="@JohnDoe"
                    value={
                        formData.username
                    }
                    onChange={handleChange}/>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com"
                    value={
                        formData.email
                    }
                    onChange={handleChange}/>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password"
                    value={
                        formData.password
                    }
                    onChange={handleChange}/>
            </div>

            <Button type="button" className="w-full"
                disabled={loading}
                onClick={handleSubmit}> {
                loading ? "Creating..." : "Create Account"
            } </Button>

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or continue with
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
                                          0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422
                                          18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729
                                          1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305
                                          3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
                                          0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176
                                          0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405
                                          1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23
                                          3.285-1.23.645 1.653.24 2.873.12 3.176.765.84
                                          1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475
                                          5.92.42.36.81 1.096.81 2.22 0 1.606-.015
                                          2.896-.015 3.286 0 .315.21.69.825.57C20.565
                                          22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/>
                    </svg>
                    Login with GitHub
                </Button>
                <Button variant="outline" className="w-full"
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}> {
                    googleLoading ? (<>
                        <Loader text="Logging in with Google..."/>
                    </>) : (<>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147
                                                                                              1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72
                                                                                              8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747
                                                                                              1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12
                                                                                              12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16
                                                                                              2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"/>
                        </svg>
                        Login with Google
                    </>)
                } </Button>
            </div>
        </div>

        <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline underline-offset-4">
                Login
            </Link>
        </div>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our
            <a href="#">Terms of Service</a>
            {" "}
            and
            <a href="#">Privacy Policy</a>.
        </div>
    </div>)
}
