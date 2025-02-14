import { SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import LoginWithFacebook from "./authorization/loginWithFacebook";
import Divider from "./authorization/divider";
import { Link, useNavigate } from "react-router";
import { IUser } from "./authorization/types";
import axios, { AxiosError, AxiosResponse } from "axios";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IUser>();
  const onSubmit: SubmitHandler<IUser> = (d) => {
    axios
      .post("http://localhost:3030/register", d, { withCredentials: true })
      .then((res: AxiosResponse) => {
        navigate("/");
        console.log(res);
      })
      .catch((err: AxiosError) => {
        alert(err.response?.data || "Unexpected error.");
        console.log(err);
      });
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-6 py-14 px-12">
        <div className="flex flex-col gap-4 items-center text-center">
          <h1 className="text-3xl font-bold text-black">Instagram.</h1>
          <h3 className="text-md font-semibold">
            Sign up to see photos and videos from your friends.
          </h3>
        </div>
        <LoginWithFacebook />
        <Divider text="OR" />
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <Input
              id="email"
              type="text"
              placeholder="Mobile number or Email"
              {...register("email")}
              required
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              {...register("password")}
            />
            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              required
              {...register("fullName")}
            />
            <Input
              id="username"
              type="text"
              placeholder="Username"
              required
              {...register("username")}
            />
            <div className="text-xs text-center flex flex-col gap-4 py-2">
              <p>
                People who use our service may have uploaded your contact
                information to Instagram. Learn More
              </p>
              <p>
                By signing up, you agree to our Terms , Privacy Policy and
                Cookies Policy .
              </p>
            </div>
            <Button type="submit" className="w-full font-semibold">
              Sign up
            </Button>
          </div>
        </form>
        <div className="text-center text-sm">
          Have an account?{" "}
          <Link to="/login" className="text-primary font-bold">
            Log In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
