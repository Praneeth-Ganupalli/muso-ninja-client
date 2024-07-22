import {createStore} from "vuex";
import toast from "./toast";
import user from "./user"
const store = createStore({
    modules:{
        toast,
        user
    },
})

export default store;