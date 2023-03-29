<template>
	<div>
		<div style="margin-top: 30px">
			<input
				type="text"
				class="form-control form-control-m mb-3"
				v-model="searchTerm"
				placeholder="Search for a student "
			/>
			<table class="table table-hover">
				<tbody>
					<tr v-for="student in sortedAndFilteredStudents" :key="student.id">
						<td>
							<div class="text-dark m-3">{{ student.firstname }}, {{ student.lastname }}</div>
						</td>
						<td>
							<div class="text-dark m-3">{{ student.email }}</div>
						</td>
						<!-- <td class="text-right">
							<div>
								<i class="fa-solid fa-pen-to-square mx-5 mt-4" @click="editUser(student.id)"></i>
							</div>
						</td> -->
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import SectionApis from '@/apis/SectionApis.js';
	export default {
		name: 'UserList',
		props: ['lessonIdx', 'sid'],
		data() {
			return {
				sid: this.sid,
				students: [],
				searchTerm: '',
			};
		},
		methods: {
			async getSectionById() {
				const res = await SectionApis.getSectionById(this.sid);
				console.log(res.data.students);
				this.students = res.data.students;
			},
		},
		mounted() {
			this.getSectionById();
		},
		computed: {
			// sortedStudents() {
			// 	return this.students.sort((a, b) => (a.email > b.email ? 1 : -1));
			// },
			sortedAndFilteredStudents() {
				const filtered = this.students.filter((student) => {
					return student.email.toLowerCase().includes(this.searchTerm.toLowerCase());
				});
				return filtered.sort((a, b) => (a.email > b.email ? 1 : -1));
			},
		},
	};
</script>

<style></style>
