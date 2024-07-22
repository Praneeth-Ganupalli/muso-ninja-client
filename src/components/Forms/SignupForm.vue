
<template>
    <BaseForm title="Sign up" btnText="Sign up" @form-submit="handleSignup" :isLoading="isLoading">
        <input type="text" required placeholder="Display Name" v-model="name">
        <input type="email" required placeholder="Email" v-model="email">
        <input type="password" required placeholder="Password" v-model="password" autocomplete="new-password">
        <p v-if="error" class="mnj-form-error">{{ error }}</p>
    </BaseForm>
</template>
<script setup>

import BaseForm from './BaseForm.vue';
import {useFetch} from '@/utils/hooks/useFetch';
import { ref,inject } from "vue";
import { useRouter } from 'vue-router';
import {SIGN_UP_URL} from "../../utils/constants"
import {saveUserSession} from "../../utils/auth";
import {useStore} from "vuex"
const name = ref("");
const email = ref('');
const password = ref('');
const router = useRouter();
const store = useStore();
const {error,isLoading,serviceCall} = useFetch();
const showToast = inject('showToast');
const handleSignup = async () => {
    const url = SIGN_UP_URL;
    const payload={
        name:name.value,
        email:email.value,
        password:password.value,
        passwordConfirm:password.value
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
            message:'Account created successfully',
            variant:'success'
        })
        router.push("/");
    }
    catch(e)
    {
        console.error("Error signing up user",e.message)
    }
    

}

</script>
