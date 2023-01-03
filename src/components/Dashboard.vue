<template>
  <div>
    <NavbarActive />
    <!-- Breadcrumb justfornow - need change later -->
    <div class="container-fluid header-container">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- end justfornow -->
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
                  <input type="text" class="form-control" v-model="sectionName"/>
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
                      <h5 class="modal-title" id="notifyModalLabel">
                        Add Section
                      </h5>
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
                          <p>
                            Send this code to your students to give them access
                            to the section:
                          </p>
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
    <SectionList />
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import SectionApis from "@/apis/SectionApis.js"
import NavbarActive from "./NavbarActive.vue";
import SectionList from "./SectionList.vue";
export default {
  name: "Dashboard",
  components: {
    NavbarActive,
    SectionList,
  },
  data() {
    return {
      id: "",
      sectionName: ""
    }
  },
  methods: {
    addClick() {},
    async addSection() {
      this.id = uuidv4();
      let sectionBody = {
					id: this.id,
					section: this.sectionName
				}
				await SectionApis.createSection(sectionBody)
    },
    copyCode() {
      var copyText = document.getElementById("sectionId");

      // Select the text field
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices

      // Copy the text inside the text field
      navigator.clipboard.writeText(copyText.value);
      alert("Copied the text: " + copyText.value);
    },
  },
};
</script>

<style>
.addBtn {
  margin-bottom: 20px;
}
.input-group-text {
  border-radius: 0 0.375em 0.375em 0 !important;
}
</style>
