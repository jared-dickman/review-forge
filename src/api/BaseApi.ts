import axios from 'axios'

export const BaseApi = {
  get,
  post,
} as const

// export const localServerRoute = `http://localhost:5678` as const
export const serverRouteUnsecure = `http://35.196.218.231:8080` as const
export const serverRouteSecure = `https://35.231.162.91:8080` as const


async function get<T>(endpoint: string, query: string = ''): Promise<T> {
  const url = endpoint + (query ? `?${query}` : '')
  const response = await axios.get(`${serverRouteSecure}/${url}`)

  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('Failed to fetch: ' + endpoint)
  }
}

async function post<T>(endpoint: string, query: string = '', body = {}): Promise<T> {
  const url = endpoint + (query ? `?${query}` : '')
  const response = await axios.post(`${serverRouteSecure}/${url}`, body)

  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('Failed to fetch: ' + endpoint)
  }
}
