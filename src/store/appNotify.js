export default {
    state: {
        valueTitleMessage: null,
        searchStr:null
    },
    getters: {
        getValueTitleMessage(state){
            return state.valueTitleMessage;
        },
        getValueSearchStr(state){
            return state.searchStr;
        }
    },
    mutations: {
        setValueTitleMessage(state, message){
            state.valueTitleMessage = message;
        },
        setValueSearchStr(state, searchStrVal){
            state.searchStr = searchStrVal;
        }
    },
    actions: {
        setValueTitleMessage({commit}, payload){
            commit("setValueTitleMessage", payload)
        },
        setValueSearchStr({commit}, payload){
            commit("setValueSearchStr", payload)
        }
    }
}