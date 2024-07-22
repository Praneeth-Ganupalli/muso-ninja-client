<template>
    <div class="toast-container">
        <ul class="toast-items-list">
            <li :class="`toast-item ${toast.variant}`" v-for="(toast,idx) in toastMessages" :key="`${idx}`">
                <span>{{ toast.message }}</span>
                <button :class="`toast-close ${toast.variant}`" @click="discardToast(idx)">&times;</button>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { computed } from "vue";
 import { useStore } from "vuex";
 const store = useStore();
 const toastMessages = computed(()=>{
    return store.getters['toast/messages']
 })
 const discardToast = (idx)=>{
    store.commit("toast/removeMessage",idx)
 }
</script>

<style scoped>
.toast-container {
    position: fixed;
    right: 0;
    top: 10px;
    margin-right: 1rem;
    z-index: 99999;
}
li.toast-item {
    color: #fff;
    padding: 1rem;
    width: 20vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
li.toast-item.error{
    background-color: red;
}
li.toast-item.success{
    background-color: green;
}
li.toast-item.warning{
    background-color: orange;
}
button.toast-close
{
    border:none;
    outline: none;
    color: #fff;
    background-color: inherit;
    font-size: 24px;
    cursor: pointer;
}
@media screen and (max-width:678px) {
    li.toast-item
    {
        width:65vw;
    }
}
</style>