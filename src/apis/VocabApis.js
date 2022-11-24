import axios from "axios";

const saveVocabs = async (lessonId, vocabs) => {
    const instance = axios.create({
      baseURL: "http://localhost:8000",
      timeout: 1000,
    });
    console.log(vocabs)
    return await instance
    .post(`/vocabs/${lessonId}`, 
      vocabs,
    )
    .then((res) => {
      console.log("sent")
    })
    .catch(function (error) {
      console.log("error:", error);
    });

        
  }

  export default {saveVocabs}