import http from "../http-common";

class DataService {
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
    signupUser(data: object) {
        return http.post("signup", data, { withCredentials: true });
    }
};

const JobDataService = new DataService();
export default JobDataService;