import { createRouter, createWebHistory } from "vue-router";
import { certCookies } from "../plugins/cookies";
import routes from'./routes';

// const routes = [
//   {
//     path: "/",
//     name: "/",
//     redirect: "/dashboard-default",
//   },
 
//   {
//     path: "/virtual-reality",
//     name: "Virtual Reality",
//     component: VirtualReality,
//   },
//   {
//     path: "/rtl-page",
//     name: "RTL",
//     component: RTL,
//   },
  
 
  
// ];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "",
  linkExactActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next,)=>{
  const { id } = certCookies();
  if(to.matched.some(({meta})=>meta.auth) && !id){
    next({name: 'Signin'});
  }else if (to.matched.some(({path})=>path.includes('auth'))&& id) {
    next({name: 'Default'});
  }else{
    next();
  }
});

export default router;
