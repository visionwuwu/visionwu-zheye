import request from '../utils/request'

/**
 * 用户注册
 * @param payload
 */
export function reqRegister (payload: any): Promise<any> {
  return request.post('/users', payload)
}
