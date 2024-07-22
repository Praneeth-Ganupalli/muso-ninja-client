<template>
    <Teleport to="#full-screen">
        <div class="loader">
            <span>Loading...</span>
        </div>
    </Teleport>
</template>
<style scoped>
.loader {
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .62);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999999999;
}
</style>