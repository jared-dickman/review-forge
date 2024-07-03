import {Card} from '@mparticle/aquarium'

interface AiCommentProps {
  message: string
}

export function DiffAiComment(props: AiCommentProps) {
  return <>
    <Card size="small" title={<span>AI Comment</span>} type="inner" style={{ margin: 8 }}>
      <p>{props.message}</p>
    </Card>
  </>
}
