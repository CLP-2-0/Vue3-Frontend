import axios from "axios";

const save = async () => {
    const instance = axios.create({
      baseURL: "http://localhost:8000",
      timeout: 1000,
    });
    return await instance
      .get("/vocab/1")
      .then((res) => {
        console.log(res.data)
        return res.data;
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }

  export default {save}