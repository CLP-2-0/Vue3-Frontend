<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
  <div>
    <p>{{ PinyinContent }}</p>
  </div>
</template>
<script>
// import { translate } from "@vitalets/google-translate-api";
// import { pinyin } from "@napi-rs/pinyin-darwin-arm64"

import * as pinyin from "chinese-to-pinyin";
import LessonApis from "@/apis/LessonApis";
export default {
  props: ["lessonIdx"],
  data() {
    return {
      title: "",
      PinyinContent: ""
    };
  },
  methods: {
    async chineseToPinyin() {
      const res = await LessonApis.getLessonbyId(this.lessonIdx);
      this.title = await pinyin(res.data.title);
      this.PinyinContent = await pinyin(res.data.content);
    }
  },
  created() {
    this.chineseToPinyin();
  }
};
</script>
