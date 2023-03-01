<template>
	<div class="container tab-adjuster">
		<div style="margin-top: 30px">
			<table class="table table-hover">
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
							<router-link :to="{ name: 'Lesson', params: { id: lesson.id } }" draggable="false">
								<div class="text-dark m-3">Lesson {{ lesson.id }}: {{ lesson.title }}</div>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import LessonApis from '@/apis/LessonApis';
	export default {
		name: 'Lesson List',
		components: {},
		data() {
			return {
				lessons: [],
				dragIndex: null,
				dragOverIndex: null,
			};
		},
		methods: {
			async getLessons() {
				const res = await LessonApis.getLessons();
				this.lessons = res.data.sort((a, b) => a.order - b.order);
				console.log('this from list', res.data);
				console.log('lessons res:', this.lessons);
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
		},
		mounted() {
			this.getLessons();
		},
	};
</script>

<style>
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
</style>
