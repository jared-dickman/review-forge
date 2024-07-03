import {Flex, Input, IRadioProps, Radio, Typography} from '@mparticle/aquarium'
import {Margin} from '@mparticle/aquarium/dist/style.ts'
import {useState} from 'react'
import {AssistApi} from 'src/api/AssistApi'
import {ReviewApi} from 'src/api/ReviewApi.ts'
import {LocalStorageKeys} from 'src/constants/LocalStorageKeys.ts'
import {useLocalStorage} from 'src/hooks/useLocalStorage.tsx'
import {useCommentsStore} from 'src/stores/CommentsStore.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

const ReviewInputOptions: IRadioProps['options'] = [
  { label: 'PR', value: 'pr' },
  { label: 'Diff', value: 'diff' },
  { label: 'Code', value: 'code' },
] as const

type ReviewInputType = typeof ReviewInputOptions[number]['value']

export function ReviewInput() {
  const [isFetching, setIsFetching] = useState<boolean>()
  const [isInputError, setIsInputError] = useState<boolean>()
  const [isFetchingError, setIsFetchingError] = useState<boolean>()

  const [inputType, setInputType] = useLocalStorage<ReviewInputType>(LocalStorageKeys.reviewInputType, 'pr')

  const { link: reviewLink, setLink: setReviewLink, setDiff } = useReviewStore()
  const { setAiComments } = useCommentsStore()

  let reviewInputLabel: string
  switch (inputType) {
    case 'pr':
      reviewInputLabel = 'Enter a pull request url to review'
      break
    case 'diff':
      reviewInputLabel = 'Enter a diff to review'
      break
    case 'code':
      reviewInputLabel = 'Enter code to review'
      break
  }

  return <>
    <Flex vertical>

      <Radio.Group options={ReviewInputOptions}
                   style={{ marginBottom: Margin }}
                   value={inputType}
                   optionType="button"
                   onChange={e => { changeInputType(e.target.value as ReviewInputType) }}/>

      <div className="reviewInput__wrapper">

        <div className="reviewInput__label">{reviewInputLabel}</div>
        <Input.Search className="reviewInput__input"
                      size="large"
                      autoFocus
                      enterButton="Forge Review"
                      placeholder="say this is a test"
                      value={reviewLink}
                      loading={isFetching}
                      status={isInputError ? 'error' : undefined}
                      onChange={onInputChange}
                      onSearch={submit}/>

        {isFetchingError &&
         <Typography.Text type="danger">Error fetching review</Typography.Text>}
      </div>

    </Flex>
  </>

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReviewLink(e.target.value)
    setIsInputError(false)
  }

  async function submit(): Promise<void> {
    if (!reviewLink) {
      setIsInputError(true)
      return
    }

    setIsFetching(true)
    setIsFetchingError(false)

    try {
      await fetchReview()
    } catch (e) {
      console.error(e)
      setIsFetchingError(true)
    } finally {
      setIsFetching(false)
    }
  }

  async function fetchReview(): Promise<void> {
    try {
      const diff = await ReviewApi.getDiff(reviewLink)
      const aiComments = await AssistApi.getAiComments(reviewLink)
      console.log({ diff, aiComments })
      setDiff(diff)
      setAiComments(aiComments)
    } catch (e) {

    } finally {

    }
  }

  function changeInputType(type: ReviewInputType): void {
    setInputType(type)
    localStorage.setItem(LocalStorageKeys.reviewInputType, type as string)
  }

}
