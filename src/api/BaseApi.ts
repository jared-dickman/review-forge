import axios from 'axios'

export const BaseApi = {
  get,
  post,
} as const

// export const localServerRoute = `http://localhost:5678` as const
export const serverRoute = `http://34.138.3.116:8080` as const

async function get<T>(endpoint: string, query: string = ''): Promise<T> {
  const url = endpoint + (query ? `?${query}` : '')
  const response = await axios.get(`${serverRoute}/${url}`)

  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('Failed to fetch: ' + endpoint)
  }
}

async function post<T>(endpoint: string, query: string = '', body = {}): Promise<T> {
  const url = endpoint + (query ? `?${query}` : '')
  const response = await axios.post(`${serverRoute}/${url}`, body)

  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('Failed to fetch: ' + endpoint)
  }
}
