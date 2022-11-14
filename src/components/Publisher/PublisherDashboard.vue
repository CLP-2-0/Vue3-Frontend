<template>
    <div>
        <NavbarActive />
        <div class="container">
            
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">ADD+</button>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add lesson</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="mb-3">
                            <label for="#" class="form-label center-label">Lesson #</label>
                            <input type="text" class="form-control" id="lessonNumber" aria-describedby="emailHelp">

                        </div>
                        <div class="mb-3">
                            <label for="#" class="form-label">Tilte</label>
                            <input type="text" class="form-control" id="lessonTitle">
                        </div>
                        
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary text-center">Create</button>
                        <!-- <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button> -->
                    </div>
                </div>
            </div>
            </div>

            <LessonList />
            <!-- <BookEditor /> -->
        </div>
        
        
    </div>
</template>

<script>
import NavbarActive from '../NavbarActive.vue'
import BookEditor from './BookEditor.vue'
import LessonList from './LessonList.vue';

export default {
    name:'Publisher Dashboard',
    components:{
        NavbarActive,
        BookEditor,
        LessonList
    },
    data() {
      return {
        
      }
    }
}
</script>

<style>

</style>