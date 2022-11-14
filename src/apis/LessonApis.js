import axios from "axios";

// Create instance for Lesson API 
//******************************* */
const instance = axios.create({
  baseURL: "http://localhost:8000/lessons",
  timeout: 1000,
});
//******************************* */

const getLessons = async () => {
     return await instance.get("")
      .then((res) => {
        // console.log("this from apis")
        // console.log(res.data)
        return res.data;
      })
      .catch((error) => {
        console.error("Error calling getOneLesson", error.response.data);
        return null;
      });
  }

  export default {
    getLessons
  }