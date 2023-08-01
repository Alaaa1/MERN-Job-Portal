import JobsRepository from "../../db/repositories/JobsRepository";
import { IEditedJobInfo } from "../../jobsTypes";

export class EditJobUseCase {

    jobsRepository: JobsRepository;

    constructor(jobsRepository: JobsRepository) {
        this.jobsRepository = jobsRepository;
    }

    async execute(jobId: string, editedJobInfo: IEditedJobInfo, userId: string) {
        try {
            const job = await this.jobsRepository.getJobById(jobId);
            if (job.user_id.toString() == userId) {
                const updatedJob = await this.jobsRepository.updateJob(jobId, editedJobInfo);
                return updatedJob;
            }
            return false;
        } catch (e) {
            console.error(`editJob.usecase.ts: Unable to edit job ${e}`);
            return e;
        }
    }
}