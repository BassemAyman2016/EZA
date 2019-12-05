import axios from "axios";

export default () => {
    return axios.create({
        baseURL: "https://ezaplus.herokuapp.com/api",
        headers: {
            Authorization: sessionStorage.getItem("token")
        }
    });
};