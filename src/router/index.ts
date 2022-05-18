import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "HomePage",
    component: () => import("@/views/home-page.vue"),
    children: [
      {
        path: "/discover",
        name: "discover",
        component: () => import("@/views/discover/index"),
        meta: {
          menu: "discover",
          keepAlive: true
        }
      },
      {
        path: "/music",
        name: "music",
        meta: {
          menu: "music"
        },
        component: () => import("@/views/music/index")
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/video/index"),
        meta: {
          menu: "video",
          title: "视频",
          keepAlive: false
        }
      },
      {
        path: "/playList",
        name: "playList",
        component: () => import("@/views/playList/index"),
        meta: {
          menu: "playList",
          title: "歌单列表",
          keepAlive: false
        }
      }
    ]
  },
  { path: "/", redirect: { name: "discover" } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
