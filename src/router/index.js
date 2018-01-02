import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/rank'
import Home from '@/components/home/home'
import Recommend from '@/components/recommend/recommend'
import songLists from '@/components/song-lists/song-lists'
import Singer from '@/components/singer/singer'
import Search from '@/components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/recommend'
    },
    {
      path: '/home',
      component: Home,
      children:[
        {
          path: 'recommend',
          component: Recommend
        },
        {
          path: 'song-lists',
          component: songLists
        },
        {
          path: 'rank',
          component: Rank
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
  ],
  mode: "history"
})
