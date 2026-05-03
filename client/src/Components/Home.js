import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies();
    useEffect(()=>{
        const verifyCookie = async () => {
            if (!cookies.token) {
              navigate("/verify/login");
            }
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/`,{
                method:"GET",
                credentials:'include'
            })
            await response.json();
            if(response.status===401){
                navigate("/verify/login")
            }
            else{
                navigate("/Profile");
            }
            return;
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
}

export default Home
