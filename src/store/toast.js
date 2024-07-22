export default {
    name: 'toast',
    namespaced: true,
    state: {
        messages: []
    },
    getters: {
        messages:(state)=>state.messages
    },
    mutations: {
        addNewMessage(state, payload) {
            state.messages.push({
                message: payload.message,
                variant: payload.variant
            })
        },
        removeMessage(state, payload) {
            state.messages.splice(payload, 1);
        }
    },
    actions: {
        showToastMessage(context, payload) {
            const duration = payload.duration || 3000;
            context.commit("addNewMessage", payload);
            const newMsgIndex = context.state.messages.length-1;
            setTimeout(() => {
                context.commit("removeMessage", newMsgIndex);
            }, duration)
        }
    }
}