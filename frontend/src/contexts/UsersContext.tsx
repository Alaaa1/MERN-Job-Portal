import { createContext, useState } from "react";
import { UserType, UsersContextType, UsersProviderType } from "../types/types.users";

export const UserContext = createContext<any>(null);

export default function UserProvider(props: UsersProviderType) {
    const [user, setUser] = useState<UserType | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
    )
}