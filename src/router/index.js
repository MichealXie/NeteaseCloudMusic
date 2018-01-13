import Vue from 'vue'
import Router from 'vue-router'
// import Rank from '@/components/rank/rank'
// import Home from '@/components/home/home'
// import Recommend from '@/components/recommend/recommend'
// import SongLists from '@/components/song-lists/song-lists'
// import Singer from '@/components/singer/singer'
// import Search from '@/components/search/search'
// import SongDetails from '@/components/song-list-detail/song-list-detail'
// import Album from '@/components/album/album'
// import Player from '@/components/player/player'

// 代码分离, 不知能不能用 async 写( function 不大好加载  ) 其实差不多
const Rank = (reslove) => {
  import('@/components/rank/rank').then((module) => {
    reslove(module)
  })
}
const Home = (reslove) => {
  import('@/components/home/home').then((module) => {
    reslove(module)
  })
}
const Recommend = (reslove) => {
  import('@/components/recommend/recommend').then((module) => {
    reslove(module)
  })
}
const SongLists = (reslove) => {
  import('@/components/song-lists/song-lists').then((module) => {
    reslove(module)
  })
}
const Singer = (reslove) => {
  import('@/components/singer/singer').then((module) => {
    reslove(module)
  })
}
const Search = (reslove) => {
  import('@/components/search/search').then((module) => {
    reslove(module)
  })
}
const SongDetails = (reslove) => {
  import('@/components/song-list-detail/song-list-detail').then((module) => {
    reslove(module)
  })
}
const Album = (reslove) => {
  import('@/components/album/album').then((module) => {
    reslove(module)
  })
}
const Player = (reslove) => {
  import('@/components/player/player').then((module) => {
    reslove(module)
  })
}

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
    },
    {
      path: '/player',
      component: Player
    }
  ],
  mode: "history"
})
