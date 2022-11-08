<template>
    <div>
        <quill-editor v-model:content="content" contentType="html"
                   ref="quillEditor"
                   :options="editorOption" />
        
        <div class="content ql-editor" v-html="content"></div>
        <!-- for binding content from quill-editor need v-model:content='' and contentType='html' -->
    </div>
 
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
    name:'quil-editor',
    title:'Book Editor',
    components: {
    QuillEditor
    },
    data() {
    return {
      editorOption: {
        theme: "snow",
        placeholder: "",
        modules: {
          toolbar: ["bold", "italic", "underline", "link", "clean"]
        }
      },
      content:'',
    };
  }
}
</script>

<style>

</style>