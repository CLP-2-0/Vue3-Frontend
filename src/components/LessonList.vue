<template>
	<div class="container tab-adjuster">
		<div style="margin-top: 30px">
			<table class="table table-hover">
				<tbody>
					<tr
						v-for="(lesson, index) in lessons"
						:key="lesson.id"
		
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
