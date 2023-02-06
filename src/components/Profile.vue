<template>
        <NavbarActive />

        <div class="container mt-5">
            <h1 class="text-left">Edit My User Profile</h1>
            <div class="container mt-5">
    <div class="row">
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-header">
            Profile Picture
          </div>
          <div class="card-body">
            <img
              src="https://via.placeholder.com/150x150"
              class="rounded-circle mb-3"
              alt="Profile Picture"
            />
            <input type="file" id="fileInput" @change="uploadProfilePicture" style="display: none;" />
            <button class="btn btn-primary btn-block" @click="openFileInput">Change Picture</button>
        </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card">
          <div class="card-header">
            <h5>
              <i class="fas fa-user"></i>
              Profile Information
            </h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="nickname">Nickname: </label>
              <input
                type="text"
                class="form-control"
                id="nickname"
                v-model="nickname"
                :class="{ 'is-invalid': errors.nickname }"
              />
              <div class="invalid-feedback" v-if="errors.nickname">
                {{ errors.nickname }}
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                type="text"
                class="form-control"
                id="email"
                v-model="email"
                :class="{ 'is-invalid': errors.email }"
              />
              <div class="invalid-feedback" v-if="errors.email">
                {{ errors.email }}
              </div>
            </div>
            <div class="form-group">
             <label for="hometown">Hometown:</label>
              <input
                   type="text"
                   class="form-control"
                   id="hometown"
                   v-model="hometown"
                   :class="{ 'is-invalid': errors.hometown }"
                 />
                 <div class="invalid-feedback" v-if="errors.hometown">
               {{ errors.hometown }}
            </div>
            </div>
            <hr />
            <button class="btn btn-primary btn-block" @click="updatedUser">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
        </div>
  </template>
  
  <script>
	import NavbarActive from './NavbarActive.vue';
  import UserApis from "@/apis/UserApis.js";
  import { mapState } from 'vuex';


    export default {
    name: "Profile Page",
    components: {
    NavbarActive,
},
data() {
    return {
      nickname: "",
      email: "",
      hometown: "",
      picture: "",
      updatedData:[
        {
          updatedNickname: "",
          updatedEmail: "",
          updatedHometown: ""
        }
      ],
      errors: {}
    };
  },
  methods: {
    updateProfile() {
      this.errors = {};

      if (!this.nickname) {
        this.errors.nickname = "Nickname is required.";
      }

      if (!this.email) {
        this.errors.email = "Email is required.";
      }

      if (!this.hometown) {
        this.errors.hometown = "Hometown is required.";
      }


      if (Object.keys(this.errors).length === 0) {
        // logic to update the profile information
        console.log("Updating profile with nickname: ", this.nickname, " and email: ", this.email);
      }
  },
  uploadProfilePicture(event) {
        let input = event.target;
        if (input.files && input.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            // set the image source to the data URL of the selected file
            this.profilePicture = e.target.result;
          };
          reader.readAsDataURL(input.files[0]);
        }
      },
      openFileInput() {
    document.getElementById("fileInput").click();
  },
  async getUserByUsername() {
    const res = await UserApis.getUserByUsername(this.userInfo.nickname);
    this.nickname = res.data.nickname;
    this.email = res.data.email;
    //this.hometown = res.data.hometown;
    //this.picture = res.data.picture;

    console.log(res.userInfo);
  },
  async updatedUser() {
    const res = await UserApis.updatedUser(this.updatedData, this.userInfo.nickname);
    this.updatedickname = res.data.updatedData.updatedNickname;
    console.log(res.userInfo);
  }
},
computed: {
  ...mapState(["userInfo"])
},
mounted() {
    this.getUserByUsername();
    this.updatedUser();
  }
};

  </script>
  
  <style>
  .is-invalid {
    border-color: #dc3545;
  }

  .card-header h5 {
  font-size: 14px;
}
  </style>
  