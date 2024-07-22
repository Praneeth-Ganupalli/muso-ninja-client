<template>
    <div class="container">
        <TheLoader v-if="isLoading"/>
        <p v-else-if="error" class="error-text">{{ error }}</p>
        <PlayList v-else :title="'My Playlists'" :playlist="myPlayListData" />
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import PlayList from "../components/PlayList/PlayList.vue";
import { useFetch } from "@/utils/hooks/useFetch";
import {PLAYLIST_URL } from "@/utils/constants";
import TheLoader from "@/components/TheLoader.vue";
const {isLoading,error,serviceCall} = useFetch();
const myPlayListData  = ref([]);
onMounted(async()=>{
  try{
    const response = await serviceCall(`${PLAYLIST_URL}/myPlaylists`,{
        method:"GET",
        headers:new Headers({
            'content-type':'application/json'
        })
    });
    myPlayListData.value = response.data;
  }
  catch(e)
  {
    console.error("Failed to fetch the playlist",e);
  }
})

</script>
