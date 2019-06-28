<template>
  <div class="notes">
    <div :class="{full:!grid}" class="note" v-for="(note, index) in notes" :key="index">
      <div :class="{full:!grid}" class="note-header">
        <p
          v-show="aditableNote != index || aditableField !='title'"
          @click="edit(index, 'title', note.title)"
        >{{note.title}}</p>
        <input 
          class="editable-field"
          v-show="aditableNote == index && aditableField =='title'"
          type="text"
          @blur="reset()"
          @keyup.esc="reset()"
          @keyup.enter="saveChanges(index, 'title', newValue)"
          v-model="newValue"
          v-focus
        >
        <p style="cursor:pointer;" @click="removeNote(index)">x</p>
      </div>
      <div class="note-body" :class="note.priority">
        <p
          v-show="aditableNote != index || aditableField !='descr'"
          @click="edit(index, 'descr', note.descr)"
        >{{note.descr}}</p>
        <input
          v-show="aditableNote == index && aditableField =='descr'"
          class="editable-descr-field"
          type="text"
          v-model="newValue"
          @blur="reset()"
          @keyup.esc="reset()"
          @keyup.enter="saveChanges(index, 'descr', newValue)"
          v-focus
        >
        <span>{{note.date}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newValue: null,
      aditableNote: null,
      aditableField: null
    };
  },
  methods: {
    edit(noteIndx, field, oldValue) {
      this.aditableNote = noteIndx;
      this.aditableField = field;
      this.newValue = oldValue;
    },
    reset() {      
      this.aditableNote = null;
      this.aditableField = null;
    },
    removeNote(index) {
      this.$store.dispatch("removeNote", index);
    },
    saveChanges(index, field, newValue){
      this.$store.dispatch("editNote", {index, field, newValue});
      this.reset();
    }
  },
  directives: {
    focus: {
      componentUpdated: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style lang="scss">
.notes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
}
.note {
  width: 48%;
  padding: 18px 20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.02);
  &:hover {
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.04);
    transform: translate(0, -6px);
    transition-delay: 0s !important;
  }
  &.full {
    width: 100%;
    text-align: center;
  }
}
.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 32px;
  }
  p {
    font-size: 22px;
    color: #402caf;
    cursor: pointer;
  }
  svg {
    margin-right: 12px;
    color: #999999;
    &.active {
      color: #402caf;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &.full {
    justify-content: center;
    p {
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.note-body {
  p {
    margin: 20px 0;
    cursor: pointer;
  }
  span {
    font-size: 14px;
    color: #999999;
  }

  &.important span:before {
    content: "";
    display: inline-block;
    width: 11px;
    height: 11px;
    margin-right: 1%;
    background-color: rgb(235, 220, 12);
  }

  &.very-important span:before {
    content: "";
    display: inline-block;
    width: 11px;
    height: 11px;
    margin-right: 1%;
    background-color: crimson;
  }
}

.editable-field {
  width: 95%;
  margin-bottom: 0%;
  padding: 5px 5px;
}

.editable-descr-field {
  padding: 5px 5px;
  margin: 13px 0 15px 0;
}
</style>