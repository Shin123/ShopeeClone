import { Component, ErrorInfo, ReactNode } from 'react'
import path from 'src/constants/path'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error: ', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='flex h-screen w-full items-center justify-center bg-gray-200 px-16 md:px-0'>
          <div className='flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-8 shadow-2xl md:px-8 lg:px-24'>
            <p className='text-6xl font-bold tracking-wider text-gray-300 md:text-7xl lg:text-9xl'>500</p>
            <p className='mt-4 text-2xl font-bold tracking-wider text-gray-500 md:text-3xl lg:text-5xl'>Error!</p>
            <a
              href={path.home}
              className='mt-6 flex items-center space-x-2 rounded bg-orange px-4 py-2 text-gray-100 transition duration-150 hover:bg-orange/80'
              title='Return Home'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                  clipRule='evenodd'
                />
              </svg>
              <span>Return Home</span>
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
