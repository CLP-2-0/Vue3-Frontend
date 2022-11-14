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
            id="pinyinId"
            @blur="addToRed(index)"
          ></textarea>
        </td>
        <td>
          <textarea
            name="grammar"
            cols="10"
            rows="1"
            id="grammarId"
            @blur="addToRed(index)"
          ></textarea>
        </td>
        <td>
          <textarea
            name="meaning"
            cols="40"
            rows="1"
            id="meaningId"
            v-model="red.meaning"
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
export default {
  props: ["red"],

  name: "Mock",
  components: {},

  methods: {
    addToRed(index) {
      this.red[index].pinyin = document.getElementById("pinyinId").value;
      this.red[index].grammar = document.getElementById("grammarId").value;
      this.red[index].meaning = document.getElementById("meaningId").value;
      console.log(this.red);
      console.log(document.getElementById("pinyinId").value);
      //
      //   this.red.pinyin = document.getElementsByName("pinyin");
    },
    saveTable() {
      var vocabList = JSON.stringify(red);
    },
  },
};
</script>
