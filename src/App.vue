<template>
  <toast-message></toast-message>
  <header>
    <the-header></the-header>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import Header from "./components/TheHeader.vue"
import ToastMessage from "./components/Toast/ToastMessage.vue";
import { isLoggedIn, getSavedUserInfo } from "./utils/auth";
export default {
  name: 'App',
  components: {
    TheHeader: Header,
    ToastMessage
  },
  created() {
    if (isLoggedIn()) {
       this.$store.commit('user/setUserInfo',getSavedUserInfo());
       this.showToastMessage({
        message:'Logged in Successfully',
        variant:'success'
       })
    }
  },
  methods: {
    showToastMessage(toastDetails) {
      this.$store.dispatch('toast/showToastMessage', toastDetails);
    }
  },
  provide() {
    return {
      showToast: this.showToastMessage
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #fafafa;
}
.container
{
  margin: 1rem;
}
p.error-text
{
  color:red;
  padding: 1rem;
}
.mnj--base-button {
    font-weight: normal;
    border: none;
    padding: 0.55rem 0.87rem;
    background-color: #eee;
    color: black;
    border-radius: 5px;
    cursor: pointer;
    height: 30px;
    width: fit-content;
}
.mnj--base-button:hover{
    background-color: #333;
    color: #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
