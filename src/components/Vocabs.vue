<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">汉字</th>
        <th scope="col">汉语拼音</th>
        <th scope="col">词性</th>
        <th scope="col">英文意思</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(v, index) in Vocabs">
        <th scope="row">{{ v.word }}</th>
        <td>
          {{ v.pinyin }}
        </td>
        <td>
          {{ v.type }}
        </td>
        <td>
          {{ v.meaning }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import LessonApis from "@/apis/LessonApis.js";

export default {
  props: ["lessonIdx"],
  data() {
    return {
      Vocabs: [],
    };
  },
  methods: {
    async getVocabs() {
      const res = await LessonApis.getLessonbyId(this.lessonIdx);
      this.Vocabs = res.data.vocabs;
    },
  },
  created() {
    this.getVocabs();
  },
};
</script>
