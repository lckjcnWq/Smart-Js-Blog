import Vue from 'vue'
import Router from 'vue-router'


//异步加载
const Login = () => import('@/components/login')
const Index = () => import('@/components/index')
const Relblog = () => import('@/components/dashboard/relblog')
const Blog = () => import('@/components/fclass/blog')
const Fclass = () => import('@/components/fclass/fclass')
const Comment = () => import('@/components/fclass/comment')
const Friend = () => import('@/components/fclass/friend')
const Tag = () => import('@/components/fclass/tag')
const Out = () => import('@/components/system/out')
const Password = () => import('@/components/system/password')
const System = () => import('@/components/system/system')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/Relblog',
          name: 'Relblog',
          component: Relblog
        },
        {
          path: '/Blog',
          name: 'Blog',
          component: Blog
        },
        {
          path: '/Fclass',
          name: 'Fclass',
          component: Fclass
        },
        {
          path: '/Comment',
          name: 'Comment',
          component: Comment
        },
        {
          path: '/Friend',
          name: 'Friend',
          component: Friend
        },
        {
          path: '/Tag',
          name: 'Tag',
          component: Tag
        },
        {
          path: '/Out',
          name: 'Out',
          component: Out
        },
        {
          path: '/Password',
          name: 'Password',
          component: Password
        },
        {
          path: '/System',
          name: 'System',
          component: System
        }
      ]
    },
  ]
})
