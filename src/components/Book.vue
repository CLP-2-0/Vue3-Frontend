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

export default {
  name: "Book",
  components: {},
  props: ["lessonIdx"],
  data() {
    return {
      title: "",
      content: "",
      vocabs: [],
    };
  },
  methods: {
    async getLessonById() {
      const res = await LessonApis.getLessonbyId(this.lessonIdx);
      this.title = res.data.title;
      this.content = res.data.content;
      document.getElementById("title").innerHTML = this.title;
      document.getElementById("content").innerHTML = this.content;
      this.vocabs = res.data.vocabs;
      let vocabs = document.getElementsByTagName("span");
      for (let i = 0; i < vocabs.length; i++) {
        if (vocabs[i].getAttribute("style") == "color: red;") {
          vocabs[i].setAttribute("id", `vocab${i}`);
          vocabs[i].setAttribute("type", "button");
          console.log(this.vocabs[i]);

          $(`#vocab${i}`).popover({
            container: "body",
            html: true,
            placement: "bottom",
            // trigger: 'manual',
            content: function () {
              return (
                '<div class="popover-message">' +
                "Meaning: " +
                res.data.vocabs[i].meaning +
                "<br/>" +
                "Pinyin: " +
                res.data.vocabs[i].pinyin +
                "<br/>" +
                "Type: " +
                res.data.vocabs[i].type +
                "</div>"
              );
            },
          });
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
  },
  mounted() {
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
