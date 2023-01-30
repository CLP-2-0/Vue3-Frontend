<template>
  <table class="table table-bordered">
    <tr v-for="(item, index) in gralist" :key="index">
      <td>{{ item.superscript }}</td>
      <td v-for="(char, idx) in intem.underlinedChar" :key="idx">
        {{ char }}
        <template v-if="idx < item.underlinedChar.length - 1"> ... </template>
      </td>
    </tr>
    <!-- <thead>
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
    </tbody> -->
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
      var regex = /([\u4e00-\u9fa5]+)([1-9])/g;

      let underlined = doc.body.querySelectorAll("u");

      for (let i = 0; i < underlined.length; i++) {
        let element = underlined[i];
        let underlinedChar = element.textContent;
        let next = element.nextElementSibling;
        if (next && next.tagName === "SUP") {
          let superscript = next.textContent;
          gralist.push({ underlinedChar, superscript });
        }
      }
      console.log(gralist);
      // for (let i = 0; i < underlined.length; i++) {
      //   let element = underlined[i];
      //   let underlinedChar = element.textContent;
      //   // console.log(underlinedChar);
      //   let superscript = element.nextElementSibling.textContent;
      //   gralist.push({ underlinedChar, superscript });
      // }
      // console.log(gralist[3]);
    },
  },
  mounted() {
    this.testing();
  },
};
</script>
