
export interface IUser extends Document {
    username: string;
    hashedPassword: string;
    email: string;
    role: string;
    jobs?: string[];
}

export interface IToDomainProps {
    id: string;
    username: string;
    jobs: string[];
    hashedPassword: string;
    email: string;
    role: string;
}