<template>
  <BaseForm :title="'Add a New Song'" :btnText="'Add'" :isLoading="isLoading" @formSubmit="handleAddSong">
        <input type="text" placeholder="Song Title" required v-model="title">
        <input type="text" placeholder="Artist" required v-model="artist">
        <p v-if="error" class="error-text">{{ error }}</p>
   </BaseForm>
</template>

<script setup>
import { useFetch } from "@/utils/hooks/useFetch";
import BaseForm from "./BaseForm.vue";
import { ref,defineProps,defineEmits } from "vue";
import { PLAYLIST_URL } from "@/utils/constants";
const title = ref('');
const artist = ref('');
const props = defineProps(['playlistId']);
const emits = defineEmits(['songsUpdated']);
const {isLoading,error,serviceCall} = useFetch();
const handleAddSong = async()=>{
    try{
        const url = `${PLAYLIST_URL}/${props.playlistId}/song/addSong`;
        const options={
            method:"PATCH",
            body:JSON.stringify({
                title:title.value,
                artist:artist.value
            })
        }
        const response = await serviceCall(url,options);
        emits('songsUpdated',response.data.songs || []);
    }
    catch(e)
    {
        console.error(e.message);
    }
}
</script>

<style>

</style>