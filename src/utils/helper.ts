import { ColumnProps, UserProps, ImageProps } from '../store'
export interface CheckFileFormat {
  fileFormat?: string[];
  fileSize?: number
}
export interface ValidateResult {
  passed: boolean;
  error: string;
}
export function generateFitUrl (data: ImageProps, width: number, height: number, format = ['m_pad']): void {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}
export function checkUploadFileFormat (file: File, format: CheckFileFormat): ValidateResult {
  const validateResult: ValidateResult = {
    passed: true,
    error: ''
  }
  const { fileFormat, fileSize } = format
  if (fileFormat) {
    if (!fileFormat.includes(file.type)) {
      validateResult.passed = false
      validateResult.error = `只能上传${fileFormat.join(',')}文件`
      return validateResult
    }
  }
  if (fileSize) {
    if ((file.size / 1024 / 1024) > fileSize) {
      validateResult.passed = false
      validateResult.error = `文件大小不能超过${fileSize}M`
      return validateResult
    }
  }
  return validateResult
}

export function addColumnAvatar (data: UserProps | ColumnProps, width: number, height: number): void {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
    }
  }
}
type IndexProps<T> = { [key: string]: T }
export function arrToObj<T extends { _id?: string }> (arr: Array<T>): IndexProps<T> {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as IndexProps<T>)
}

export function objToArr<T> (obj: IndexProps<T>): Array<T> {
  return Object.keys(obj).map((key) => obj[key])
}
