import {Input, Button, Center, Collapse, ICollapseProps, Result, Skeleton, Typography, Space} from '@mparticle/aquarium'
import {MpBrandSecondary3} from '@mparticle/aquarium/dist/style.ts'
import {useState} from 'react'
import Markdown from 'react-markdown'
import {AssistApi} from 'src/api/AssistApi.ts'
import {InsightTypes} from 'src/constants/InsightTypes.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewInsights() {
  const { diff, link } = useReviewStore()

  return <>
    {diff &&
     <Collapse
       bordered={false}
       style={{ background: 'white' }}
       items={getItems()}
     />}
  </>

  function getItems(): ICollapseProps['items'] {
    return InsightTypes.map(insight => {
      const [isInsightLoading, setIsInsightLoading] = useState<boolean>(false)
      const [isInsightError, setIsInsightError] = useState<boolean>(false)
      const [aiInsight, setAiInsight] = useState<string>()
      const [customPrompt, setCustomPrompt] = useState<string>()
      const isCustomReview = insight.id === 'custom'

      return {
        key: insight.id,
        className: 'reviewInsights__item',
        onClick: loadInsight,
        label: <InsightLabel/>,
        children: <InsightBody/>,
        style: {
          marginBottom: 24,
          background: MpBrandSecondary3,
          borderRadius: 6,
          border: 'none',
        },
      }

      function InsightLabel() {
        return (<>
          <Typography.Text strong>{insight.display} insights</Typography.Text>
        </>)
      }

      function InsightBody() {
        if (isInsightLoading) return <Center><Skeleton/></Center>

        if (isInsightError) {
          return <Result status="error" title="Something went wrong, please try again later."
                         extra={<Button onClick={e => { loadInsight() }}>Reload {insight.display} insights</Button>}/>
        }

        return isCustomReview && !aiInsight ?
               <CustomReviewInsight/> :
               <Markdown>{aiInsight}</Markdown>
      }

      function CustomReviewInsight() {
        return <>
          <Space>
            <Input value={customPrompt} onPressEnter={submit} onChange={e => setCustomPrompt(e.target.value)} autoFocus/>
            <Button onClick={submit} loading={isInsightLoading}>Submit</Button>
          </Space>
        </>

        async function submit(): Promise<void> {
          setIsInsightLoading(true)
          setAiInsight(await AssistApi.getCustomInsight(link, customPrompt ?? ''))
          setIsInsightLoading(false)
        }
      }

      async function loadInsight(): Promise<void> {
        if (aiInsight) return
        if (isCustomReview) return

        setIsInsightLoading(true)
        setIsInsightError(false)

        try {
          const response = await AssistApi.getInsight(link, insight.id)
          setAiInsight(response)

        } catch (e) {
          setIsInsightError(true)
        } finally {
          setIsInsightLoading(false)
        }
      }

    })
  }

}
