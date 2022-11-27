<template>
  <table>
    <thead>
      <tr>
        <th scope="col">汉字</th>
        <th scope="col">汉语拼音</th>
        <th scope="col">词性</th>
        <th scope="col">英文意思</th>
      </tr>
      <tbody>
        <tr v-for="(v, index) in res">
            <th scope="row">{{ v.data.word}}</th>
            <td>
                {{v.data.pinyin}}
            </td>
            <td>
                {{v.data.type}}
            </td>
            <td>
                {{v.data.meaning}}
            </td>
        </tr>
      </tbody>
    </thead>
  </table>
</template>
<script>
import VocabApis from "@/api/VocabsApis";
export default {
  props: [lessonIdx],
  methods: {
    async Vocabs() {
      const res = await VocabApis.getVocabsBylessonId(this.lessonIdx);
    },
  },
  mounted(){
    this.Vocabs();
  }
};
</script>
