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
            :pinyin="red.pinyin"
            @blur="addToRed()"
          ></textarea>
        </td>
        <td>
          <textarea
            name="grammar"
            id="type"
            cols="10"
            rows="1"
            @input="addToRed()"
          ></textarea>
        </td>
        <td>
          <textarea
            name="meaning"
            id="meaning"
            cols="40"
            rows="1"
            @input="addToRed()"
          ></textarea>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["red"],
  emits: ["red"],
  pinyinnew: pinyin,

  //   emits: ["update:type", 'update:pinyin'],
  name: "Mock",
  components: {},

  methods: {
    addToRed() {
      this.red.pinyin = pinyinnew;
      this.red.grammer = document.getElementsByName("grammar");
      this.red.meaning = document.getElementsByName("meaning");
      console.log(this.red);
      //   this.red.pinyin = document.getElementsByName("pinyin");
    },
  },
};
</script>
