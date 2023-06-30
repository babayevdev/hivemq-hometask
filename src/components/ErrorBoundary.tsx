import React, { Component, ErrorInfo, ReactNode } from 'react'
import Center from './Center'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Center>
          <h1>Sorry.. there was an error</h1>
        </Center>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
