export default {
    state: {
        priorities: [
            {
                name: "ordinary",
                class: "ordinary"
            },
            {
                name: "important",
                class: "important"
            },
            {
                name: "very important",
                class: "very-important"
            }
        ]
    },
    getters:{
        getPriorities(state){
            return state.priorities;
        }
    }
}