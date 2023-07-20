import { useContext } from "react"
import Jobs from "./Jobs"
import { UserContext } from "./UsersContext";


export default function Home() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            {user ? (<div><h1>Welcome {user}</h1><Jobs /></div>) : (<h1>Welcome guest! Please Login</h1>)}
        </div>
    );
}