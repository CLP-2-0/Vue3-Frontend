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

  <Mock :red="red" />
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import Mock from "./Mock.vue";

export default {
  name: "quil-editor",
  title: "Book Editor",
  components: {
    QuillEditor,

    Mock,
  },
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
            { color: [] },
            { background: [] },
          ],
        },
      },
      content: "",
      title: "",
      red: [],

      yellow: [],
      // pinyin: [],
      // type: [],
    };
  },
  methods: {
    save() {
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
              id: "",
              word: spanChild.innerHTML,
              pinyin: "",
              grammar: "",
              meaning: "",
            });
            console.log(this.red);
          } else if (
            spanChild.getAttribute("style") == "color: rgb(237, 125, 49);"
          ) {
            this.yellow.push(spanChild.innerHTML);
          }
        }
      }

      console.log(this.red);
      console.log(this.yellow);
    },
  },
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
