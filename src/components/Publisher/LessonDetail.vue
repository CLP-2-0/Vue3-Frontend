<template>
  <div>
    <NavbarActive />

    <!-- justfornow - need change later -->
    <div class="container-fluid header-container">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/publisher/dashboard" class="text-dark"
                >Dashboard</router-link
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Lessons {{ id }}
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="container">
      <div class="container tab-adjuster mb-5">
        <!-- Testing current location. Erase it when fisnih ********************************************* -->
        <!-- <h4><span class='text-success'>//testing where we are</span> This is <span class='text-danger'>lesson {{ id }} </span></h4>
            <br/><br/> -->

        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              class="nav-link active"
              id="nav-book-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-book"
              type="button"
              role="tab"
              aria-controls="nav-book"
              aria-selected="true"
            >
              Book
            </button>
            <button
              class="nav-link"
              id="nav-assignment-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-assignment"
              type="button"
              role="tab"
              aria-controls="nav-assignment"
              aria-selected="false"
            >
              Assignment
            </button>
            <button
              class="nav-link"
              id="nav-exam-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-exam"
              type="button"
              role="tab"
              aria-controls="nav-exam"
              aria-selected="false"
            >
              Exam
            </button>
            <button
              class="nav-link"
              id="nav-forum-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-forum"
              type="button"
              role="tab"
              aria-controls="nav-forum"
              aria-selected="false"
            >
              Forum
            </button>
            <button
              class="nav-link"
              id="nav-class-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-class"
              type="button"
              role="tab"
              aria-controls="nav-class"
              aria-selected="false"
            >
              Class
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-book"
            role="tabpanel"
            aria-labelledby="nav-book-tab"
          >
            <!-- Horizontal start here -->
            <div class="d-flex align-items-start">
              <div
                class="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  class="nav-link active"
                  id="v-pills-chinese-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-chinese"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-chinese"
                  aria-selected="true"
                >
                  Chinese
                </button>
                <button
                  class="nav-link"
                  id="v-pills-pinyin-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-pinyin"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-pinyin"
                  aria-selected="false"
                >
                  Pinyin
                </button>
                <button
                  class="nav-link"
                  id="v-pills-grammar-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-grammar"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-grammar"
                  aria-selected="false"
                >
                  Grammar
                </button>
                <button
                  class="nav-link"
                  id="v-pills-vocab-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-vocab"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-vocab"
                  aria-selected="false"
                >
                  Vocabs
                </button>
              </div>
              <div class="tab-content flex-grow-1 ms-3" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="v-pills-chinese"
                  role="tabpanel"
                  aria-labelledby="v-pills-chinese-tab"
                >
                  <div class="container btn-container">
                    <button
                      class="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Edit Book
                    </button>
                  </div>
                  <div class="collapse show" id="collapseExample">
                    <div class="">
                      <Book :lessonIdx="id"></Book>
                    </div>
                  </div>
                  <div class="collapse" id="collapseExample">
                    <div class="">
                      <BookEditor :lessonIdx="id" />
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-pinyin"
                  role="tabpanel"
                  aria-labelledby="v-pills-pinyin-tab"
                >
                  <Translate :lessonIdx="this.$route.params.id" />
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-grammar"
                  role="tabpanel"
                  aria-labelledby="v-pills-grammar-tab"
                >
                  <Grammar :lessonIdx="this.$route.params.id" />
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-vocab"
                  role="tabpanel"
                  aria-labelledby="v-pills-vocab-tab"
                >
                  <Vocabs :lessonIdx="this.$route.params.id"></Vocabs>
                </div>
              </div>
            </div>
            <!-- Horizontal end here -->
          </div>
          <div
            class="tab-pane fade"
            id="nav-assignment"
            role="tabpanel"
            aria-labelledby="nav-assignment-tab"
          >
            <QuestionBank :lessonIdx="this.$route.params.id" />
          </div>
          <div
            class="tab-pane fade"
            id="nav-exam"
            role="tabpanel"
            aria-labelledby="nav-exam-tab"
          >
            this is exam tab
          </div>
          <div
            class="tab-pane fade"
            id="nav-forum"
            role="tabpanel"
            aria-labelledby="nav-forum-tab"
          >
            this is forum tab
          </div>
          <div
            class="tab-pane fade"
            id="nav-class"
            role="tabpanel"
            aria-labelledby="nav-class-tab"
          >
            this is class tab
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarActive from "../NavbarActive.vue";
import LessonList from "./LessonList.vue";
import BookEditor from "./BookEditor.vue";
import Translate from "../Translate.vue";
import Vocabs from "../Vocabs.vue";
import Book from "../Book.vue";
import QuestionBank from "./QuestionBank.vue";
import Grammar from "../Grammar.vue";
export default {
  name: "Lesson Detail",
  components: {
    NavbarActive,
    LessonList,
    BookEditor,
    Translate,
    Vocabs,
    Book,
    QuestionBank,
    Grammar,
  },
  props: ["id"],
  // data() {
  //   return {
  //     id: this.$route.params.id,
  //   };
  // },
};
</script>

<style></style>
