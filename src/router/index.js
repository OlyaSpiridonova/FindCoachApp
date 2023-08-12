import { createRouter, createWebHistory } from "vue-router";

import CoachContact from "@/pages/request/CoachContact.vue";
import CoachDetails from "@/pages/coach/CoachDetails.vue";
import CoachList from "@/pages/coach/CoachList.vue";
import CoachRegister from "@/pages/coach/CoachRegister.vue";
import RequestReceived from "@/pages/request/RequestReceived.vue";
import UserAuth from "@/pages/auth/UserAuth.vue";
import NotFound from "@/pages/NotFound.vue";
import store from "@/store/index";

const routes = [
  { path: "/", redirect: "/coach" },
  { path: "/coach", component: CoachList },
  {
    path: "/coach/:id",
    component: CoachDetails,
    props: true,
    children: [{ path: "contact", component: CoachContact }],
  },
  {
    path: "/registration",
    component: CoachRegister,
    meta: { requiresAuth: true },
  },
  {
    path: "/requests",
    component: RequestReceived,
    meta: { requiresAuth: true },
  },
  { path: "/auth", component: UserAuth, meta: { requiresAnuth: true } },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresAnuth && store.getters.isAuthenticated) {
    next("/coach");
  } else {
    next();
  }
});

export default router;
