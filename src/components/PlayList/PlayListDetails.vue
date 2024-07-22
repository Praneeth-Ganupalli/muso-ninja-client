<template>
    <p v-if="error" class="error-text">{{ error }}</p>
    <TheLoader v-if="isLoading"></TheLoader>
    <article v-if="currentPlayList" class="mnj-playlist-details-card">
        <div class="mng-playlist-info">
            <img :src="currentPlayList.coverUrl" :alt="currentPlayList.title" class="mnj-playlist-cover">
            <h1 class="mnj-playlist-title">{{ currentPlayList.title }}</h1>
            <p class="mnj-playlist-owner"> Created By {{ currentPlayList.createdBy?.name }}</p>
            <p class="mnj-playlist-desc">{{ currentPlayList.description }}</p>
            <button v-if="showActionButtons" class="mnj--base-button" @click="handleDeletePlaylist">Delete
                Playlist</button>
        </div>
        <ul type="none" class="mnj-playlist-songs">
            <template v-if="currentPlayList.songs.length">
                <li v-for="(song, idx) in currentPlayList.songs" :key="song.id" class="mnj-playlist-song">
                    <p class="mnj-song-title">{{ song.title }}</p>
                    <div class="mnj-song-action--artist-wrapper">
                        <p class="mnj-song-artist">{{ song.artist }}</p>
                        <button class="mnj--base-button" @click="handleDeleteSong(song._id, idx)"
                            v-if="showActionButtons">Delete</button>
                    </div>
                </li>
            </template>
            <template v-else>
                <li>No Songs have been added yet</li>
            </template>
            <li v-if="showActionButtons && !showAddSongForm" @click="toggleAddSongForm"><button
                    class="mnj--base-button">Add
                    Song</button></li>
            <div class="mnj-addsong-form" v-if="showAddSongForm">
                <AddSongForm :playlist-id="currentPlayList._id" @songs-updated="handleUpdatedSongs" />
            </div>
        </ul>

    </article>

</template>

<script setup>
/* eslint-disable */
import { useRoute, useRouter } from "vue-router";
import { useFetch } from "@/utils/hooks/useFetch";
import { PLAYLIST_URL } from "@/utils/constants";
import { ref, onMounted, computed, inject } from "vue";
import { useStore } from "vuex";
import TheLoader from "../TheLoader.vue"
import AddSongForm from "../Forms/AddSongForm.vue";
const store = useStore();
const userInfo = store.getters['user/userInfo'];
const route = useRoute();
const router = useRouter();
const playListName = route.params.playListName;
const showAddSongForm = ref(false);
const currentPlayList = ref(null);
const showToastMessage = inject('showToast');
const showActionButtons = computed(() => {
    let isAuthorized = false;
    if (currentPlayList.value && userInfo && currentPlayList.value.createdBy?._id === userInfo.id) {
        isAuthorized = true;
    }
    return isAuthorized;
})
const { serviceCall, isLoading, error } = useFetch();
onMounted(async () => {
    try {
        const response = await serviceCall(`${PLAYLIST_URL}/${playListName}`, { method: "GET" });
        currentPlayList.value = response.data;
    }
    catch (e) {
        console.log("Error fetching the Playlist", e);
    }
})
const toggleAddSongForm = () => {
    showAddSongForm.value = !showAddSongForm.value;
}
const handleUpdatedSongs = (newSongs) => {
    currentPlayList.value.songs = newSongs;
    toggleAddSongForm();
    showToastMessage({
        message: 'Song Added',
        variant: 'success'
    })
}
const handleDeletePlaylist = async () => {
    if (window.confirm('Are you sure you want to delete?')) {
        try {
            await serviceCall(`${PLAYLIST_URL}/${currentPlayList.value._id}`, {
                method: "DELETE"
            });
            router.replace("/");
            showToastMessage({
                message: 'Playlist deleted',
                variant: 'success'
            })
        }
        catch (e) {
            showToastMessage({
                message: e.message,
                variant: 'error'
            })
        }
    }
}
const handleDeleteSong = async (songId, songIndex) => {
    try {
        await serviceCall(`${PLAYLIST_URL}/${currentPlayList.value._id}/song/${songId}/removeSong`, {
            method: "DELETE"
        });
        currentPlayList.value.songs.splice(songIndex, 1);
        showToastMessage({
            message: 'Song Deleted',
            variant: 'success'
        })
    }
    catch (e) {
        showToastMessage({
            message: e.message,
            variant: 'error'
        })
    }
}
</script>

<style scoped>
img.mnj-playlist-cover {
    border-radius: 6px;
    height: 350px;
    width: 350px;
}

ul.mnj-playlist-songs {
    width: 80%;
}

article.mnj-playlist-details-card {
    display: flex;
    margin: 1rem;
    padding: 2rem;
    gap: 1rem;
}

div.mnj-song-action--artist-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mng-playlist-info>* {
    margin-bottom: 1rem;
}

.mnj-playlist-title {
    font-size: 3rem;
    color: #4f515a;
}

p.mnj-playlist-owner {
    color: #ccc;
    font-weight: bold;
}

li.mnj-playlist-song {
    color: #4f515a;
    padding: 1rem;
    font-size: 14px;
}

li.mnj-playlist-song::after {
    content: "";
    height: 8px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: inline-block;

}

.mnj--base-button {
    margin: 0.5rem 0;
    background-color: #333;
    color: #fff;
}

p.mnj-song-title {

    margin-bottom: 0.35rem;
}

p.mnj-song-artist {
    opacity: 0.75;
}

.mnj-addsong-form form {
    margin: 0.5rem !important;
}

@media screen and (max-width:678px) {
    article.mnj-playlist-details-card {
        padding: 0.25rem;
        flex-direction: column;
    }

    ul.mnj-playlist-songs {
        width: 100%;
    }

    .mnj-addsong-form form {
       width:60vw;
    }
}
</style>