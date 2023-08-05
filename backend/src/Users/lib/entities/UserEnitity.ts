export class UserEntity {
    readonly id: string;
    readonly name: string;
    readonly jobs: string[];
    readonly hashedPassowrd: string;
    readonly email: string;
    readonly role: string;

    constructor(id: string, name: string, jobs: string[], hashedPassowrd: string, email: string, role: string) {
        this.id = id ?? '';
        this.name = name;
        this.email = email;
        this.hashedPassowrd = hashedPassowrd;
        this.jobs = jobs ?? [];
        this.role = role;
    }

    addJob(jobId: string) {
        this.jobs.push(jobId);
    }

    removeJob(jobId: string) {
        const index = this.jobs.indexOf(jobId);
        this.jobs.splice(index, 1);
    }
}