<template>
    <router-link :to="`/playlists/${props.item.slug}`" class="mnj-playlist-routing">
        <div class="mnj mnj-playlist-card">
            <img :src="props.item.coverUrl" :alt="props.item.title" class="mnj-playlist-cover">
            <div class="mnj-playlist-info">
                <h3 class="mnj-playlist-title">{{ props.item.title }}</h3>
                <h4 class="mnj-playlist-owner">Created By {{ props.item.createdBy?.name }}</h4>
            </div>
            <div class="mnj-song-count">{{ props.item.songsCount }}</div>
        </div>
    </router-link>

</template>

<script setup>
import { defineProps } from "vue"
const props = defineProps({
    item: {
        type: Object,
        default: () => ({
            title: '',
            createdBy: '',
            songsCount: 0,
            coverUrl: '',
            id: '',
            slug: ''
        })
    }
})
</script>

<style scoped>
a.mnj-playlist-routing
{
    text-decoration: none;
    color: #333;
}
img.mnj-playlist-cover {
    height: 100px;
    width: 150px;
    border-radius: 6px;
}

.mnj-playlist-card {
    background-color: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    margin:1rem 0;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s;
}

.mnj-playlist-card:hover {
    scale: 1.05;
    margin: 1.5rem;
}

.mnj-song-count {
    margin-left: auto;
}

.mnj-playlist-title,
.mnj-playlist-owner {
    font-weight: normal;
    color: #555;
}
@media screen and (max-width:678px) {
    .mnj-playlist-info
    {
        font-size: 12px;
    }
}
</style>