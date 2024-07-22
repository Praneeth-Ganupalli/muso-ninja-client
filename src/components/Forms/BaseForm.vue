<template>
    <form @submit.prevent="$emit('formSubmit')" class="mnj mnj--base-form" >
        <h2 class="mnj-form-title">{{props.title}}</h2>
        <slot>
        </slot>
        <button type="submit" :disabled="isLoading">{{ !isLoading?props.btnText:'Processing' }}</button>
    </form>
</template>

<script setup>
import { defineProps,defineEmits } from "vue"
const props = defineProps({
    title:{
        type:String,
        required:true
    },
    btnText:String,
    isLoading:{
        type:Boolean,
        default:()=>false
    }
})
defineEmits(['formSubmit']);
</script>

<style>
.mnj--base-form {
    background-color: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 50vw;
    margin: auto;
}

.mnj--base-form input,.mnj--base-form textarea {
    border: none;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.75rem;
    resize: none;
}
.mnj--base-form input:disabled,.mnj--base-form textarea:disabled
{
    background-color: lightgray;
}
.mnj--base-form label
{
    color: #434343;
    font-size: 12px;
}
.mnj--base-form input[type='file']
{
    border-bottom: none;
}
.mnj--base-form input:focus,.mnj--base-form textarea:focus {
    outline: none;
}

.mnj--base-form button[type='submit'] {
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

.mnj--base-form button[type='submit']:hover {
    background-color: #333;
    color: #fff;
}
.mnj-form-title,.mnj--base-form button[type='submit']
{
    text-transform: capitalize;
}
.mnj-form-error
{
    color: red;
    margin-top: 0.5rem;
    font-size: 14px;
}
.mnj-forgot-pass
{
    text-decoration: none;
}
@media screen and (max-width:678px) {
    form.mnj--base-form
    {
        width:73vw;
    }
}
</style>