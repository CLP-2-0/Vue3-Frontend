<template>
	<div class="container addBtn">
		<button
			type="button"
			class="btn btn-primary"
			data-bs-toggle="modal"
			data-bs-target="#addModal"
			@click="addClick()"
		>
			+ Add Section
		</button>
		<div
			class="modal fade"
			id="addModal"
			tabindex="-1"
			aria-labelledby="addModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="addModalLabel">Add Section</h5>
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
								<label for="#" class="form-label">Section Name </label>
								<input type="text" class="form-control" v-model="sectionName" />
							</div>
						</form>
						<button
							type="button"
							class="btn btn-primary"
							data-bs-toggle="modal"
							data-bs-target="#notifyModal"
							@click="addSection()"
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
		<div
			class="modal fade"
			id="notifyModal"
			tabindex="-1"
			aria-labelledby="notifyModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="notifyModalLabel">Add Section</h5>
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
								<p>A new section has been added!</p>
								<p>Send this code to your students to give them access to the section:</p>
								<div class="input-group mb-3">
									<input
										id="sectionId"
										type="text"
										class="form-control"
										v-model="id"
										aria-describedby="basic-addon2"
										disabled
									/>
									<div class="input-group-append">
										<span
											type="button"
											class="input-group-text"
											id="basic-addon2"
											@click="copyCode()"
											>Copy</span
										>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container grid-container">
		<!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->

		<div class="col-6 col-md-4 mb-4" v-for="section in sections" :key="section.id">
			<!-- <router-link :to="{ name: 'SectionDetail', params: { sid: section.id } }"> -->
			<div class="image" type="button">
				<div @click="redirect(section.id)">{{ section.section }}</div>
			</div>
			<!-- </router-link
      > -->
		</div>
	</div>
</template>

<script>
	import { v4 as uuidv4 } from 'uuid';
	import SectionApis from '@/apis/SectionApis.js';
	import router from '@/router';
	export default {
		data() {
			return {
				sections: [],
				id: '',
				sectionName: '',
				// username: localStorage.getItem('user_name'),
				username: 'gamer_std1',
			};
		},
		methods: {
			async getSections() {
				const res = await SectionApis.getSections(this.username);
				this.sections = res.data;
				console.log(this.sections);
			},
			addClick() {},
			async addSection() {
				this.id = uuidv4();
				let sectionBody = {
					id: this.id,
					section: this.sectionName,
				};
				await SectionApis.createSection(sectionBody).then(async () => {
					this.getSections();
				});
			},
			copyCode() {
				var copyText = document.getElementById('sectionId');

				// Select the text field
				copyText.select();
				copyText.setSelectionRange(0, 99999); // For mobile devices

				// Copy the text inside the text field
				navigator.clipboard.writeText(copyText.value);
				alert('Copied the text: ' + copyText.value);
			},
			redirect(sid) {
				router.push(sid);
			},
		},
		mounted() {
			this.getSections();
		},
	};
</script>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: auto auto auto;
		justify-content: space-around;
		/* margin: auto; */
	}
	.image {
		height: 40vh;
		width: 18vw;
		min-width: 200px;
		max-width: 300px;
		background: url('../assets/class-logo.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		opacity: 0.6;
		position: relative;
	}
	.image > div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		font-size: 1.5em;
		font-weight: bold;
		text-align: center;
		color: rgb(92, 92, 92);
	}
	@media (max-width: 760px) and (min-width: 450px) {
		.grid-container {
			grid-template-columns: auto auto;
		}
	}
	@media (max-width: 450px) {
		.grid-container {
			grid-template-columns: auto;
		}
	}
</style>
