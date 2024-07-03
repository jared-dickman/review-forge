import {useEffect} from 'react'
import {AppContent} from 'src/components/AppContent.tsx'
import {AppNavigation} from 'src/components/AppNavigation.tsx'
import 'src/styles/app.css'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

function App() {
  const { setLink } = useReviewStore()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const prUrl = urlParams.get('prUrl')
    if (prUrl) setLink(prUrl)
  }, [])

  return (<>
    <AppNavigation/>
    <AppContent/>
  </>)
}

export const AppName = 'Review Forge' as const

export default App
