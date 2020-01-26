import Loadable from 'react-loadable'
import loadable from '@loadable/component'

import AppRoot from './containers/AppRoot'
// import { Home } from './components/Home/Home'
// import About from './components/About/About'
// import { NotFound } from './components/NotFound'

// function Loading(props) {
//   if (props.error) {
//     return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
//   } else {
//     return <div>Loading...</div>;
//   }
// }

// const Home = Loadable({
//   loader: () => import('./components/Home/Home'),
//   loading: Loading
// })

const Home = loadable(() => import('./components/Home/Home'))
const About = loadable(() => import('./components/About/About'))
const NotFound = loadable(() => import('./components/NotFound'))

export default [
  {
    component: AppRoot,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/about',
        component: About,
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
]
