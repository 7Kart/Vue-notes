<template>
  <div class="notes">
    <div :class="{full:!grid}" class="note" v-for="(note, index) in notes" :key="index">
      <div :class="{full:!grid}" class="note-header">
        <p v-show="activeField !== `${index}_title`" @click="edit(`${index}_title`, note.title)">{{note.title}}</p>
        <input class="editable-field" v-show="activeField === `${index}_title`" type="text" @blur="unactiveField()" v-model="newValue"/>
        <p style="cursor:pointer;" @click="removeNote(index)">x</p>
      </div>
      <div class="note-body" :class="note.priority">
        <p v-show="activeField !== `${index}_descr`" @click="edit(`${index}_descr`, note.descr)">{{note.descr}}</p>
        <input class="editable-descr-field" v-show="activeField === `${index}_descr`" type="text" @blur="unactiveField()" v-model="newValue"/>
        <span @click="edit(`${index}_date`)">{{note.date}}</span>
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
    grid:{
      type:Boolean,
      required: true
    }
  },
  data(){
    return {
      activeField: null,
      newValue: null
    }
  },
  mounted(){
    window.addEventListener('keydown', (e) => {
      if(this.activeField){
        if (e.key == 'Escape') {
          this.activeField = null
        }else if(e.key == 'Enter' && this.newValue.trim().length > 0){
          let indexNote = 1*this.activeField.split("_")[0];
          let fieldName = this.activeField.split("_")[1];
          let editedNote = this.notes[indexNote];
          editedNote[fieldName] = this.newValue;
          editedNote.date = new Date(Date.now()).toLocaleString();          
          this.activeField = null
        }
      }
    }); 
  },
  methods: {
    removeNote(index) {
      this.$emit("removeNote", index);
    },
    edit(id, currentValue){      
      if(id){
        this.activeField = id;
        this.newValue = currentValue;     
      }
    },
    unactiveField(){
      this.activeField = null;
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
  transition: all .25s cubic-bezier(.02,.01,.47,1);
  box-shadow: 0 30px 30px rgba(0,0,0,.02);
  &:hover {
    box-shadow: 0 30px 30px rgba(0,0,0,.04);
    transform: translate(0,-6px);
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
.note-body{
  p {
    margin: 20px 0;
    cursor: pointer;
  }
  span {
    font-size: 14px;
    color: #999999;
  }

  &.important span:before{
    content: "";
    display: inline-block;
    width: 11px;
    height: 11px;
    margin-right: 1%;
    background-color: rgb(235, 220, 12);
  }

  &.very-important span:before{
    content: "";
    display: inline-block;
    width: 11px;
    height: 11px;
    margin-right: 1%;
    background-color: crimson;
  }

}

.editable-field{
  width: 100%;
  margin-bottom: 0%;
  padding: 5px 5px;
}

.editable-descr-field{
  width: 100%;
  padding: 5px 5px;
  margin: 13px 60% 15px 0;
}

</style>