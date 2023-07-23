export type UserType = {
    id: string;
    role: string;
    name: string;
    jobs: string[];
};

export type UsersContextType = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export type UsersProviderType = {
    children: React.ReactNode;
};

export type saveJobType = {
    _id?: string;
    name: string;
    company: string;
    category: string;
    user_id: string;
}

export type LocationType = {
    id: string;
    name: string;
    company: string;
    category: string;
}

export type JobsType = {
    _id: string;
    name: string;
    company: string;
    category: string;
    datePosted: Date;
}

export type JobData = {
    id: string;
    name: string;
    company: string;
    category: string;
    datePosted: Date;
    handleChangingJobs: (jobId: string) => void;
}