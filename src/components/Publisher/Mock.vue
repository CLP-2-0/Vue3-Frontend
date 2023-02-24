<template>
  <table class="table" id="vocabTable">
    <thead>
      <tr>
        <th scope="col">汉字</th>
        <th scope="col">汉语拼音</th>
        <th scope="col">词性</th>
        <th scope="col">英文意思</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(r, index) in red">
        <th scope="row">{{ r.word }}</th>
        <td>
          <textarea
            name="pinyin"
            type="text"
            cols="10"
            rows="1"
            :id="'pinyinId' + index"
            @blur="addToRed(index)"
            >{{ r.pinyin }}</textarea
          >
        </td>
        <td>
          <textarea
            name="type"
            cols="10"
            rows="1"
            :id="'typeId' + index"
            @blur="addToRed(index)"
            >{{ r.type }}</textarea
          >
        </td>
        <td>
          <textarea
            name="meaning"
            cols="40"
            rows="1"
            :id="'meaningId' + index"
            @input="addToRed(index)"
            >{{ r.meaning }}</textarea
          >
        </td>
      </tr>
    </tbody>
  </table>
  <div class="btn-container">
    <button
      type="button"
      class="btn btn-outline-success"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample"
      aria-expanded="false"
      aria-controls="collapseExample"
      @click="saveTable"
    >
      Save vocab
    </button>
  </div>
</template>

<script>
import axios from "axios";
import VocabApis from "@/apis/VocabApis";

export default {
  props: ["red", "lessonIdx", "title", "content"],

  name: "Mock",
  components: {},
  data() {
    return {
      vocabs: [],
    };
  },

  methods: {
    addToRed(index) {
      this.red[index].meaning = document.getElementById(
        "meaningId" + index
      ).value;

      this.red[index].pinyin = document.getElementById(
        "pinyinId" + index
      ).value;
      this.red[index].type = document.getElementById("typeId" + index).value;
    },
    async updateLesson() {
      await axios
        .put("http://localhost:8000/lessons/" + this.lessonIdx, {
          id: this.lessonIdx,
          title: this.title,
          content: this.content,
        })
        .then((res) => {
          console.log("new content", this.content);
        });
    },
    async saveTable() {
      console.log("mock", this.red);

      await this.updateLesson()
        .then(async () => {
          const res = await VocabApis.saveVocabs(this.lessonIdx, this.red);
        })
        .then(() => {
          this.$router.go(this.$router.currentRoute);
        });
    },
  },
  mounted() {},
};
</script>
