import { INewJob } from "../../jobsTypes";
export class JobEntity {
    readonly id: string;
    readonly name: string;
    readonly company: string;
    readonly category: string;
    readonly user_id: string;
    readonly datePosted: Date

    constructor(props: INewJob) {
        this.category = props.category;
        this.name = props.name;
        this.company = props.company;
        this.user_id = props.user_id;
    }

    public static create(props: INewJob) {
        return new JobEntity(props);
    }
}