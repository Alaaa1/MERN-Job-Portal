
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

export interface INewUserFormInfo {
    username: string;
    email: string;
    password: string;
    role: string;//todo: specify "creator" or "seeker"
}