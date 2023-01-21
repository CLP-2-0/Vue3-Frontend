<template>
  <div>
    <div class="container">
      <div class="center-div">
        <div id="title">
          <ruby style="font-size:20px">
        {{ chineseTitle }} <rp>(</rp><rt>{{ title }}</rt
        ><rp>)</rp>
      </ruby>
        </div>
      </div>
      <div id="content" style="line-height:300%">
        <ruby v-for="(ch, index) in characters" style="font-size:20px">
    {{ ch }} <rp>(</rp><rt style="">{{ pinyins[index] }}</rt
    ><rp>)</rp>
  </ruby>
      </div>
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
      chineseTitle: "",
      chineseContent: "",
      characters: [],
      pinyins: [],
    };
  },
  methods: {
    async chineseToPinyin() {
      const res = await LessonApis.getLessonById(this.lessonIdx);
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

<style>
.center-div {
  display: flex;
  justify-content: center;
}
</style>
