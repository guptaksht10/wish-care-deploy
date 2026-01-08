import {GalleryVerticalEnd} from "lucide-react"
import Image from "next/image"

import {LoginForm} from "@/components/login-form"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="text-primary-foreground flex items-center justify-center rounded-md">
                            <Image src="/logofull_wishcare.png" alt="Image"
                                width={35}
                                height={30}/>
                        </div>
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-xl ">WishCare</span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-lg">
                        <LoginForm/>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 opacity-100 relative hidden lg:flex items-center justify-center brightness-75 rounded-l-2xl">
                <div className="relative w-full h-[576px] overflow-hidden">
                    {/* Image with object-cover */}
                    <Image src="/images/login-image.png" alt="Signup" fill className="object-cover object-center brightness-90 dark:brightness-50 dark:grayscale z-10" priority/> {/* Gradient overlay */} </div>
            </div>
        </div>
    )
}
