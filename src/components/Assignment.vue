<template>
  <div>
    
    <div class="container tab-adjuster">
      <div class="row">
        <div class="question-bank col">
          <div
            class="card row"
            style="margin-bottom: 5px;
              display: flex;
              padding: 5px;
              flex-direction: row;
            "
            v-for="question in questions"
            :key="question.id"
          >
            <div class="card-body" style="width: 90%">
              <h5 class="card-title">Question: ({{ question.point }} points)</h5>
              <h6
                class="card-subtitle mb-2 text-muted"
                v-html="question.question.question"
              ></h6>
              <div class="form-group">
                <label for="exampleFormControlTextarea1"
                  >Answer:</label
                >
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Type your answer here..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div style="display: flex;justify-content: center;">
      <button type="button" class="btn btn-success" @click="createHomework"> Create Homework</button>
    </div> -->
    </div>
  </div>
</template>

<script>
import HomeworkApis from "@/apis/HomeworkApis";
export default {
  props: ["lessonIdx", "sid"],
  data() {
    return {
      questions: [],
    };
  },
  methods: {
    async getAssignment() {
      console.log("get assignment...");
      const res = await HomeworkApis.getHomeworkBySection(
        this.lessonIdx,
        this.sid
      );
      console.log(res.data.questionList[0].question);
      this.questions = res.data.questionList;
    },
  },
  mounted() {
    this.getAssignment();
  },
};
</script>

<style></style>
