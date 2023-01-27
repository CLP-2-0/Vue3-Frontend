<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Grammar</th>
        <th scope="col">meaning</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>{{ chineseContent }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import LessonApis from "@/apis/LessonApis.js";

export default {
  props: ["lessonIdx"],
  data() {
    return {
      Grammar: [],
      content: "",
      chineseContent: "",
    };
  },
  methods: {
    // async getGrammar() {
    //   const res = await LessonApis.getLessonById(this.lessonIdx);
    //   const content = res.data.content;
    //   console.log(content);
    //   var regex = /([\u4e00-\u9fa5]+)([1-9])/g;

    //   var matches = content.match(regex);

    //   for (let i = 0; i < matches.length; i++) {
    //     let underlinedChar = matches[i].replace(/[1-9]/g, "");
    //     let superscript = matches[i].replace(/[\u4e00-\u9fa5]+/g, "");
    //     this.Grammar.push({ underlinedChar, superscript });
    //   }
    // },
    async testing() {
      let gralist = [];
      const res = await LessonApis.getLessonById(this.lessonIdx);
      this.content = res.data.content;
      let parser = new DOMParser();
      let doc = parser.parseFromString(this.content, "text/html");
      let underlined = doc.querySelectorAll("u");
      
      // for (let i = 0; i < underlined.length; i++) {
      //   let element = underlined[i];
      //   let underlinedChar = element.textContent;
      //   let superscript = element.nextElementSibling.
      //   gralist.push({ underlinedChar, superscript });
      // }
      console.log(doc);
    },
  },
  mounted() {
    this.testing();
  },
};
</script>
