import { createContext, useState } from "react";

export const UserContext = createContext<any>(null);

export default function UserProvider(props: any) {
    const [user, setUser] = useState<any>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
    )
}