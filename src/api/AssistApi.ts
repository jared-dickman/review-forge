import {BaseApi} from 'src/api/BaseApi.ts'
import {AssistedCommentsResponse} from 'src/interfaces/AssistedCommentsResponse'

export const AssistApi = {
  getInsight,
  getAiComments,
  getCustomInsight
} as const

async function getInsight(reviewLink: string, insightId: string): Promise<string> {
  const endpoint = `analyze/${insightId}`
  const query = `url=${reviewLink}`
  return BaseApi.get(endpoint, query)
}

async function getCustomInsight(reviewLink: string, prompt: string): Promise<string> {
  const body = { prompt }
  const endpoint = `custom`
  const query = `url=${reviewLink}`
  return BaseApi.post(endpoint, query, body)
}

async function getAiComments(reviewLink: string): Promise<AssistedCommentsResponse> {
  const endpoint = 'comments'
  const query = `url=${reviewLink}`
  return BaseApi.get(endpoint, query)
}
