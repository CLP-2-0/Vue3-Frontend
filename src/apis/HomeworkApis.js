import axios from "axios";
// Create instance for Lesson API 
//******************************* */
const baseURI = import.meta.env.VITE_URI
const instance = axios.create({
  baseURL: baseURI,
});
//******************************* */
const saveHomework = async (lessonId, homework, section) => {

    console.log(lessonId, homework, section)
    return await instance
    .post(`/homework/${section}/${lessonId}`, 
      homework,
    )

    .then((res) => {
      console.log("sent");
    })
    .catch(function (error) {
      console.log("error:", error);
    });
};

const getHomeworkBySection = async (lessonId, section) => {
    return await instance
    .get(`/homework/${section}/${lessonId}`)

  .then((res) => {
    return res.data;
  })
  .catch(function (error) {
    console.log("error:", error);
  });
}

export default {
    saveHomework,
    getHomeworkBySection
}