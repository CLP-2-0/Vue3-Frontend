import axios from "axios";
// Create instance for Lesson API 
//******************************* */
const baseURI = import.meta.env.VITE_URI
const instance = axios.create({
  baseURL: baseURI,
});
//******************************* */
const createSection = async (sectionBody) => {

    return await instance
    .post("/sections", 
      sectionBody,
    )
  
    .then((res) => {
      console.log("sent");
    })
    .catch(function (error) {
      console.log("error:", error);
    });
};

const getSections = async() => {
    let username = "gamer_std1"
    return await instance.get(`/sections/${username}/all`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error calling getSection", error);
      return null;
    });
}

export default {
    createSection,
    getSections
}