import axios from "axios";
// Create instance for Lesson API 
//******************************* */
const baseURI = import.meta.env.VITE_URI
const instance = axios.create({
  baseURL: baseURI,
  timeout: 1000,
});
//******************************* */

const getLessons = async () => {
     return await instance.get("/lessons")
      .then((res) => {
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
       return res.data;
     })
     .catch((error) => {
       console.error("Error calling getOneLesson", error.response.data);
       return null;
     });
 }

 const createLesson = async (lessonBody) => {

  return await instance
  .post("/lessons", 
    lessonBody,
  )

  .then((res) => {
    console.log("sent");
  })
  .catch(function (error) {
    console.log("error:", error);
  });
};

const updateLesson = async (lessonBody, lessonId) => {

  return await instance
  .put(`/lessons/${lessonId}`, 
    lessonBody,
  )

  .then((res) => {
    console.log("updated");
  })
  .catch(function (error) {
    console.log("error:", error);
  });
};

const deleteLesson = async (lessonId) => {

  return await instance
  .delete(`/lessons/${lessonId}`)

  .then((res) => {
    console.log("deleted");
  })
  .catch(function (error) {
    console.log("error:", error);
  });
};


  

  export default {
    getLessons,
    createLesson,
    getLessonbyId,
    updateLesson,
    deleteLesson
  }