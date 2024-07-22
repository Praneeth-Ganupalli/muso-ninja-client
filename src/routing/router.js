import {createRouter,createWebHistory} from "vue-router";
import CreatePlaylist from "../pages/CreatePlaylist.vue"
import MyPlaylist from "../pages/MyPlaylist.vue"
import LoginPage from "../pages/LoginPage.vue";
import SignupPage from "../pages/SignupPage.vue";
import AllPlaylists from "../pages/AllPlaylists.vue";
import PlayListDetails from "../pages/PlaylistDetails.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import { isLoggedIn as isSessionActive } from "@/utils/auth";
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            component:AllPlaylists,
            meta:{
                requireAuth:true
            }
        },
        {
            path:"/playlists/create",
            component:CreatePlaylist,
            meta:{
                requireAuth:true
            }
        },
        {
            path:"/playlists/me",
            component:MyPlaylist,
            meta:{
                requireAuth:true
            }
        },
        {
            path:"/playlists/:playListName",
            component:PlayListDetails,
            meta:{
                requireAuth:true
            }
        },
        {
            path:"/login",
            component:LoginPage,
            meta:{
                requireAuth:false
            }
        },
        {
            path:"/signup",
            component:SignupPage,
            meta:{
                requireAuth:false
            }
        },
        {
            path:'/forgotPassword',
            component:ForgotPassword,
            meta:{
                requireAuth:false
            }
        }
    ]
})
router.beforeEach((to,from,next)=>{
    const isLoggedIn = isSessionActive();
    if(!to.meta.requireAuth && isLoggedIn)
    {
        next(from?.path || '/');
    }
    else if(to.meta.requireAuth && !isLoggedIn)
    {
        next("/login");
    }
    else{
        next();
    }
})
export default router