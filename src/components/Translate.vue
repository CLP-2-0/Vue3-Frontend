<template>
  <div>
    <h1>{{ title }}</h1>
  </div>

  <div>
    <!-- <p>{{ PinyinContent }}</p> -->
  </div>

  <ruby v-for="(ch, index) in characters" style="font-size: 2rem">
    {{ ch }} <rp>(</rp><rt>{{ pinyins[index] }}</rt
    ><rp>)</rp>
  </ruby>
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
      chineseTitle: "",
      chineseContent: "",
      characters: [],
      pinyins: [],
    };
  },
  methods: {
    async chineseToPinyin() {
      const res = await LessonApis.getLessonbyId(this.lessonIdx);
      this.title = await pinyin(res.data.title);
      this.PinyinContent = await pinyin(res.data.content);
      this.chineseTitle = res.data.title;
      this.chineseContent = res.data.content;
      this.chineseContent = this.chineseContent.replace(/(<([^>]+)>)/gi, "");

      this.characters = this.chineseContent.split("");

      for (let ch of this.characters) {
        this.pinyins.push(pinyin(ch));
      }
      console.log(this.pinyins);
    },
  },
  created() {
    this.chineseToPinyin();
  },
};
</script>
