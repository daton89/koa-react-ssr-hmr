import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'

import './styles/styles.sass'
import AppRouter from './app/AppRouter'

const development = process.env.NODE_ENV === 'development'
const render = module.hot && development ? ReactDOM.render : ReactDOM.hydrate

loadableReady(() => {
  const root = document.getElementById('root')
  render(<AppRouter />, root)
})

if (module.hot && development) {
  module.hot.accept()
}
