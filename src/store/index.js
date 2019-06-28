import Vue from "vue";
import Vuex from "vuex";
import notesStore from "./notes";
import appNotify from "./appNotify";
import priorities from "./priorities";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        notesStore,
        appNotify,
        priorities
    }
});