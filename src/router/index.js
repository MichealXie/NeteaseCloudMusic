import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/rank'
import Home from '@/components/home/home'
import Recommend from '@/components/recommend/recommend'
import SongLists from '@/components/song-lists/song-lists'
import Singer from '@/components/singer/singer'
import Search from '@/components/search/search'
import SongDetails from '@/components/song-list-detail/song-list-detail'
import Album from '@/components/album/album'


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
          component: SongLists
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
    {
      path: '/song-details/:id',
      component: SongDetails,
    },
    {
      path: '/album/:id',
      component: Album
    }
  ],
  mode: "history"
})
