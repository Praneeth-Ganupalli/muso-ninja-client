<template>
  <nav class="mnj mnj-header-nav">
    <router-link to="/" class="mnj mnj--logo">
      <img src="../assets/logo.png" alt="Muso Ninjas" class="mnj-logo-img">
      <span class="mnj-app-title">Muso Ninjas</span>
    </router-link>
    <div class="mnj mnj--action-btns mnj-user-info" v-if="userInfo">
      <router-link to="/playlists/create">
       Create Playlist
      </router-link>
      <router-link to="/playlists/me">
       My Playlists
      </router-link>
      <p class="mnj--user-name">Hi {{ userInfo.name }}</p>
      <button class="mnj-logout-btn" @click="handleLogout">Logout</button>
    </div>
    <div class="mnj mnj--action-btns" v-else>
      <router-link to="/signup">
        <button>Sign up</button>
      </router-link>
      <router-link to="/login">
        <button>Login</button>
      </router-link>
    </div>
  </nav>

</template>

<script setup lang="js">
 import {useStore} from "vuex";
 import { logoutUser } from "@/utils/auth";
 import { computed } from "vue";
import { useRouter } from "vue-router";
 const store = useStore();
 const router = useRouter();
 const userInfo = computed(()=>{
  return store.getters['user/userInfo'];
 })
 const handleLogout = ()=>{
  logoutUser();
  store.commit("user/setUserInfo",null);
  router.replace("/login");
 }
</script>

<style>
nav.mnj-header-nav {
  display: flex;
  padding: 0.75rem 1.5rem;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  align-items: center;
  margin:1rem;
}

a.mnj--logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #333;
}
.mnj-user-info a,p.mnj--user-name
{
  text-decoration: none;
  color: #333;
  font-size: 14px;
}
img.mnj-logo-img {
  height: 50px;
  width: 50px;
}

.mnj-app-title {

  font-weight: bold;
}

.mnj--action-btns {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.mnj--action-btns button {
  font-weight: normal;
  border: none;
  padding: 0.55rem 0.57rem;
  background-color: #eee;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  height: 30px;
}

.mnj--action-btns button:hover {
  background-color: #333;
  color: #fff;
}
button.mnj-logout-btn
{
    position: relative;
    bottom: 5px;
}
@media screen and (max-width:678px) {
  img.mnj-logo-img
  {
    display: none;
  }
  .mnj-user-info a,p.mnj--user-name
  {
    font-size: 12px;
  }
}
</style>