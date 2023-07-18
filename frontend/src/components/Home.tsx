import React, { useEffect, useState } from "react"
import Jobs from "./Jobs"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const [user, setUser] = useState(null);
    const [cookies, removeCookies] = useCookies<string>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyCookies = async () => {
            console.log("cookies", cookies);
            if (!cookies.token) {
                navigate("/login");
            }
        }
        verifyCookies();
    }, [cookies, navigate]);
    return (
        <div>
            <Jobs />
        </div>
    );
}