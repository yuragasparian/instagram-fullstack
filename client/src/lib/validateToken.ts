import { useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router";

const ValdateToken = () => {
    const navigate = useNavigate()
    useEffect(() => {
      axios
      .get("http://localhost:3030/protected", {withCredentials:true})
      .then((res:AxiosResponse)=>{
        console.log(res.data);
      })
      .catch((err:AxiosError)=>{
        alert(err.response?.data || "Unexpected error")
        navigate("/login")
      })
    }, []);
}

export default ValdateToken;

