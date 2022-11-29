<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div>
      <p>{{ PinyinContent }}</p>
    </div>
    <div>
      <ruby>
        {{ this.contentChinese }} <rp v-for="vi in PinyinContent">{{ vi }}</rp>
      </ruby>
    </div>
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
      PinyinContent: "",
      letter: ``,
      contentChinese: "",
    };
  },
  methods: {
    async chineseToPinyin() {
      const res = await LessonApis.getLessonbyId(this.lessonIdx);
      this.title = await pinyin(res.data.title);
      this.contentChinese = res.data.content;
      this.contentchinese = this.contentChinese.replace(/(<([^>]+)>)/gi, "");
      this.PinyinContent = await pinyin(this.contentChinese);

      // var letter = ``;
    },
  },
  created() {
    this.chineseToPinyin();
  },
};
</script>
