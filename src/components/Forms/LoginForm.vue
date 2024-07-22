<template>
    <BaseForm title="login" @form-submit="handleLogin" :is-loading="isLoading" btn-text="Login">
        <input type="email" required placeholder="Email" v-model="email">
        <input type="password" required placeholder="Password" minlength="8" v-model="password" autocomplete="new-password">
        <p v-if="error" class="mnj-form-error">{{ error }}</p>
        <router-link to="/forgotPassword" class="mnj-forgot-pass">Forgot Password?</router-link>
    </BaseForm>
</template>

<script setup>
import BaseForm from './BaseForm.vue';
import { useFetch } from '@/utils/hooks/useFetch';
import {ref,inject} from "vue"
import { useRouter } from 'vue-router';
import { saveUserSession } from '@/utils/auth';
import { LOGIN_URL } from '@/utils/constants';
import { useStore } from 'vuex';
const email = ref("");
const password = ref("");
const store = useStore();
const router = useRouter();
const {error,isLoading,serviceCall} = useFetch();
const showToast = inject('showToast');
const handleLogin = async () => {
    const url = LOGIN_URL;
    const payload={
        email:email.value,
        password:password.value,
    }
    const options={
        method:"POST",
        body:JSON.stringify(payload),
        headers:new Headers({
            'content-type':'application/json'
        })
    }
    try{
        const response = await serviceCall(url,options);
        saveUserSession({userInfo:response.data,token:response.token});
        store.commit("user/setUserInfo",response.data);
        showToast({
            message:'Login Successful',
            variant:'success'
        })
        router.push("/");
    }
    catch(e)
    {
        console.error("Error Loging in user",e.message)
    }
    

}
</script>
