import { createRouter, createWebHistory } from "vue-router";

import CoachContact from "@/pages/request/CoachContact.vue";
import CoachDetails from "@/pages/coach/CoachDetails.vue";
import CoachList from "@/pages/coach/CoachList.vue";
import CoachRegister from "@/pages/coach/CoachRegister.vue";
import RequestReceived from "@/pages/request/RequestReceived.vue";
import NotFound from "@/pages/NotFound.vue";

const routes = [
  { path: "/", redirect: "/coach" },
  { path: "/coach", component: CoachList },
  {
    path: "/coach/:id",
    component: CoachDetails,
    props: true,
    children: [{ path: "contact", component: CoachContact }],
  },
  { path: "/registration", component: CoachRegister },
  { path: "/requests", component: RequestReceived },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
