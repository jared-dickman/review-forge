import {Checkbox, Flex, Typography} from '@mparticle/aquarium'
import {useEffect} from 'react'
import {useCommentsStore} from 'src/stores/CommentsStore.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewOrder() {
  const { fileOrder, diff, fileOrderReason, setFileOrder, setFileOrderReason } = useReviewStore()
  const { aiComments, } = useCommentsStore()

  useEffect(sortFiles, [diff])

  return <>
    {fileOrder && diff &&
     <Flex vertical className="reviewOrder">
       <span>
         <Typography.Title level={5} type="secondary" style={{ marginTop: 0 }}>{fileOrderReason}</Typography.Title>

         <div className="reviewFiles__checkboxScroll">
           <Checkbox.Group className="reviewFiles__checkboxGroup"
                           options={fileOrder.map(fileName => {
                            const pieces = fileName.split('b/');
                            return { label: pieces[pieces.length - 1], value: fileName }
                          })}/>
         </div>
       </span>

     </Flex>}
  </>

  function sortFiles(): void {
    if (!aiComments) return
    const fileOrder = aiComments.files.map(file => file.diffFile)
    setFileOrder(fileOrder)
    setFileOrderReason(aiComments.orderingReason)
  }
}
