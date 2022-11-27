<template>
  <button
    type="button"
    class="btn btn-outline-success"
    @click="chineseToPinyin"
  >
    translate
  </button>
</template>
<script>
// import { translate } from "@vitalets/google-translate-api";
// import { pinyin } from "@napi-rs/pinyin-darwin-arm64";
export default {
  props: [],
  data() {
    return;
  },
  methods: {
    async chineseToPinyin() {
      // const { text } = await translate("Привет, мир! Как дела?", { to: "en" });
      // console.log(text);
      // console.log(pinyin("中心"));
    },
  },
};
</script>
