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

const saveEQuestion = async (lessonId, question) => {

  console.log(question, lessonId)
  return await instance
  .post(`/questions/e/${lessonId}`, 
    question,
  )

  .then((res) => {
    console.log("sent");
  })
  .catch(function (error) {
    console.log("error:", error);
  });
};

const saveQuestionToSec = async (lessonId, question, sid) => {
  console.log(lessonId, sid)
  return await instance
  .post(`/questions/${lessonId}/${sid}`, 
    question,
  )
  .then((res) => {
    console.log("sent");
  })
  .catch(function (error) {
    console.log("error:", error);
  });
}

const getQuestionBankByLesson = async (lessonId, sid) => {
  return await instance
  .get(`/questions/${lessonId}/${sid}`)
  .then((res) => {
    return res.data;
  })
  .catch(function (error) {
    console.log("error:", error);
  });
}

const saveEQuestionToSec = async (lessonId, question, sid) => {
  return await instance
  .post(`/questions/e/${lessonId}/${sid}`, 
    question,
  )
  .then((res) => {
    console.log("sent");
  })
  .catch(function (error) {
    console.log("error:", error);
  });
}

const getEQuestionBankByLesson = async (lessonId, sid) => {
  return await instance
  .get(`/questions/e/${lessonId}/${sid}`)
  .then((res) => {
    return res.data;
  })
  .catch(function (error) {
    console.log("error:", error);
  });
}

export default {
    saveQuestion,
    saveEQuestion,
    saveQuestionToSec,
    saveEQuestionToSec,
    getQuestionBankByLesson,
    getEQuestionBankByLesson
}