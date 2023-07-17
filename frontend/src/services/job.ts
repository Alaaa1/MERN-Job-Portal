import http from "../http-common";

class JobDataService {
    getAll() {
        return http.get('');
    }
    find(query: string) {
        return http.get(`?name=${query}`);
    }
    createJob(data: Object) {
        return http.post("", data);
    }
    editJob(data: object) {
        return http.put("", data)
    }
    deleteJob(id: string) {
        return http.delete("", { data: { _id: id } });
    }
};

export default new JobDataService();