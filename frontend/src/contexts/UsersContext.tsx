import { createContext, useState } from "react";
import { UsersProviderType } from "../types/types.users";

export const UserContext = createContext<any>(null);

export default function UserProvider(props: UsersProviderType) {
    const [user, setUser] = useState<any>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
    )
}