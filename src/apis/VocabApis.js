import axios from "axios";

<<<<<<< HEAD
const save = async () => {
  const instance = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 1000,
  });
  return await instance
    .get("/vocab/1")
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error.response.data);
    });
};

export default { save };
=======
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
>>>>>>> 9b100b1f60141775d2bad72a1bc880213d529d9d
