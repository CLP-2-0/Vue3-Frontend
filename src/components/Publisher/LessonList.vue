<template>
	<div class="container tab-adjuster">
		<!-- Button trigger modal -->
		<button
			type="button"
			class="btn btn-primary"
			data-bs-toggle="modal"
			data-bs-target="#exampleModal"
			@click="addClick()"
		>
			New Lesson
		</button>
		<!-- Modal -->
		<div
			class="modal fade"
			id="exampleModal"
			tabindex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						<form>
							<div class="mb-3">
								<label for="#" class="form-label center-label">Lesson #</label>
								<input
									type="text"
									class="form-control"
									v-model="newLessons.LessonId"
									v-if="flagEdit == 0"
								/>

								<input
									type="text"
									class="form-control"
									v-model="newLessons.LessonId"
									v-if="flagEdit == 1"
									disabled
								/>
							</div>
							<div class="mb-3">
								<label for="#" class="form-label">Tilte</label>
								<input type="text" class="form-control" v-model="newLessons.LessonTitle" />
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button
							type="submit"
							class="btn btn-primary text-center"
							data-bs-dismiss="modal"
							v-if="flagEdit == 0"
							@click="createLesson()"
						>
							Create
						</button>
						<button
							type="submit"
							class="btn btn-primary text-center"
							data-bs-dismiss="modal"
							v-if="flagEdit == 1"
							@click="updateLesson()"
						>
							Update
						</button>
					</div>
				</div>
			</div>
		</div>

		<div style="margin-top: 30px">
			<table class="table table-hover">
				<!-- <thead>
                <tr>
                    <th>Title</th>
                    <th></th>
                </tr>
                </thead> -->
				<tbody>
					<tr v-for="lesson in lessons" :key="lesson.id">
						<td>
							<router-link :to="{ name: 'Lesson Detail', params: { id: lesson.id } }">
								<div class="text-dark m-3">Lesson {{ lesson.id }}: {{ lesson.title }}</div>
							</router-link>
						</td>
						<td class="text-right">
							<div>
								<button
									class="btn btn-light mx-3"
									data-bs-toggle="modal"
									data-bs-target="#exampleModal"
									@click="editClick(lesson)"
								>
									Rename
								</button>
								<button class="btn btn-light" @click="deleteLesson(lesson.id)">Delete</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import LessonApis from '@/apis/LessonApis';
	import axios from 'axios';
	export default {
		name: 'Lesson List',
		components: {},
		data() {
			return {
				lessons: [],
				modalTitle: '',
				newLessons: {
					LessonTitle: '',
					LessonId: 0,
				},
				flagEdit: 0,
			};
		},
		methods: {
			async getLessons() {
				const res = await LessonApis.getLessons();
				this.lessons = res.data;
			},
			async addClick() {
				this.flagEdit = 0;
				this.modalTitle = 'Add lesson';
				this.newLessons.LessonId = '';
				this.newLessons.LessonTitle = '';
			},
			async editClick(lesson) {
				this.flagEdit = 1;
				this.modalTitle = 'Edit lesson';
				this.newLessons.LessonTitle = lesson.title;
				this.newLessons.LessonId = lesson.id;
			},
			async createLesson() {
				let lessonBody = {
					id: this.newLessons.LessonId,
					title: this.newLessons.LessonTitle
				}
				await LessonApis.createLesson(lessonBody)
				.then(async (res) => {
					await this.getLessons();
				})
				
			},
			async updateLesson() {
				let lessonBody = {
					id: this.newLessons.LessonId,
					title: this.newLessons.LessonTitle
				}
				await LessonApis.updateLesson(lessonBody, this.newLessons.LessonId)
				.then(async (res) => {
					await this.getLessons();
				})
			},
			async deleteLesson(id) {
				if (!confirm('Are you sure you want to delete')) {
					return;
				}
				await LessonApis.deleteLesson(id)
				.then((res) => {
					this.getLessons();
					alert('Deleted Successfully');
				});
			},
		},
		mounted() {
			this.getLessons();
		},
	};
</script>

<style>
	.text-right {
		text-align: right;
	}
</style>
