<template>
  <!-- new note -->
  <div class="new-note">
    <label>Title</label>
    <input v-model="note.title" type="text">
    <label>Description</label>
    <textarea v-model="note.descr"></textarea>
    <label>Priority</label>
    <select v-model="note.priority">
        <option v-for="(priority, index) in priorities" :key="index" :value="priority.class"> {{priority.name}} </option>       
    </select>    
    <button class="btn btnPrimary" @click="addNote">New note</button>
  </div>
</template>

<script>
export default {
    props:{
        note:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
            priorities:[
                {
                    name:"ordinary",
                    class:"ordinary"
                },
                {
                    name:"important",
                    class:"important"
                },
                {
                    name:"very important",
                    class:"very-important"
                }
            ]
        }
    },
    methods:{
        addNote(){
            this.$emit('addNote', this.note);
        }
    }
}
</script>

<style lang="scss" scoped>
    .new-note{
        text-align: center
    }
</style>
