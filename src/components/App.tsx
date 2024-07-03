import {useEffect} from 'react'
import {AssistApi} from 'src/api/AssistApi.ts'
import {ReviewApi} from 'src/api/ReviewApi.ts'
import {AppContent} from 'src/components/AppContent.tsx'
import {AppNavigation} from 'src/components/AppNavigation.tsx'
import 'src/styles/app.css'
import {useAppStateStore} from 'src/stores/AppStateStore.ts'
import {useCommentsStore} from 'src/stores/CommentsStore.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

function App() {
  const { setAiComments } = useCommentsStore()
  const { setLink, setDiff } = useReviewStore()
  const { setIsLoading } = useAppStateStore()

  useEffect(() => { init() }, [])

  return (<>
    <AppNavigation/>
    <AppContent/>
  </>)

  async function init(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search)
    const prUrl = urlParams.get('prUrl')

    if (prUrl) {
      setLink(prUrl)
      setIsLoading(true)
      try {
        const diff = await ReviewApi.getDiff(prUrl)
        const aiComments = await AssistApi.getAiComments(prUrl)
        setDiff(diff)
        setAiComments(aiComments)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
  }
}


export const AppName = 'Review Forge' as const

export default App
