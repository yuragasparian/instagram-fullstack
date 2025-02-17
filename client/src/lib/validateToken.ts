import { useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { useStore } from "@/store/store";

const ValdateToken = () => {
  const { setUsername } = useStore();
    const navigate = useNavigate()
    useEffect(() => {
      axios
      .get("http://localhost:3030/protected", {withCredentials:true})
      .then((res:AxiosResponse)=>{
        console.log(res.data);
        setUsername(res.data.username)
      })
      .catch((err:AxiosError)=>{
        alert(err.response?.data || "Unexpected error")
        navigate("/login")
      })
    }, []);
}

export default ValdateToken;

