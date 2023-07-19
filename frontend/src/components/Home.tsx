import { useContext } from "react"
import Jobs from "./Jobs"
import { UserContext } from "./UsersContext";


export default function Home() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            {user ? (<h1>Welcome {user}</h1>) : (<h1>Welcome guest!</h1>)}
            <Jobs />
        </div>
    );
}