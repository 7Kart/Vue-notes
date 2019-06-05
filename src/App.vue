<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <message :message="message"/>
          <newNote :note="note" @addNote="addNote"/>
          <div class="note-header" style="margin-top:36px">
            <h1>{{title}}</h1>
            <search :value="value" placeholder="filtered value" @search="search = $event"/>
            <div class="icons">
              <svg style="cursor:pointer" :class="{active:grid}" @click="grid = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <svg style="cursor:pointer" :class="{active:!grid}" @click="grid = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
          </div>  
          <notes :notes="notesFilter" :grid="grid" @removeNote="removeNote"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import message from "@/components/Message.vue";
import newNote from "@/components/NewNote.vue";
import notes from "@/components/Notes.vue";
import search from "@/components/Search.vue";
import { close } from 'fs';
import { log } from 'util';
import { notEqual } from 'assert';

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
      note: {
        title: "",
        descr: "",
        priority: ""
      },
      notes: [
        {
          title: "First note",
          descr: "descripption for first note",
          date: new Date(Date.now()).toLocaleString(),
          priority: "ordinary"
        },
        {
          title: "Second note",
          descr: "descripption for second note",
          date: new Date(Date.now()).toLocaleString(),
          priority: "important"
        },
        {
          title: "Third note",
          descr: "descripption for third note",
          date: new Date(Date.now()).toLocaleString(),
          priority: "very-important"
        }
      ]
    };
  },
  computed:{
    notesFilter() {
      if(!this.search) return this.notes;

      let search = this.search.toLowerCase().trim(),
        notes = this.notes;

      notes = notes.filter((note)=>{
        return note.title.trim().toLowerCase().indexOf(search) != -1;
      });

      return notes;
    }
  },
  methods: {
    addNote() {
      let { title, descr,  priority} = this.note;

      if (title === "") {
        this.message = "title is empty";
        return false;
      }

      this.notes.push({
        title,
        descr,
        priority,
        date: new Date(Date.now()).toLocaleString()
      });

      this.note.title = "";
      this.note.descr = "";
      this.note.priority = null;

      this.message = null;

    },
    removeNote(index) {
      this.notes.splice(index, 1);
    }
  }
};
</script>
