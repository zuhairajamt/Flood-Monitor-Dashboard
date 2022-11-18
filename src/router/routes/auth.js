const auth = {
  path: "/",
  name: "Home",
  component: ()=> import('@/views/Dashboard/Default.vue'),
  children: [
    {
      path: "/auth/signin",
      name: "Signin",
      component: () => import("@/views/Auth/Signin.vue"),
    },
    {
      path: "/auth/signup",
      name: "Signup",
      component: () => import("@/views/Auth/Signup.vue"),
    },
  ],
};
export default auth;
