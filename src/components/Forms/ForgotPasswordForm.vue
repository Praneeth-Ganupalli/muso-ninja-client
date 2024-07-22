<template>
    <BaseForm title="Forgot Password" :btnText="formBtnText" :isLoading="isLoading" @formSubmit="handleFormSubmit">
        <input type="email" placeholder="Email" name="email" id="email" required v-model="userEmail"
            :disabled="step !== 'find'">
        <div v-if="step === 'access'" class="mnj-acscode-wrap">
            <label for="accessCode">Please Enter Code Sent to your Email</label>
            <input type="password" autocomplete="new-password" placeholder="Access Code" name="accessCode" required
                id="accessCode" v-model="accessCode">
        </div>
        <div v-if="step === 'reset'" class="mnj-acscode-wrap">
            <label for="password">Please Enter New password</label>
            <input type="password" autocomplete="new-password" placeholder="New password" name="password" required
                id="password" v-model="newPass">
        </div>
        <p v-if="error" class="error-text">{{ error }}</p>
    </BaseForm>
</template>
<script setup>
import { computed, ref, inject } from 'vue';
import BaseForm from './BaseForm.vue';
import { FORGOT_PASSWORD_URL, RESET_PASSWORD_URl } from "@/utils/constants"
import { VALIDATE_ACCESS_CODE_URL } from '@/utils/constants';
import { useFetch } from '@/utils/hooks/useFetch';
import { useRouter } from 'vue-router';
const step = ref('find');
const accessCode = ref(null);
const newPass = ref('');
const userEmail = ref('');
const router = useRouter();
const { isLoading, error, serviceCall } = useFetch();
const showToast = inject('showToast');
const formBtnText = computed(() => {
    return step.value;
})
const sendResetToken = async () => {
    try {
        await serviceCall(FORGOT_PASSWORD_URL, {
            method: "POST",
            body: JSON.stringify({
                "email": userEmail.value
            }),
            headers: new Headers({
                'content-type': 'application/json'
            })
        })
        step.value = 'access';
    }
    catch (e) {
        console.error(e.message);
    }
}
const validateAccessCode = async () => {
    try {
        await serviceCall(VALIDATE_ACCESS_CODE_URL, {
            method: "POST",
            body: JSON.stringify({
                "email": userEmail.value,
                'accessCode': accessCode.value.trim()
            }),
            headers: new Headers({
                'content-type': 'application/json'
            })
        })
        step.value = 'reset';
    }
    catch (e) {
        console.error(e.message);
    }
}
const handleFormSubmit = () => {
    if (step.value === 'find') {
        sendResetToken();
    }
    else if (step.value === 'access') {
        validateAccessCode();
    }
    else {
        resetPassword();
    }
}
const resetPassword = async () => {
    try {
        await serviceCall(RESET_PASSWORD_URl, {
            method: "POST",
            body: JSON.stringify({
                "email": userEmail.value,
                'accessCode': accessCode.value,
                'password': newPass.value
            }),
            headers: new Headers({
                'content-type': 'application/json'
            })
        })
        showToast({
            message: 'Password Reset Done Login again to continue',
            variant: 'success'
        })
        router.push("/login");
    }
    catch (e) {
        console.error(e.message);
    }
}
</script>
<style scoped>
div.mnj-acscode-wrap {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
</style>