<template>
  <div class="container">
    <div class="form-group row">
      <label for="title" class="col-sm-1 col-form-label">Title:</label>
      <div class="col-sm-11">
        <input
          type="text"
          class="form-control"
          id="titleInput"
          placeholder="Enter title here..."
        />
      </div>
    </div>
    <div class="content-block">
      <label class="col-sm-1 col-form-label">Content:</label>
      <quill-editor
        v-model:content="content"
        contentType="html"
        ref="quillEditor"
        :options="editorOption"
      />
      <div class="btn-container">
        <button type="button" class="btn btn-outline-success" @click="save">
          Save
        </button>
      </div>
      <!-- for binding content from quill-editor need v-model:content='' and contentType='html' -->
    </div>

    <div class="preview">
      <div class="title-container"><div id="title"></div></div>
      <div id="content" class="content ql-editor"></div>
    </div>
  </div>

  <Mock :red="red" :lessonIdx="lessonIdx" :title="title" :content="content" />
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import Mock from "./Mock.vue";
import LessonApis from "@/apis/LessonApis";

export default {
  name: "quil-editor",
  title: "Book Editor",
  components: {
    QuillEditor,

    Mock
  },
  props: ["lessonIdx"],
  data() {
    return {
      editorOption: {
        theme: "snow",
        placeholder: "",
        modules: {
          toolbar: [
            "bold",
            "italic",
            "underline",
            "link",
            "clean",
            { color: ["red", "rgb(237, 125, 49)"] },
            { background: [] }
          ]
        }
      },
      content: "",
      title: "",
      red: [],

      yellow: [],
      modelName: ""
    };
  },
  methods: {
    async getLesson() {
      const res = await LessonApis.getLessonbyId(this.lessonIdx);
      this.title = res.data.title;
      this.content = res.data.content;
      this.red = res.data.vocabs;
      document.getElementById("titleInput").value = this.title;
      document.getElementById("content").innerHTML = this.content;
      document.getElementById("title").innerHTML = this.title;
      // this.content = "<p>\t<span style=\"color: red;\">无论是否</span><span style=\"color: black;\">学习</span><span style=\"color: red;\">过</span><span style=\"color: black;\">中文，大家</span><span style=\"color: red;\">对</span><span style=\"color: black;\">“你好”这</span><span style=\"color: red;\">句</span><span style=\"color: black;\">问候语</span><span style=\"color: red;\">都</span><span style=\"color: black;\">很</span><span style=\"color: red;\">熟悉</span><span style=\"color: black;\">。“你好”</span><span style=\"color: red;\">类似于</span><span style=\"color: black;\">英文中的“hello”，但是</span><span style=\"color: red;\">没有</span><span style=\"color: black;\">“hello”在英文中</span><span style=\"color: red;\">那么</span><span style=\"color: black;\">常见。</span></p>"
    },
    save() {
      this.red.length = 0;
      this.title = document.getElementById("titleInput").value;
      document.getElementById("title").innerHTML = this.title;

      let contentElement = document.getElementById("content");
      contentElement.innerHTML = this.content;
      let children = contentElement.children;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];

        let spanChildren = child.children;
        for (let j = 0; j < spanChildren.length; j++) {
          let spanChild = spanChildren[j];

          if (spanChild.getAttribute("style") == "color: red;") {
            // this.red.word = spanChild.innerHTML;
            this.red.push({
              word: spanChild.innerHTML,
              meaning: "",
              pinyin: "",
              type: ""
            });
          } else if (
            spanChild.getAttribute("style") == "color: rgb(237, 125, 49);"
          ) {
            this.yellow.push(spanChild.innerHTML);
          }
        }
      }
    }
  },
  mounted() {
    this.getLesson();
  }
};
</script>

<style>
.container > div {
  margin-top: 10px;
}

.btn-container {
  display: flex;
  justify-content: end;
}

.btn {
  margin-top: 10px;
}

.title-container {
  display: flex;
  justify-content: center;
}
</style>
