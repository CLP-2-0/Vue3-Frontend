import axios from "axios";
// Create instance for Lesson API 
//******************************* */
const baseURI = import.meta.env.VITE_URI
const instance = axios.create({
  baseURL: baseURI,
});
//******************************* */
const saveQuestion = async (lessonId, question) => {

    console.log(question, lessonId)
    return await instance
    .post(`/questions/${lessonId}`, 
      question,
    )

    .then((res) => {
      console.log("sent");
    })
    .catch(function (error) {
      console.log("error:", error);
    });
};

export default {
    saveQuestion
}