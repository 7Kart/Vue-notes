<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <message :message="setMessage"/>
          <newNote :note="note"/>
          <div class="note-header" style="margin-top:36px">
            <h1>{{title}}</h1>
            <search :value="value" placeholder="filtered value"/>
            <div class="icons">
              <svg style="cursor:pointer" :class="{active:grid}" @click="grid = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <svg style="cursor:pointer" :class="{active:!grid}" @click="grid = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
          </div>  
          <notes :notes="notesFilter" :grid="grid"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

import newNote from "@/components/NewNote.vue";
import notes from "@/components/Notes.vue";
import search from "@/components/Search.vue";
import message from "@/components/Message.vue";

export default {
  components: {
    message,
    newNote,
    notes,
    search
  },
  data() {
    return {
      title: "Notes",
      message: null,
      grid: true,
      value: "",
      search: "",
      note: null,
      notes: []
    };
  },
  created(){
    this.note = this.$store.getters.getEmptytNote;
    this.notes = this.$store.getters.getAllNotes;
  },
  computed:{
    setMessage(){
      return this.$store.getters.getValueTitleMessage;
    },

    notesFilter() {
      return this.$store.getters.getFilteredNotes(this.$store.getters.getValueSearchStr);
    }
  }
};
</script>
