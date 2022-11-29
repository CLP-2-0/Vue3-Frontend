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
    };
  },
  methods: {
    async getLessonById() {
      const res = await LessonApis.getLessonbyId(this.lessonIdx);
      this.title = res.data.title;
      this.content = res.data.content;
      document.getElementById('title').innerHTML = this.title
      document.getElementById('content').innerHTML = this.content
      this.vocabs = res.data.vocabs
      
      let vocabs = document.getElementsByTagName("span");
      let j = 0;
      for (let i = 0; i < vocabs.length; i++) {
        if (vocabs[i].getAttribute("style") == "color: red;") {
          vocabs[i].setAttribute("id", `vocab${j}`);
          vocabs[i].setAttribute("type", "button");
          
            $(`#vocab${j}`).popover({
            container: "body",
            html: true,
            placement: 'bottom',
            // trigger: 'manual',
            content: function () {
              let id = $(this)[0].getAttribute('id')
              id = id.substring(5)
              return (
                '<div class="popover-message">' +  
                "Meaning: " + res.data.vocabs[id].meaning+ '<br/>' +
                "Pinyin: " + res.data.vocabs[id].pinyin + '<br/>' +
                "Type: " + res.data.vocabs[id].type +

                "</div>"
              );
            },
          })
          
          j++

          // $(`#vocab${i}`).click(function(e) {
          //       e.stopPropagation();
          //       $(this).popover('show');
          //   });
          // $('html').click(function() {
          //     $(`#vocab${i}`).popover('hide');
          // });

        
      }
      }
      
    }
  },
  created() {
    this.getLessonById()    
  },
};
</script>

<style>
.center-div {
  display: flex;
  justify-content: center;
}
</style>
