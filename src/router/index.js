import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Beranda from "@/views/Beranda.vue";
import Home from "@/components/Home.vue";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  const getUserDataFromSession = JSON.parse(sessionStorage.getItem("DATA"));
  if (!getUserDataFromSession) {
    next();
    return;
  }
  if (
    to.query !== null &&
    to.query !== undefined &&
    to.query.ref !== null &&
    to.query.ref !== undefined
  ) {
    return next(to.query.ref);
  }
  next("/");
};

const ifAuthenticated = async (to, from, next) => {
  const getUserDataFromSession = JSON.parse(sessionStorage.getItem("DATA"));
  if (getUserDataFromSession) {
    return next();
  } else {
    next("/login");
  }
};

function configRoutes() {
  return [
    {
      path: "/",
      redirect: "/beranda",
      name: "User",
      beforeEnter: ifAuthenticated,
      component: Home,
      children: [{ path: "/beranda", name: "Beranda", component: Beranda }],
    },
    {
      path: "/login",
      name: "Login",
      beforeEnter: ifNotAuthenticated,
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      beforeEnter: ifNotAuthenticated,
      component: Register,
    },
  ];
}
const router = new Router({
  mode: "history",
  routes: configRoutes(),
  scrollBehavior: () => ({ y: 0 }),
});
export default router;
