import VueCookies from "vue-cookies"
export const saveUserSession=(userData)=>{
    VueCookies.set("accessToken",userData.token,'1d');
    localStorage.setItem("userInfo",JSON.stringify(userData.userInfo));
}
export const isLoggedIn = ()=>{
    return VueCookies.get("accessToken");
}
export const logoutUser = ()=>{
    VueCookies.remove('accessToken');
    localStorage.removeItem('userInfo');
}
export const getSavedUserInfo=()=>{
    return JSON.parse(localStorage.getItem("userInfo")) || null;
}