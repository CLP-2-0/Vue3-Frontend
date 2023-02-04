<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Grammar</th>
        <th scope="col">Meaning</th>
      </tr>
    </thead>
    <tr v-for="(group, index) in gralist" :key="index">
      <td>{{ group.superscript }}</td>
      <td>{{ group.underlinedChars.join("...") }}</td>
      <td><input type="text" v-model="meaning[index]" /></td>
    </tr>
  </table>
  <div class="btn-container">
    <button @click="saveMeanings" type="button" class="btn btn-outline-success">
      Save
    </button>
  </div>
</template>

<script>
import LessonApis from "@/apis/LessonApis.js";
import GrammarApis from "@/apis/GrammarApis.js";

export default {
  props: ["lessonIdx"],
  data() {
    return {
      gralist: [],
      content: "",
      meaning: [],
    };
  },
  methods: {
    async getGrammarMeanings() {
      console.log(this.meaning);
      const res = await LessonApis.getGrammarsBylessonId(this.lessonIdx);
      this.meanings = res.data;
    },
    async saveMeanings() {
      await LessonApis.saveLessonGrammarMeanings(
        this.lessonIdx,
        this.meaning
      ).then(async (res) => {
        this.getGrammarMeanings();
      });
    },
    async testing() {
      const resMean = await GrammarApis.getGrammarsBylessonId(this.lessonIdx);
      console.log(resMean);
      const res = await LessonApis.getLessonById(this.lessonIdx);
      this.content = res.data.content;
      let parser = new DOMParser();
      let doc = parser.parseFromString(this.content, "text/html");
      let underlined = doc.body.querySelectorAll("u");
      let superscriptMap = new Map();
      for (let i = 0; i < underlined.length; i++) {
        let element = underlined[i];
        let underlinedChar = element.textContent;
        let next = element.nextElementSibling;
        if (next && next.tagName === "SUP") {
          let superscript = next.textContent;
          if (superscriptMap.has(superscript)) {
            superscriptMap
              .get(superscript)
              .underlinedChars.push(underlinedChar);
            if (this.meaning.length == 0) {
              this.meaning.push("");
            }
          } else {
            superscriptMap.set(superscript, {
              superscript,
              underlinedChars: [underlinedChar],
            });
          }
        }
      }
      this.gralist = Array.from(superscriptMap.values());
    },
  },
  mounted() {
    this.testing();
  },
};
</script>
