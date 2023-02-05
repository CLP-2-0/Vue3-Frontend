<template>
    <div>
                  <div >
                    <button class="btn btn-success" @click="">Start Recording</button>
                    <button class="btn btn-danger" @click="">Stop Recording</button>
  
                    <div class="audio-recording-container" id="recording">
                    <!-- <audio controls="" class="audio-element"></audio> -->
                      </div>
                  </div>
     
    </div>
  </template>
  
  <script>
  export default {
    props: [],
    data() {
      return {
        mediaRecorder: null,
        chunks: [],
        audio: ""
      };
    },
    methods: {
      startRecording() {
        
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            
            this.mediaRecorder.start();
            this.mediaRecorder.addEventListener("dataavailable", event => {
              this.chunks.push(event.data);
            });
          });
      },
      stopRecording() {
        this.mediaRecorder.stop();
        const audioBlob = new Blob(this.chunks);
              const audioUrl = URL.createObjectURL(audioBlob);
              this.audio = new Audio(audioUrl);
              this.audio.play();
        
      }
    },
    async mounted() {
    },
  };
  </script>
  
  <style></style>
  