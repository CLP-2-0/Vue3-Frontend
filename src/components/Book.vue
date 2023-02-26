<template>
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
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
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
      processed: "",
    };
  },
  methods: {
    async getLessonById() {
      this.getGrammarMeanings();
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
          vocabs[i].setAttribute("tabindex", 0);

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
      //add the hoverable class to the superscript elements
      let superscripts = document.getElementsByTagName("sup");
      for (let i = 0; i < superscripts.length; i++) {
        superscripts[i].classList.add("hoverable");
      }
      //bind the mouseenter event to the hoverable elements
      let hoverables = document.getElementsByClassName("hoverable");
      for (let i = 0; i < hoverables.length; i++) {
        hoverables[i].addEventListener("click", (event) => {
          //get the index of the superscript
          let index = parseInt(event.target.innerText) - 1;
          //get the meaning from the meaningG array
          let meaning = this.meaningG[index];
          //show the pop over
          $(event.target)
            .popover({
              container: "body",
              html: true,
              placement: "top",
              content: `<div class="popover-message">${meaning}</div>`,
            })
            .popover("show");
        });
      }
    },
    async getGrammarMeanings() {
      console.log(this.meaningG);
      const res = await LessonApis.getLessonGrammarMeanings(this.lessonIdx);
      this.meaningG = res.data;
    },
  },

  created() {
    this.getGrammarMeanings();
    this.getLessonById();
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
