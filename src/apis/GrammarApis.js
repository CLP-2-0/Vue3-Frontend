import axios from "axios";

// Create instance for Grammar API
//******************************* */
const baseURI = import.meta.env.VITE_URI;
const instance = axios.create({
  baseURL: baseURI,
});
//******************************* */

const saveGrammars = async (lessonId, grammars) => {
  console.log(grammars);
  return await instance
    .post(`/grammars/${lessonId}`, grammars)

    .then((res) => {
      console.log("sent");
    })
    .catch(function (error) {
      console.log("error:", error);
    });
};

const getGrammarsBylessonId = async (lessonId) => {
  return await instance
    .get(`/lessons/${lessonId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error calling getoneLesson", error.response.data);
      return null;
    });
};

export default { saveGrammars, getGrammarsBylessonId };
