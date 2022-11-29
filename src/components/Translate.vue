<template>
  <div>
    {{ title }}
  </div>
  <div>
    {{ content }}
  </div>
</template>
<script>
// import { translate } from "@vitalets/google-translate-api";
// import { pinyin } from "@napi-rs/pinyin-darwin-arm64"

import * as pinyin from "chinese-to-pinyin";

export default {
  props: ["lessonIdx"],
  data() {
    return {
      title: "",
      PinyinContent: "",
    };
  },
  methods: {
    async chineseToPinyin() {
      const res = await getLessonbyId(lessonIdx);
      this.title = await pinyin(res.data.title);
      this.PinyinContent = await pinyin(res.data.content);
    },
  },
};
</script>
