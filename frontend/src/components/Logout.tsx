import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../contexts/UsersContext";

export default function Logout() {
    const [cookies, setCookie, removeCookie] = useCookies<string>([]);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function delay() {
        await new Promise((resolve) => setTimeout(() => resolve(''), 500))
    }
    useEffect(() => {
        removeCookie("token");
        delay().then(() => { setUser(null); navigate("/login") });
    }, []);

    return (
        <p>Logging out...</p>
    )
}