<template>
    <div class="container">
        <TheLoader v-if="isLoading"/>
        <p v-else-if="error" class="error-text">{{ error }}</p>
        <play-list v-else :playlist="allPlaylistData" title="Homepage"></play-list>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import PlayList from "../components/PlayList/PlayList.vue";
import { useFetch } from "@/utils/hooks/useFetch";
import {PLAYLIST_URL } from "@/utils/constants";
import TheLoader from "@/components/TheLoader.vue";
const {isLoading,error,serviceCall} = useFetch();
const allPlaylistData  = ref([]);
onMounted(async()=>{
  try{
    const response = await serviceCall(PLAYLIST_URL,{
        method:"GET",
        headers:new Headers({
            'content-type':'application/json'
        })
    });
    allPlaylistData.value = response.data;
  }
  catch(e)
  {
    console.error("Failed to fetch the playlist",e);
  }
})

</script>

<style>

</style>