<template>
	<div id="notification-box"></div>
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
								<label for="#" class="form-label center-label">Lesson # (*)</label>
								<input
									type="text"
									class="form-control"
									v-model="newLessons.LessonId"
									v-if="flagEdit == 0"
									:class="{ 'is-invalid': errors.error }"
								/>
								<div class="invalid-feedback" v-if="errors.error">
									{{ errors.error }}
								</div>

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
					<tr
						v-for="(lesson, index) in lessons"
						:key="lesson.id"
						class="m-4 lesson"
						:class="{ dragging: dragIndex === index, dragover: dragOverIndex === index }"
						:draggable="true"
						@dragstart="handleDragStart($event, index)"
						@dragenter="handleDragEnter($event, index)"
						@dragleave="handleDragLeave"
						@dragover.prevent
						@drop="handleDrop($event, index)"
					>
						<td>
							<router-link
								:to="{ name: 'Lesson Detail', params: { id: lesson.id } }"
								draggable="false"
							>
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
				dragIndex: null,
				dragOverIndex: null,
				errors: {},
			};
		},
		methods: {
			async getLessons() {
				//console.log("c")
				const res = await LessonApis.getLessons();
				this.lessons = res.data.sort((a, b) => a.order - b.order);
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
				this.errors = {};

				if (!this.newLessons.LessonId) {
					this.errors.error = 'This field is required.';
					this.showNotificationFail('Request Failed');
				} else {
					let lessonBody = {
						id: this.newLessons.LessonId,
						title: this.newLessons.LessonTitle,
					};
					await LessonApis.createLesson(lessonBody).then(async (res) => {
						await this.getLessons();
					});
					this.showNotification('Created successfully');
				}
			},
			async updateLesson() {
				await LessonApis.getLessonById(this.newLessons.LessonId).then(async (res) => {
					const upContent = res.data.content;

					let lessonBody = {
						id: this.newLessons.LessonId,
						title: this.newLessons.LessonTitle,
						content: upContent,
					};

					await LessonApis.updateLesson(lessonBody, this.newLessons.LessonId).then(async (res) => {
						await this.getLessons();
					});
				});
				this.showNotification('Updated successfully');
			},
			async deleteLesson(id) {
				if (!confirm('Are you sure you want to delete')) {
					return;
				}
				await LessonApis.deleteLesson(id).then((res) => {
					this.getLessons();
					this.showNotification('Deleted successfully');
				});
			},
			handleDragStart(event, index) {
				this.dragIndex = index;
			},
			handleDragEnter(event, index) {
				if (index !== this.dragIndex) {
					this.dragOverIndex = index;
				}
			},
			handleDragLeave(event) {
				this.dragOverIndex = null;
			},
			async handleDrop(event, index) {
				if (index !== this.dragIndex) {
					const temp = this.lessons[index];
					this.lessons[index] = this.lessons[this.dragIndex];
					this.lessons[this.dragIndex] = temp;
				}
				this.dragIndex = null;
				this.dragOverIndex = null;

				// create new update Lessons after drag and drop
				const updatedLessons = this.lessons.map((lesson, index) => ({
					...lesson,
					order: index,
				}));

				// Log the updated lessons to the console
				console.log('this new array:', updatedLessons);

				// Call the saveAllLessons to update the backend with new order
				try {
					await LessonApis.saveAllLessons(updatedLessons);
					console.log('All lessons save');
				} catch (error) {
					console.log(error);
				}
			},
			showNotification(message) {
				const notificationBox = document.getElementById('notification-box');
				notificationBox.innerHTML = message;
				notificationBox.style.display = 'block';
				setTimeout(function () {
					notificationBox.style.display = 'none';
				}, 5000);
			},
			showNotificationFail(message) {
				const notificationBox = document.getElementById('notification-box');
				notificationBox.innerHTML = message;
				notificationBox.style.display = 'block';
				notificationBox.style.borderLeft = 'solid 3px #cc081c';
				setTimeout(function () {
					notificationBox.style.display = 'none';
				}, 5000);
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
	.lesson {
		transition: transform 0.2s ease-in-out;
	}
	.dragging {
		opacity: 0.8;
		transform: scale(1.05);
		background-color: #eff6ff;
		z-index: 9999;
	}
	.dragover {
		background-color: #e5f2ff;
		transform: translateY(-10px);
	}
	.is-invalid {
		border-color: #dc3545;
		/* border-color: #cc081c; */
	}
</style>
