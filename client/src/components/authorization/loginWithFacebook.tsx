import { Facebook } from "lucide-react";
import { Button } from "../ui/button";

const LoginWithFacebook = () => {
  return (
    <Button variant="outline" type="button" className="w-full">
    <Facebook stroke="0" className="fill-primary" />
    <span className="font-bold text-primary">
      Log in with Facebook
    </span>
  </Button>
  )
}

export default LoginWithFacebook