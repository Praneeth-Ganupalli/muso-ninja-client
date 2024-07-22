<template>
  <h1 class="mnj-playlist-title">{{ props.title }}</h1>
  <article v-for="(mockPlayListItem,index) in props.playlist" :key="index">
    <PlayListItem :item="mockPlayListItem"></PlayListItem>
  </article>
</template>

<script setup>
 import PlayListItem from "./PlayListItem.vue";
 import {defineProps} from "vue"
 const props = defineProps({
  playlist:{
    type:Array,
    default:()=>[],
  },
  title:String
 })
</script>

<style scoped>
  h1.mnj-playlist-title
  {
    color:#4f515a;
    font-size: 18px;
    font-family: 'Courier New', Courier, monospace
  }
</style>