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
    .post(`homework/s/${section}/${lessonId}`, 
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

const saveAnswerToAQuestion = async (username, id, answer) => {
  console.log("answer", answer, "id", id, username)
  return await instance
  .post(`/graded-question/answer/${username}/${id}`, answer)

  .then((res) => {
    console.log("sent");
  })
  .catch(function (error) {
    console.log("error:", error);
  });
}

const getAnswersByQuestion = async (id) => {
  return await instance
  .get(`/graded-question/answers/${id}`)

.then((res) => {
  return res.data;
})
.catch(function (error) {
  console.log("error:", error);
});
}

const saveExamToSection = async(sectionId, lessonId, exam) => {
  return await instance
  .post(`/sections/exam/${sectionId}/${lessonId}`, exam)

  .then((res) => {
    console.log("sent");
  })
  .catch(function (error) {
    console.log("error:", error);
  });
}

const getExamBySection = async (sectionId, lessonId) => {
  return await instance
  .get(`/sections/exam/${sectionId}/${lessonId}`)

.then((res) => {
  return res.data;
})
.catch(function (error) {
  console.log("error:", error);
});
}

const saveExamSubmission = async (sectionId, lessonId, submission) => {
  return await instance
  .post(`/sections/submission/${sectionId}/${lessonId}`, submission)
  .then((res) => {
    console.log("sent");
  })
  .catch(function (error) {
    console.log("error:", error);
  });
}

const gradeExamSubmission = async (sectionId, lessonId, submission, idx) => {
  console.log(submission)
  return await instance
  .put(`/sections/submission/${sectionId}/${lessonId}/${idx}`, submission)
  .then((res) => {
    console.log("sent");
  })
  .catch(function (error) {
    console.log("error:", error);
  });
}

export default {
    saveHomework,
    getHomeworkBySection,
    saveAnswerToAQuestion,
    getAnswersByQuestion,
    saveExamToSection,
    getExamBySection,
    saveExamSubmission,
    gradeExamSubmission
}