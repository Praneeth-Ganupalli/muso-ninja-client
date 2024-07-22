<template>
    <div class="container">
        <BaseForm title="Create New Playlist" btnText="Create" :is-loading="isLoading" @form-submit="handleCreatePlaylist">
            <input type="text" v-model="title" placeholder="Playlist title" required>
            <textarea placeholder="Playlist description" rows="2" cols="10" v-model="description"></textarea>
            <label for="coverPhoto">
                Upload playlist cover image
            </label>
            <input type="file" accept="image/*" name="coverPhoto" id="coverPhoto" @change="handleFileChange">
            <p v-if="error" class="error-text">{{ error }}</p>
        </BaseForm>
    </div>
</template>
<script setup>
import BaseForm from '@/components/Forms/BaseForm.vue';
import { useFetch } from '@/utils/hooks/useFetch';
import { ref } from 'vue';
import { PLAYLIST_URL } from '@/utils/constants';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
const title = ref('');
const description = ref('');
const imageCover = ref(null);
const router = useRouter();
const {isLoading,error,serviceCall} = useFetch();
const showToastMessage = inject('showToast');
const handleFileChange = (e)=>{
    imageCover.value = e.target.files[0];
}
const handleCreatePlaylist = async()=>{
    const formData = new FormData();
    formData.append('title',title.value);
    formData.append('description',description.value);
    formData.append('imageCover',imageCover.value);
    try{
        const response = await serviceCall(PLAYLIST_URL,{
            method:"POST",
            body:formData,
            isFormdata:true
        })
        const newPlaylistSlug = response.data.slug;
        showToastMessage({
            message:"Playlist Created..",
            variant:'success'
        })
        router.push("/playlists/"+newPlaylistSlug);
       
    }
    catch(e)
    {
        console.error("unable to create playlist",e);
    }
}
</script>