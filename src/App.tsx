import React from 'react'
import MainLayout from './layouts/MainLayout'
import WebClientPage from './features/WebClientPage'
import ErrorBoundary from './components/ErrorBoundary'

import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <MainLayout>
        <WebClientPage />
      </MainLayout>
    </ErrorBoundary>
  )
}

export default App
