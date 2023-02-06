import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

// React.StrictMode is a development mode that enables more console.logs,
// warnings, it provides more strict rules for development

// StrictMode also messes up with componentDidMount sometimes!
// It will make componentDidMount launch twice :(
