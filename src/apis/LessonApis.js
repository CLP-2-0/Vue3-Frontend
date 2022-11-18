import axios from "axios";

// Create instance for Lesson API 
//******************************* */
const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
});
//******************************* */

const getLessons = async () => {
     return await instance.get("/lessons")
      .then((res) => {
        // console.log("this from apis")
        // console.log(res.data)
        return res.data;
      })
      .catch((error) => {
        console.error("Error calling getLesson", error.response.data);
        return null;
      });
  }

  const getLessonbyId = async (lessonId) => {
    return await instance.get(`/lessons/${lessonId}`)
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

 const createLesson = async (lessonContent) => {
  
  return await post("http://localhost:8000/lessons/", {
    id: lessonContent.id,
    title: lessonContent.title,
    content: lessonContent.content
  })
  .then((res) => {
    console.log(res.data)
    return res.data;
  })
  .catch((error) => {
    console.error("Error calling getOneLesson", error.response.data);
    return null;
  });
}
  

  export default {
    getLessons,
    createLesson,
    getLessonbyId
  }