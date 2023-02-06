<template>
  <div>
    <div class="container">
      <div class="center-div">
        <div id="title"></div>
      </div>
      <div id="content"></div>
    </div>
  </div>

  <!-- <div>
    <div v-html="processedContent()"></div>
  </div> -->
</template>

<script>
import LessonApis from "@/apis/LessonApis.js";

export default {
  name: "Book",
  components: {},
  props: ["lessonIdx"],
  data() {
    return {
      title: "",
      content: "",
      vocabs: [],
      meaning: [],
      processed: "",
    };
  },
  methods: {
    async getLessonById() {
      const res = await LessonApis.getLessonById(this.lessonIdx);
      this.title = res.data.title;
      this.content = res.data.content;

      document.getElementById("title").innerHTML = this.title;
      document.getElementById("content").innerHTML = this.content;
      this.vocabs = res.data.vocabs;

      console.log("this is Book and content here", this.title);
      let vocabs = document.getElementsByTagName("span");
      let j = 0;
      for (let i = 0; i < vocabs.length; i++) {
        if (vocabs[i].getAttribute("style") == "color: red;") {
          vocabs[i].setAttribute("id", `vocab${j}`);
          vocabs[i].setAttribute("type", "button");

          $(`#vocab${j}`).popover({
            container: "body",
            html: true,
            placement: "bottom",
            // trigger: 'manual',
            content: function () {
              let id = $(this)[0].getAttribute("id");
              id = id.substring(5);
              return (
                '<div class="popover-message">' +
                "Meaning: " +
                res.data.vocabs[id].meaning +
                "<br/>" +
                "Pinyin: " +
                res.data.vocabs[id].pinyin +
                "<br/>" +
                "Type: " +
                res.data.vocabs[id].type +
                "</div>"
              );
            },
          });

          j++;

          // $(`#vocab${i}`).click(function(e) {
          //       e.stopPropagation();
          //       $(this).popover('show');
          //   });
          // $('html').click(function() {
          //     $(`#vocab${i}`).popover('hide');
          // });
        }
      }
    },
    async processedContent() {
      const res1 = await LessonApis.getLessonById(this.lessonIdx);
      this.content = res1.data.content;
      this.meaning = await LessonApis.getLessonGrammarMeanings(this.lessonIdx);
      const regex = /<u>(.*?)<\/u>/g;
      this.processed = this.content;

      let match;
      while ((match = regex.exec(this.content)) !== null) {
        const underlined = match[0];
        const superscriptRegex = /<sup>(\d+)<\/sup>/;
        const superscriptMatch = superscriptRegex.exec(underlined);
        const index = parseInt(superscriptMatch[1], 10) - 1;

        const meaning = this.meaning[index];
        const replacement = `<span title="${meaning}" class="hoverable">${underlined}</span>`;
        this.processed = this.processed.replace(underlined, replacement);
      }
      console.log(processed);
      return this.processed;
    },
  },

  created() {
    this.getLessonById();
    this.processedContent();
  },
};
</script>

<style>
.center-div {
  display: flex;
  justify-content: center;
}
.hoverable {
  position: relative;
  display: inline-block;
}

.hoverable:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background-color: lightgray;
  border-radius: 5px;
  font-size: 12px;
}
</style>
