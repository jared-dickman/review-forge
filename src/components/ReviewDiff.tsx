import {Flex, Radio, Typography} from '@mparticle/aquarium'
import {useCallback, useEffect, useMemo} from 'react'
import {Diff, FileData, getChangeKey, GutterOptions, GutterType, Hunk, parseDiff, ViewType} from 'react-diff-view'
import DiffCommentTrigger from 'src/components/Diff/DiffCommentTrigger.tsx'
import {LocalStorageKeys} from 'src/constants/LocalStorageKeys.ts'
import {useDiffComments} from 'src/hooks/useDiffComments.ts'
import {useLocalStorage} from 'src/hooks/useLocalStorage.tsx'
import {AssistedCommentsResponse} from 'src/interfaces/AssistedCommentsResponse'
import {useCommentsStore} from 'src/stores/CommentsStore.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'
import {DiffAiComment} from './Diff/DiffAiComment'

export function ReviewDiff() {
  const { link, diff } = useReviewStore()
  const { aiComments, } = useCommentsStore()

  const [viewType, setViewType] = useLocalStorage<ViewType>(LocalStorageKeys.diffViewType, 'split')
  const [gutterType, setGutterType] = useLocalStorage<GutterType>(LocalStorageKeys.diffGutterType, 'anchor')

  const files = parseDiff(diff).sort(sortByFileOrder)

  const viewTypeOptions = [
    { label: 'Split', value: 'split' },
    { label: 'Unified', value: 'unified' }]

  const gutterTypeOptions = [
    { label: 'None', value: 'none' },
    { label: 'Anchor', value: 'anchor' }]

  const [comments, { addComment, editComment, saveEdit, cancelEdit, deleteComment }] = useDiffComments()

  const renderGutter = useCallback(generateRenderGutter,
                                   [addComment, viewType])

  useEffect(() => { addAiComments(link) }, [diff])

  return <>
    {diff &&
     <Flex vertical className="reviewDiff">

       <div className="reviewDiff__diffControls">
         <div>
           <Typography.Text type="secondary">View Type: </Typography.Text>
           <Radio.Group options={viewTypeOptions}
                        value={viewType}
                        optionType="button"
                        onChange={e => { changeViewType(e.target.value as ViewType) }}/>
         </div>

         <div>
           <Typography.Text type="secondary">Gutter Type: </Typography.Text>
           <Radio.Group options={gutterTypeOptions}
                        value={gutterType}
                        optionType="button"
                        onChange={e => { changeGutterType(e.target.value as GutterType) }}/>
         </div>

       </div>

       <div className="reviewDiff__diffFiles">
         {files.map(renderFile)}
       </div>
     </Flex>}
  </>


  function renderFile(file: FileData) {
    const { oldRevision, newRevision, type, hunks } = file
    return (<>
      <Flex align="center" justify="space-between" className="reviewDiff__fileName">
        <Typography.Text type="secondary">Old Path - {file.oldPath}</Typography.Text>
        <Typography.Text type="secondary">New Path - {file.newPath}</Typography.Text>
      </Flex>

      <Diff key={oldRevision + '-' + newRevision}
            viewType={viewType}
            diffType={type}
            hunks={hunks}
            gutterType={gutterType}
            generateAnchorID={generateAnchorID}
            renderGutter={renderGutter}
            widgets={getWidgets(file)}>
        {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk}/>)}
      </Diff>
    </>)
  }

  function getWidgets(file: FileData) {
    const comments = (aiComments as AssistedCommentsResponse).files.find(prFile => prFile.diffFile.includes(file.newPath))?.comments ?? []
    const commentsPerLine = comments.reduce((previous, currentComment) => {
      return {
        ...previous,
        [currentComment.lineContent.trim()]: currentComment.comment
      }
    }, {})

    const changes = file.hunks.reduce((result, { changes }) => [...result, ...changes], [])
    const commentLines = changes.filter(({ content }) => {
      return commentsPerLine[content.trim()] !== undefined
    })

    return commentLines.reduce(
      (widgets, change) => {
        const changeKey = getChangeKey(change)

        return {
          ...widgets,
          [changeKey]: <DiffAiComment message={commentsPerLine[change.content.trim()]}/>,
        }
      }, {})
  }

  function generateAnchorID(change): string {
    return Math.random().toString()
  }


  function changeViewType(type: ViewType): void {
    setViewType(type)
    localStorage.setItem(LocalStorageKeys.diffViewType, type as string)
  }


  function changeGutterType(type: GutterType): void {
    setGutterType(type)
    localStorage.setItem(LocalStorageKeys.diffGutterType, type as string)
  }

  function generateRenderGutter({ change, side, inHoverState, renderDefault, wrapInAnchor }: GutterOptions) {
    const canComment = inHoverState && (viewType === 'split' || side === 'new')
    if (canComment) return <DiffCommentTrigger change={change} onClick={addComment}/>
    return wrapInAnchor(renderDefault())
  }


  async function addAiComments(link: string): Promise<void> {
    if (!diff) return

    aiComments.files.forEach(file => {
      file.comments.forEach(comment => {
        const content = file.diffFile + comment.comment
        postGeneratedComment(comment.lineNumber, content)
      })
    })


    // const { data } = await AssistApi.analyzePR(link)
    // const payloads = data.map(a => JSON.parse(a.payload))

    // function removeJsonWrap(str: string): string {
    //   return str.substr(8, str.length - 12)
    // }

    function postGeneratedComment(lineNumber: number, content: string) {
      const changeKey = getChangeKey({
                                       type: 'normal',
                                       content: content,// add file name
                                       newLineNumber: lineNumber,
                                       oldLineNumber: lineNumber,
                                       isNormal: true
                                     })
      addComment(changeKey, content)
    }
  }

  function sortByFileOrder(a: FileData, b: FileData) {
    const fileOrder = (aiComments as AssistedCommentsResponse).files.map(file => file.diffFile)
    return fileOrder.findIndex(diffFile => diffFile.includes(a.newPath)) - fileOrder.findIndex(diffFile => diffFile.includes(b.newPath))
  }
}
