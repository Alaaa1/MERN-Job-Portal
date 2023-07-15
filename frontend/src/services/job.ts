import http from "../http-common";

class JobDataService {
    getAll() {
        return http.get('');
    }
    createJob(data: Object) {
        return http.post("", data);
    }
    editJob(data: object) {
        return http.put("", data)
    }
};

export default new JobDataService();