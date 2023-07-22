import http from "../http-common";

class DataService {
    getAll() {
        return http.get('');
    }
    find(query: string) {
        return http.get(`?name=${query}`);
    }
    authenticateUser(data: object) {
        return http.post("", data, { withCredentials: true });
    }
    createJob(data: Object) {
        return http.post("/newJob", data);
    }
    editJob(data: object) {
        return http.put("", data)
    }
    deleteJob(_id: string, user_id: string) {
        return http.delete("", { data: { _id, user_id } });
    }
    signupUser(data: object) {
        return http.post("signup", data, { withCredentials: true });
    }
    loginUser(data: object) {
        return http.post("login", data, { withCredentials: true });
    }
};

const JobDataService = new DataService();
export default JobDataService;