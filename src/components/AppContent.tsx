import {Button, Dropdown, Skeleton, Space, Typography} from '@mparticle/aquarium'
import {ReviewDiff} from 'src/components/ReviewDiff.tsx'
import {ReviewInput} from 'src/components/ReviewInput.tsx'
import {ReviewOrder} from 'src/components/ReviewOrder.tsx'
import {ReviewInsights} from 'src/components/ReviewInsights.tsx'
import {AiTypes} from 'src/constants/AiTypes.ts'
import {useAppStateStore} from 'src/stores/AppStateStore.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export const AppContent = () => {
  const { isLoading } = useAppStateStore()
  const {
    diff,
    isShowingDiff,
    isShowingOrder,
    isShowingInsights,
    setIsShowingDiff,
    setIsShowingOrder,
    setIsShowingInsights
  } = useReviewStore()
  return <>
    <div className="app__content">

      <Space direction="vertical" style={{ width: '100%', height: '100%' }} size="large">
        <ReviewInput/>
        {isLoading ? <Skeleton/> :

         diff &&
         <span className="reviewDiff__diffControls">
           <Button onClick={e => setIsShowingDiff(!isShowingDiff)}>
             <Typography.Text>{isShowingDiff ? 'Hide' : 'View'} Diff</Typography.Text>
           </Button>

           <Button onClick={e => setIsShowingOrder(!isShowingOrder)}>
             <Typography.Text>{isShowingOrder ? 'Hide' : 'View'} File Order</Typography.Text>
           </Button>

           <Button onClick={e => setIsShowingInsights(!isShowingInsights)}>
             <Typography.Text>{isShowingInsights ? 'Hide' : 'View'} Prediction Insights</Typography.Text>
           </Button>

           <Dropdown menu={{ items: AiTypes }}><Button>Change Model</Button></Dropdown>
         </span>}


        {isShowingDiff && <ReviewDiff/>}
        {isShowingOrder && <ReviewOrder/>}
        {isShowingInsights && <ReviewInsights/>}
      </Space>
    </div>
  </>
}
