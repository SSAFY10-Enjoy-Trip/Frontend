import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import FindPasswordPage from '@/components/FindPasswordPage.vue'
import ManagePage from '@/views/ManagePage.vue'
import BoardMain from '@/views/BoardMain.vue'
import BoardAll from '@/views/BoardAll.vue'
import BoardFollow from '@/views/BoardFollow.vue'
import BoardHot from '@/views/BoardHot.vue'
import BoardDetail from '@/views/BoardDetail.vue'
import BoardInsert from '@/views/BoardInsert.vue'

const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BoardMain
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
    },
    {
      path: '/findPassword',
      name: 'FindPassword',
      component: FindPasswordPage
    },
    {
      path: '/managePage',
      name: 'ManagePage',
      component: ManagePage,
    },
    {
      path: '/boardList',
      name: 'BoardList',
      component: BoardMain
    },
    {
      path: '/bordAll',
      component: BoardAll
    },
    {
      path: '/bordFollow',
      component: BoardFollow
    },
    {
      path: '/bordHot',
      component: BoardHot
    },
    {
      path: '/bordInsert',
      name: 'bordInsert',
      component: BoardInsert
    },
    {
      path: '/bordDetail/:boardNum',
      name: 'bordDetail',
      component: BoardDetail
    }
  ]
})

// router.beforeEach((to, from, next) => {
//     if(sessionStorage.getItem('login') == 'success' || to.path == '/' || to.name == 'Login' || to.name == 'Register'){
//         next();
//     }else{
//         console.log('router - beforeEach - else');
//         // return false; // 단순히 이동 거부
//         next('/login');
//         // next({name:'Login'});
//     }
// });

export default router
