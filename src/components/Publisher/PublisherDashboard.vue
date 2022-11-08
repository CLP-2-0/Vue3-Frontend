<template>
    <div>
        <NavbarActive />
        <div class="container">
            <BookEditor />
        </div>
        
    </div>
</template>

<script>
import NavbarActive from '../NavbarActive.vue'
import BookEditor from './BookEditor.vue'
export default {
    name:'Publisher Dashboard',
    components:{
        NavbarActive,
        BookEditor,
    }
}
</script>

<style>

</style>