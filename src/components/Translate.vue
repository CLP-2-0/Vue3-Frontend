<template>
  <div class="btn-container">
    <button
      type="button"
      class="btn btn-outline-success"
      @click="chineseToPinyin"
    >
      Save
    </button>
  </div>
</template>
<script>
// import { pinyin } from "@napi-rs/pinyin";
export default {
  props: [],
  text: "中心",
  data() {
    return;
  },
  methods: {
    // chineseToPinyin(text) {
    //   console.log(pinyin(text));
    // },
  },
};
</script>
