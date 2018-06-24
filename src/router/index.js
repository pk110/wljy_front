import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/store'

Vue.use(Router)

// 懒加载组件
const router =  new Router({
  mode:"history",
  routes: [
    {
      // +++++++++++++++++++++ 首页
      path: '/',
      redirect: '/index'
    },
    {
      // +++++++++++++++++++++ 首页
      path: '/Index',
      name:'首页',
      component:  resolve => require(['./../pages/Index/Index'], resolve)
    },{
      // +++++++++++++++++++++ 未来
      path: '/Future',
      name:'未来',
      component:  resolve => require(['./../pages/Future/Future'], resolve),
      children:[
        {
          path:'/Future/lives',
          name:'直播',
          component: resolve => require(['./../pages/lives/lives'],resolve)
        },{
          path:'/Future/news',
          name:'新闻',
          component: resolve => require(['./../pages/news/news'],resolve)
        },{
          path:'/Future/news/:id',
          name:'新闻详情',
          component: resolve => require(['./../pages/news_detail/news_detail'],resolve)
        },{
          path:'/Future/vedioes',
          name:'视频',
          component: resolve => require(['./../pages/vedioes/vedioes'],resolve)
        },{
          path:'/Future/vedioes/:id',
          name:'视频详情',
          component: resolve => require(['./../pages/vedioes_detail/vedioes_detail'],resolve)
        }
      ]

    },{
      // +++++++++++++++++++++ 卡片墙
      path: '/My',
      name:'我的',
      component:  resolve => require(['./../pages/My/My'], resolve)
    }
  ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  store.dispatch('showImg')
  next()
})

router.afterEach((to) => {
  store.dispatch('hiddenImg')
})

export default router;
