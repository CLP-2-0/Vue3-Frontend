import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
});

const saveVocabs = async (lessonId, vocabs) => {

    const instance = axios.create({
      baseURL: "http://localhost:8000",
      timeout: 3000,
    });
    console.log(vocabs)
    return await instance
    .post(`/vocabs/${lessonId}`, 
      vocabs,
    )

    .then((res) => {
      console.log("sent");
    })
    .catch(function (error) {
      console.log("error:", error);
    });
};

const getVocabsBylessonId = async (lessonId) => {
  return await instance
    .get(`/lessons/${lessonId}`)
    .then((res) => {
      // console.log("this from apis")
      // console.log(res.data)
      return res.data;
    })
    .catch((error) => {
      console.error("Error calling getOneLesson", error.response.data);
      return null;
    });
};

export default { saveVocabs, getVocabsBylessonId };
