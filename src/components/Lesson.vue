<template>
	<div>
		<NavbarActive />
		<!-- justfornow - need change later -->
		<div class="container-fluid header-container">
			<div class="container">
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						<li class="breadcrumb-item">
							<router-link to="/dashboard" class="text-dark">Dashboard</router-link>
						</li>
						<li class="breadcrumb-item">
							<router-link to="" class="text-dark" @click="$router.go(-1)">All Lessons</router-link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">Lesson {{ id }}</li>
					</ol>
				</nav>
			</div>
		</div>
		<!-- end justfornow -->

		<div class="container">
			<div class="container tab-adjuster mb-5">
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
							v-if="isTeacherorAdmin"
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
						<!-- Vertical start here -->
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
									<Book :lessonIdx="this.$route.params.id" />
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
									This is grammar tab
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
						<!-- Vertical end here -->
					</div>
					<!-- horizon tab end -->
					<div
						class="tab-pane fade"
						id="nav-assignment"
						role="tabpanel"
						aria-labelledby="nav-assignment-tab"
					>
						<Homework :lessonIdx="this.$route.params.id" :sid="this.$route.params.sid" />
					</div>
					<div class="tab-pane fade" id="nav-exam" role="tabpanel" aria-labelledby="nav-exam-tab">
						this is exam tab
					</div>
					<div class="tab-pane fade" id="nav-forum" role="tabpanel" aria-labelledby="nav-forum-tab">
						this is forum tab
					</div>
					<div class="tab-pane fade" id="nav-class" role="tabpanel" aria-labelledby="nav-class-tab">
						<UserList :lessonIdx="this.$route.params.id" :sid="this.$route.params.sid" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NavbarActive from './NavbarActive.vue';
	import Translate from './Translate.vue';
	import Vocabs from './Vocabs.vue';
	import Book from './Book.vue';
	import Homework from './Homework.vue';
	import UserList from './UserList.vue';

	export default {
		name: 'Lesson',
		components: {
			NavbarActive,
			Translate,
			Vocabs,
			Book,
			Homework,
			UserList,
		},
		props: ['id'],
		data() {
			return {
				msg: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo iste aspernatur esse voluptate quisquam nam corrupti quaerat facere quis veniam, sapiente fuga voluptatem alias omnis repellendus nobis eveniet. Error, cupiditate.',
				userRole: localStorage.getItem('user_role'),
			};
		},
		computed: {
			isTeacherorAdmin() {
				return this.userRole === 'teacher' || this.userRole === 'admin';
			},
		},
	};
</script>

<style></style>
