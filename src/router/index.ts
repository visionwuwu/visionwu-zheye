import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import createMessage from '../components/createMessage'

const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
const Register = () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
const ColumnDetail = () => import(/* webpackChunkName: "ColumnDetail" */ '../views/ColumnDetail.vue')
const CreatePost = () => import(/* webpackChunkName: "CreatePost" */ '../views/CreatePost.vue')
const PostDetail = () => import(/* webpackChunkName: "PostDetail" */ '../views/PostDetail.vue')
const EditProfile = () => import(/* webpackChunkName: "EditProfile" */ '../views/EditProfile.vue')
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'Home',
      path: '/home',
      component: Home
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      name: 'Register',
      path: '/register',
      component: Register,
      meta: { redirectAlreadyLogin: true }
    },
    {
      name: 'ColumnDetail',
      path: '/column/:id',
      component: ColumnDetail
    },
    {
      name: 'CreatePost',
      path: '/create',
      component: CreatePost,
      meta: {
        requiredLogin: true
      }
    },
    {
      name: 'PostDetail',
      path: '/post/:id',
      component: PostDetail,
      meta: {
        requiredLogin: true
      }
    },
    {
      name: 'EditProfile',
      path: '/editProfile',
      component: EditProfile,
      meta: {
        requiredLogin: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.user.isLogin) {
    if (store.state.token) {
      store.dispatch('fetchCurrentUser')
        .then(() => {
          if (to.meta.redirectAlreadyLogin) {
            next('/')
          } else {
            next()
          }
        }).catch((error) => {
          console.log(error)
          createMessage({
            type: 'danger',
            message: 'error'
          })
          store.commit('logout')
          if (to.meta.requiredLogin) {
            next('/login')
          } else {
            next()
          }
        })
    } else {
      if (to.meta.requiredLogin) {
        next('/login')
      } else {
        next()
      }
    }
  } else {
    if (to.meta.redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
