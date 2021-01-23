import { AxiosRequestConfig } from 'axios'
import { Commit } from 'vuex'
import request from './request'

export async function getAndCommit (url: string, type: string, commit: Commit): Promise<AnalyserNode> {
  const { data } = await request.get(url)
  commit(type, data)
  return data
}

export async function postAndCommit (url: string, type: string, commit: Commit, payload: any): Promise<any> {
  const { data } = await request.post(url, payload)
  commit(type, data)
  return data
}

export async function asyncAndCommit (url: string, type: string, commit: Commit, config: AxiosRequestConfig, extraData?: any): Promise<any> {
  const { data } = await request(url, config)
  if (extraData) {
    commit(type, { data, extraData })
  } else {
    commit(type, { data })
  }
  return data
}
