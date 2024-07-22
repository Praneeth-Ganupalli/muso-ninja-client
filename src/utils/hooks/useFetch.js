/* eslint-disable */
import { ref,inject } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { isLoggedIn as getAccessToken,logoutUser } from '../auth';
export function useFetch() {
    const isLoading = ref(false);
    const isError = ref(false);
    const data = ref(null);
    const showToast = inject('showToast');
    const router = useRouter();
    const currentRoute = useRoute();
    const store = useStore();
    const handleUnAuthRequest = () => {
       showToast({
        message:'Session expired please login again',
        variant:'error'
       })
       router.replace('/login');
       store.commit("user/setUserInfo",null);
       logoutUser();
    }
    const isAuthRequired = currentRoute.meta.requireAuth;
    const serviceCall = async (url, options = { method: 'GET' }) => {
        const token = getAccessToken();
        if (isAuthRequired && token) {
            if (!options.headers) options.headers = {};
            const headerOptions = {
                "authorization": `Bearer ${token}`,
            }
            if (!options.isFormdata) {
                headerOptions['content-type'] = 'application/json';
            }
            options.headers = new Headers(headerOptions);
        }
        try {
            isLoading.value = true;
            isError.value = false;
            const response = await fetch(url, options);
            if (response.status === 204) {
                return; // Handle for deletting a resource
            }
            const responseBody = await response.json();

            if (response.status === 401 && isAuthRequired) {
                handleUnAuthRequest();
            }
            if (!response.ok) {
                throw new Error(responseBody.message || 'Something went wrong.')
            }

            data.value = responseBody;
            return responseBody;
        }
        catch (e) {
            isError.value = e.message;
            setTimeout(()=>{
                isError.value = '';
            },5000)
            throw e;
        }
        finally {
            isLoading.value = false;
        }
    }
    return {
        isLoading: isLoading,
        error: isError,
        data: data,
        serviceCall
    }
}

