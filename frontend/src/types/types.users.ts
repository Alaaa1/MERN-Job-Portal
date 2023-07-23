export type UserType = {
    id: string,
    role: string,
    name: string,
};

export type UsersContextType = {
    user: UserType
};

export type UsersProviderType = {
    children: React.ReactNode;
};