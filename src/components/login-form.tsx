'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Loader } from "@/components/ui/loader"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isredirect, setIsredirect] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState({
    open: false,
    severity: "info" as "success" | "error" | "info" | "warning",
    message: "",
  })

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true)
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      console.error(error)
      setIsGoogleLoading(false)
      setAlert({ open: true, severity: "error", message: "Google login failed" })
    }
  }

  const handleSignup = () => {
    setIsredirect(true)
  }

  const handleLoginManual = async () => {
    try {
      setIsLoading(true)
      const res = await signIn("credentials", {
        redirect: false,
        identifier: email,
        password,
      })

      if (res?.error) {
        setAlert({ open: true, severity: "error", message: "Invalid credentials. Try again." })
      } else {
        setAlert({ open: true, severity: "success", message: "Login successful! Redirecting..." })
        setTimeout(() => (window.location.href = "/"), 1200)
      }
    } catch (error) {
      console.error(error)
      setAlert({ open: true, severity: "error", message: "Something went wrong. Try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleLoginManual()
  }

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-purple-600">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email or username below to login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-4">
            <Label htmlFor="email_username">Email or Username</Label>
            <Input
              id="email_username"
              type="text"
              placeholder="m@example.com or @your_username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader />}
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>

          {/* GitHub Login */}
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 
                 9.8 8.205 11.385.6.113.82-.258.82-.577
                 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
                 C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729
                 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305
                 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
                 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176
                 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405
                 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23
                 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84
                 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475
                 5.92.42.36.81 1.096.81 2.22 0 1.606-.015
                 2.896-.015 3.286 0 .315.21.69.825.57C20.565
                 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Login with GitHub
          </Button>

          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader text="Logging in with Google..." />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 
                    3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 
                    2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 
                    8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 
                    1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 
                    12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 
                    2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-sm flex items-center justify-center">
          <div>Don&apos;t have an account? &nbsp;</div>
          <Link href="/auth/signup" className="underline underline-offset-4" onClick={handleSignup}>
            {isredirect ? <div className="text-sm"><Loader text="Loading..." /></div> : "Sign up"}
          </Link>
        </div>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </div>
      </div>

      {/* ✅ MUI Snackbar Alert */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, open: false })}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  )
}
