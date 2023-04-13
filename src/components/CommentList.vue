<template>
	<div
		id="allComments"
		v-for="(comment, i) in this.commentList"
		:key="i"
		style="margin-bottom: 2%"
	>
		<div class="card bg-light">
			<div class="card-body" :id="['Ans_' + i]">
				<div id="user-info" style="display: flex; justify-content: space-between">
					<h5>{{ comment.username }}</h5>
					<p>{{ comment.timestamp }}</p>
				</div>
				<p>{{ comment.comment }}</p>
				</div>
			</div>
	</div>
</template>
<script>
import HomeworkApis from '@/apis/HomeworkApis';
	export default {
		props: ['idx'],
		data() {
			return {
				comment: '',
				commentList: [],
			};
		},
		methods: {

			async showComments(id) {
					const response = await HomeworkApis.getCommentsByAnswer(id);
					for (let c of response.data) {
						let userInfo = c.split('_');
						let timestamp = new Date(parseInt(userInfo[0]));
						let username = userInfo[1];
						let content = c.substring(userInfo[0].length + username.length + 2);
						let comment = {
							timestamp: timestamp.toLocaleString(),
							username: username,
							comment: content,
						};
						this.commentList.push(comment);
					}
			},
            
		},
        mounted () {
                this.showComments(this.idx);
            }
	};
</script>
