<template>
  <div>
    <Navbar />
    <!-- Jumbotron -->
    <div
      class="px-4 py-5 px-md-5 text-center text-lg-start fullscreen"
      style="background-color: hsl(0, 0%, 96%)"
    >
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="my-5 display-3 fw-bold ls-tight">
              Chinese Learning <br />
              <span class="text-primary">Program</span>
            </h1>
            <p style="color: hsl(217, 10%, 50.8%)">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card m-4">
              <div class="card-body py-5 px-md-5">
                <form>
                  <!-- 2 column grid layout with text inputs for the first and last names -->
                  <div class="row">
                    <div
                      class="d-flex flex-row align-items-center justify-content-center"
                    >
                      <p class="lead fw-normal mb-0 me-3">Sign in with</p>
                      <button
                        type="button"
                        class="btn btn-primary btn-floating mx-1 "
                      >
                        <i class="fab fa-facebook-f "></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-primary btn-floating mx-1"
                      >
                        <i class="fab fa-twitter"></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-primary btn-floating mx-1"
                      >
                        <i class="fab fa-linkedin-in"></i>
                      </button>
                    </div>
                    <div
                      class="divider d-flex align-items-center my-4 justify-content-center"
                    >
                      <p class="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>

                    <!-- Email input -->
                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        class="form-control form-control-lg"
                        placeholder="Enter a valid email address"
                      />
                      <label class="form-label" for="form3Example3"
                        >Email address</label
                      >
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-3">
                      <input
                        type="password"
                        id="form3Example4"
                        class="form-control form-control-lg"
                        placeholder="Enter password"
                      />
                      <label class="form-label" for="form3Example4"
                        >Password</label
                      >
                    </div>

                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <!-- Checkbox -->
                      <div class="form-check mb-0">
                        <input
                          class="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3"
                        />
                        <label class="form-check-label" for="form2Example3">
                          Remember me
                        </label>
                      </div>
                      <a href="#!" class="text-body">Forgot password?</a>
                    </div>

                    <div class="text-center mt-4 pt-2">
                      <router-link to="/teacher/dashboard"
                        ><button
                          type="button"
                          class="btn btn-primary btn-lg container-fluid mb-2"
                        >
                          Login
                        </button></router-link
                      >
                      <!-- For now, log in will go to /teacher/dashboard. Just for testing -->
                      <router-link to="/publisher/dashboard"
                        ><button
                          type="button"
                          class="btn btn-primary btn-lg container-fluid"
                        >
                          Login as publisher
                        </button></router-link
                      >
                      <!-- For now, log in will go to /teacher/dashboard. Just for testing -->

                      <p class="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account?
                        <router-link to="/signup" class="link-danger"
                          >Register</router-link
                        >
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Jumbotron -->
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  name: "Home",
  components: {
    Navbar
  }
};
</script>

<style></style>
