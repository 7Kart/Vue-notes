<template>
  <!-- new note -->
  <div class="new-note">
    <label>Title</label>
    <input v-model="note.title" type="text">
    <label>Description</label>
    <textarea v-model="note.descr"></textarea>
    <label>Priority</label>
    <select v-model="note.priority">
      <option
        v-for="(priority, index) in priorities"
        :key="index"
        :value="priority.class"
      >{{priority.name}}</option>
    </select>
    <button class="btn btnPrimary" @click="addNote">New note</button>
  </div>
</template>

<script>

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      priorities: []
    };
  },
  created(){
    this.priorities = this.$store.getters.getPriorities;
  },
  methods: {
    addNote() {
      if (!this.note.title) {
        this.$store.dispatch("setValueTitleMessage", "title is empty");
        return false;
      }

      this.$store.dispatch("setValueTitleMessage", null);
      this.$store.dispatch("addNewNote", this.note);

      this.note.title = "";
      this.note.descr = "";
      this.note.priority = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.new-note {
  text-align: center;
}
</style>
