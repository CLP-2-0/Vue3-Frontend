<template>
  <div>
    <div class="container">
      <div class="center-div">
        <div>{{ title }}</div>
      </div>
      <div id="content"></div>
    </div>
  </div>
</template>

<script>
import LessonApis from "@/apis/LessonApis";

export default {
  name: "Book",
  components: {},
  props: ["lessonIdx"],
  data() {
    return {
      title: "",
      content: "",
      vocabs: [],
      meaning: "Hello"
    };
  },
  methods: {
    async getLessonById() {
      const res = await LessonApis.getLessonbyId(this.lessonIdx);
      this.title = res.data.title;
      this.content = res.data.content;
      document.getElementById("content").innerHTML = this.content;
      this.vocabs = res.data.vocabs;
      let vocabs = document.getElementsByTagName("span");
      for (let i = 0; i < vocabs.length; i++) {
        if (vocabs[i].getAttribute("style") == "color: red;") {
          vocabs[i].setAttribute("id", `vocab${i}`);
          vocabs[i].setAttribute("type", "button");

          $(`#vocab${i}`).popover({
            container: "body",
            html: true,
            placement: 'bottom',
            trigger: 'manual',
            content: function () {
              return (
                '<div class="popover-message">' +
                "Meaning: " + this.meaning + '<br/>' +
                "Pinyin: " + this.pinyin + '<br/>' +
                "Type: " + this.type +

                "</div>"
              );
            },
          }).click(function(e) {
                e.stopPropagation();
                $(this).popover('show');
            });
          $('html').click(function() {
              $(`#vocab${i}`).popover('hide');
          });

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
