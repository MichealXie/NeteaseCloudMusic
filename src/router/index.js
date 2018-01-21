import Vue from 'vue'
import Router from 'vue-router'

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
const myProfile = (reslove) => {
  import('@/components/my-profile/my-profile').then((module) => {
    reslove(module)
  })
}
const Login = (reslove) => {
  import('@/components/login/login').then((module) => {
    reslove(module)
  })
}
const phoneLogin = (reslove) => {
  import('@/components/phone-login/phone-login').then((module) => {
    reslove(module)
  })
}
const Comments = (reslove) => {
  import('@/components/Comments/Comments').then((module) => {
    reslove(module)
  })
}
// comments 不热更新, hack 一下...妈的什么鸡巴 bug
const Pinglun = (reslove) => {
  import('@/components/pinglun/pinglun').then((module) => {
    reslove(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/my-profile',
      component: myProfile
    },
    {
      path:'/login',
      component: Login,
    },
    {
      path: '/phone-login',
      component: phoneLogin
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
    },
    {
      path: '/comments/:id',
      component: Pinglun
    }
  ],
})
