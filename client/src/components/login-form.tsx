import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginWithFacebook from "./authorization/loginWithFacebook";
import { SubmitHandler, useForm } from "react-hook-form";
import {  Link, useNavigate } from "react-router";
import Divider from "./authorization/divider";
import { IUser } from "./authorization/types";
import  axios, { AxiosError, AxiosResponse }  from "axios";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { register, handleSubmit } = useForm<IUser>();
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<IUser> = (d) => {
    axios
      .post("http://localhost:3030/login", d, {withCredentials: true})
      .then((response:AxiosResponse) => {
        navigate("/")    
        console.log("Success:", response);
      })
      .catch((error:AxiosError) => {
        alert(error.response?.data)
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src="/login.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold text-black">Instagram.</h1>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Phone number, username or email"
                  {...register("username")}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  {...register("password")}
                />
              </div>
             
              <Button type="submit" className="w-full font-semibold">
                Log in
              </Button>
              <Divider text="OR" />
              <LoginWithFacebook />
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-primary font-bold">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
