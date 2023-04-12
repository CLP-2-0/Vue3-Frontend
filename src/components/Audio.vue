<template>
	<div>
		<div class="mb-3">
			<button
				class="btn btn-success"
				@click="startRecording()"
				:disabled="isRecording"
				style="width: 140px"
			>
				{{ isRecording ? 'Recording . . .' : 'Start Recording' }}
			</button>
			<button class="btn btn-danger ms-1" @click="stopRecording()" style="width: 140px">
				Stop Recording
			</button>
		</div>
		<audio controls src="" id="result" v-if="isAudio"></audio>
	</div>
</template>

<script>
	export default {
		emits: ['answer-update'],
		data() {
			return {
				mediaRecorder: null,
				isRecording: false,
				isAudio: false,
				audioAnswer: null,
			};
		},
		methods: {
			startRecording() {
				let chunks = [];
				this.isRecording = true;
				this.isAudio = false;
				// Request access to the microphone
				navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
					// Create a new MediaRecorder instance
					this.mediaRecorder = new MediaRecorder(stream);

					// Start recording the audio
					this.mediaRecorder.start();

					// Add data to the chunks array as it becomes available
					this.mediaRecorder.ondataavailable = (e) => {
						chunks.push(e.data);
					};
					this.mediaRecorder.addEventListener('stop', () => {
						// Create a new Blob from the chunks array
						const blob = new Blob(chunks, { type: 'audio/mp3' });
						this.audioAnswer = blob;
						console.log('Blob', blob);
						this.$emit('answer-update', this.audioAnswer);
						// Create a new audio element and set its source to the Blob
						const audioElement = document.getElementById('result');
						audioElement.src = URL.createObjectURL(blob);
						console.log('s', audioElement.src);
					});
				});
			},
			stopRecording() {
				this.mediaRecorder.stop();
				this.isRecording = false;
				this.isAudio = true;
			},
		},
	};
</script>
