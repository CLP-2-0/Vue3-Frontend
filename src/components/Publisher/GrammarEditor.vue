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
      <td>{{ group.num }}</td>
      <td>{{ group.structure}}</td>
      <td ><input type="text" v-model="group.meaning" :disabled="!editable"/></td>
    </tr>
  </table>
  <div v-if="editable" class="btn-container">
    <button @click="saveMeanings" type="button" class="btn btn-outline-success" 
    data-bs-toggle="collapse"
      data-bs-target="#collapseTwo"
      aria-expanded="false"
      aria-controls="collapseTwo">
      Done
    </button>
  </div>
</template>

<script>
import LessonApis from "@/apis/LessonApis.js";
// import GrammarApis from "@/apis/GrammarApis.js";

export default {
  props: ["lessonIdx", "content", "editable", "update"],
  data() {
    return {
      gralist: [],
      meaning: [],
    };
  },
  methods: {
    async getGrammarMeanings() {
      // console.log(this.meaning);
      const res = await LessonApis.getLessonGrammarMeanings(this.lessonIdx);
      this.gralist = res.data
      if(this.update >= 1) {
        let grammars = this.testing()
        console.log(grammars.length)
        if(grammars.length != this.gralist.length) {
          this.gralist = grammars
        }
      }
      // if(grammars.length != res.data.length){
      //   this.gralist = grammars
      // } else {
      //   this.gralist = res.data
      // }
      // if(res.data.length == 0 ) {
      //   this.testing()
      // } else {
      // this.gralist = res.data;

      // }
    },
    async saveMeanings() {
      console.log(this.gralist)
      await LessonApis.saveLessonGrammarMeanings(
        this.lessonIdx,
        this.gralist
      ).then(async (res) => {
        this.getGrammarMeanings();
      });
    },
    testing() {
      // const res = await LessonApis.getLessonById(this.lessonIdx);
      // this.content = res.data.content;
      let parser = new DOMParser();
      let doc = parser.parseFromString(this.content, "text/html");
      let underlined = doc.body.querySelectorAll("u");
      let superscriptMap = new Map();
      for (let i = 0; i < underlined.length; i++) {
        let element = underlined[i];
        let underlinedChar = element.textContent;
        let next = element.nextElementSibling;
        if (next && next.tagName === "SUP") {
          let num = next.textContent;
          if (superscriptMap.has(num)) {
            let structure = superscriptMap.get(num) +"..."+underlinedChar
            superscriptMap.set(num, structure)
          } else {
            let structure = underlinedChar
            superscriptMap.set(num, structure)
          }
        }
      }
      let list = Array.from(superscriptMap, ([num, structure]) => ({ num, structure, meaning: "" }));
      // this.gralist = Array.from(superscriptMap, ([num, structure]) => ({ num, structure, meaning: "" }));
      console.log(list)
      return list
    },
  },
  mounted() {
    this.getGrammarMeanings();
    // this.testing();
    console.log("update ", this.update)
  },
};
</script>
