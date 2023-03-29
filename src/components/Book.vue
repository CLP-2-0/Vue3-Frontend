<template>
  <button type="button" class="btn btn-outline-danger" tabindex="0"
  data-bs-toggle="popover" 
  id="how-to-use">?</button>
  <div>
    <div class="container">
      <div class="center-div">
        <div id="title"></div>
      </div>
      <div id="content"></div>
    </div>
  </div>
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
      meaningG: [],
      gralist: [],
      grammars: []
    };
  },
  methods: {
    async getLessonById() {
      // this.getGrammarMeanings();
      const res = await LessonApis.getLessonById(this.lessonIdx);
      this.title = res.data.title;
      this.content = res.data.content;

      document.getElementById("title").innerHTML = this.title;
      document.getElementById("content").innerHTML = this.content;
      this.vocabs = res.data.vocabs;

      console.log("this is Book and content here", this.title);
      $(`#how-to-use`).popover({
            container: "body",
            html: true,
            placement: "right",
            trigger: 'focus',
            content: function () {
              return (
                "Click on the red words to see vocabulary detail. Click on number to see grammar detail."
              );
            },
          });

      let content = document.getElementById("content")
      var allElements = content.getElementsByTagName("*");


// Iterate over all elements in content and filter those with the "color: red;" style
      var redElements = [];
      for (var i = 0; i < allElements.length; i++) {
        var element = allElements[i];
        var style = element.getAttribute("style");
        if (style && style.includes("color: red;")) {
          redElements.push(element);

        }
      }

// The redElements array is vocabs array

      let vocabs = redElements
      let j = 0;
      for (let i = 0; i < vocabs.length; i++) {
        // if (vocabs[i].getAttribute("style")==("color: red;")) {
          vocabs[i].setAttribute("id", `vocab${j}`);
          vocabs[i].setAttribute("type", "button");
          vocabs[i].setAttribute("tabindex", 0);

          $(`#vocab${j}`).popover({
            container: "body",
            html: true,
            placement: "bottom",
            trigger: 'focus',
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

      }
      const response = await LessonApis.getLessonGrammarMeanings(this.lessonIdx);

      this.meaningG = response.data;
      console.log(response.data)
      //add the hoverable class to the superscript elements
      let superscripts = content.getElementsByTagName("sup");
      for (let i = 0; i < superscripts.length; i++) {
        // superscripts[i].classList.add("hoverable");
        superscripts[i].setAttribute("type", "button");
        superscripts[i].setAttribute("tabindex", 0);
        superscripts[i].setAttribute("id", `sup${i}`);
          $(`#sup${i}`).popover({
            container: "body",
            html: true,
            placement: "bottom",
            trigger: 'focus',
            content: function () {
              let num = parseInt(superscripts[i].innerHTML.replace("<u>", "").replace("<u/>", ""));
              let meaning = response.data[num-1].meaning
              let structure = response.data[num-1].structure
              return (
                '<div class="popover-message">' +
                  "Structure: " +
                structure +
                "<br/>" +
                "Meaning: " +
                meaning +
                "</div>"
              );
            },
          });
      }
    },
    async getGrammars() {
      // let parser = new DOMParser();
      // let doc = parser.parseFromString(this.content, "text/html");
      // let underlined = doc.body.querySelectorAll("u");
      // let superscriptMap = new Map();
      // for (let i = 0; i < underlined.length; i++) {
      //   let element = underlined[i];
      //   let underlinedChar = element.textContent;
      //   let next = element.nextElementSibling;
      //   if (next && next.tagName === "SUP") {
      //     let superscript = next.textContent;
      //     if (superscriptMap.has(superscript)) {
      //       superscriptMap
      //         .get(superscript)
      //         .underlinedChars.push(underlinedChar);
      //       if (this.meaning.length == 0) {
      //         this.meaning.push("");
      //       }
      //     } else {
      //       superscriptMap.set(superscript, {
      //         superscript,
      //         underlinedChars: [underlinedChar],
      //       });
      //     }
      //   }
      // }
      // this.grammars = Array.from(superscriptMap.values());
    },
  },

  created() {
    this.getGrammars();
    this.getLessonById();
  },
};
</script>

<style>
.center-div {
  display: flex;
  justify-content: center;
}
</style>
