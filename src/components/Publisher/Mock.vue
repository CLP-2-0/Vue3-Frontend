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
          ></textarea>
        </td>
        <td>
          <textarea
            name="grammar"
            cols="10"
            rows="1"
            :id="'typeId' + index"
            @blur="addToRed(index)"
          ></textarea>
        </td>
        <td>
          <textarea
            name="meaning"
            cols="40"
            rows="1"
            :id="'meaningId' + index"
            @input="addToRed(index)"
          ></textarea>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="btn-container">
    <button type="button" class="btn btn-outline-success" @click="saveTable">
      Save vocab
    </button>
  </div>
</template>

<script>
import axios from "axios";

// import axios from "axios";
export default {
  props: ["red"],

  name: "Mock",
  components: {},

  methods: {
    addToRed(index) {
      this.red[index].meaning = document.getElementById(
        "meaningId" + index
      ).value;

      this.red[index].pinyin = document.getElementById(
        "pinyinId" + index
      ).value;
      this.red[index].grammar = document.getElementById("typeId" + index).value;

      // console.log(this.red);
      // console.log(document.getElementById("pinyinId").value);
      //
      //   this.red.pinyin = document.getElementsByName("pinyin");
    },
    // lessonId = window.location.pathname.split("/").pop()
    async saveTable() {
      console.log(JSON.stringify(this.red));
      await axios
        .post("http://localhost:8000/vocabs/save-vocab/1", {
          vocabs: this.red,
        })
        .then((res) => {
          this.arraylist = res.data;
        })
        .catch(function (error) {
          console.log("error:", error);
        });
    },
  },
};
</script>
