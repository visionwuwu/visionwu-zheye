import { createStore } from 'vuex'
import { asyncAndCommit } from '../utils/fetch-and-commit'
import { getToken, removeToken, setToken } from '../utils/auth'
import { arrToObj, objToArr } from '@/utils/helper'
export interface ResponseType<P = Record<string, never>> {
  code: number;
  msg: string;
  data: P
}
export interface ImageProps {
  _id?: string;
  url?: string;
  fitUrl?: any;
}
export interface UserProps {
  _id?: string;
  isLogin: boolean;
  nickName?: string;
  avatar?: ImageProps;
  description?: string;
  email?: string;
  column?: string;
}
export interface ColumnProps {
  _id?: string;
  title?: string;
  avatar?: ImageProps;
  author?: string;
  description?: string;
}
export interface PostProps {
  _id?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string | UserProps;
  image?: ImageProps;
  createdAt?: string;
  column: string;
  isHTML?: boolean;
}
export interface CreatePost {
  title: string;
  content: string;
  image?: ImageProps | string;
  column: string;
  author: string;
}
export interface RuleProps {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type RulesProps = RuleProps[]
export interface GlobalError {
  status?: boolean;
  message?: string;
}
export interface ListProps<P> {
  [index: string]: P
}
export interface GlobalStoreDataProps {
  token: string;
  user: UserProps;
  columns: { data: ListProps<ColumnProps>, total: number, currentPage: number };
  posts: { loadedColumns: ListProps<{ columnId: string, total: number; currentPage: number }>, data: ListProps<PostProps> };
  loading: boolean;
  error: GlobalError;
}
const store = createStore<GlobalStoreDataProps>({
  state: {
    token: getToken() || '',
    user: { isLogin: false },
    columns: { data: {}, total: 0, currentPage: 0 },
    posts: { loadedColumns: {}, data: {} },
    loading: false,
    error: {
      status: false,
      message: ''
    }
  },
  getters: {
    getColumns: (state) => objToArr(state.columns.data),
    getColumnByCid: (state) => (cid: string) => state.columns.data[cid],
    getPostsByCid: (state) => (cid: string) => objToArr(state.posts.data).filter(p => p.column === cid),
    getPostById: (state) => (pid: string) => state.posts.data[pid]
  },
  mutations: {
    updateUser: (state, { data: rawData }) => {
      state.user = {
        isLogin: true,
        ...rawData.data
      }
    },
    fetchColumns: (state, { data: rawData }) => {
      const { data } = state.columns
      const { list, count, currentPage } = rawData.data
      state.columns = {
        data: {
          ...data,
          ...arrToObj(list)
        },
        currentPage,
        total: count
      }
    },
    fetchColumnById: (state, { data: rawData }) => {
      state.columns.data[rawData.data._id] = rawData.data
    },
    updateColumnById: (state, { data: rawData }) => {
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPostsById: (state, { data: rawData, extraData: columnId }) => {
      const { data, loadedColumns } = state.posts
      const { list, count, currentPage } = rawData.data
      state.posts = {
        data: {
          ...data,
          ...arrToObj(list)
        },
        loadedColumns: {
          ...loadedColumns,
          [columnId]: {
            columnId,
            total: count,
            currentPage
          }
        }
      }
    },
    createPost: (state, { data: rawData }) => {
      state.posts.data[rawData.data._id] = rawData.data
    },
    fetchCurrentPost: (state, { data: rawData }) => {
      state.posts.data[rawData.data._id] = rawData.data
    },
    updatePost: (state, { data: rawData }) => {
      state.posts.data[rawData.data._id] = rawData.data
    },
    deletePost: (state, { data: rawData }) => {
      delete state.posts.data[rawData.data._id]
    },
    login: (state, { data: rawData }) => {
      const token = rawData.data.token
      state.token = token
      setToken(token)
    },
    logout: (state) => {
      state.token = ''
      state.user = { isLogin: false }
      removeToken()
    },
    fetchCurrentUser: (state, { data: rawData }) => {
      state.user = {
        isLogin: true,
        ...rawData.data
      }
    },
    updateLoading: (state, loading: boolean) => {
      state.loading = loading
    },
    setError: (state, error: GlobalError) => {
      state.error = error
    }
  },
  actions: {
    login: ({ commit }, payload) => {
      return asyncAndCommit('/user/login', 'login', commit, {
        method: 'post',
        data: payload
      })
    },
    updateUser: ({ commit }, { id, data }) => {
      return asyncAndCommit(`/user/${id}`, 'updateUser', commit, {
        data: data,
        method: 'patch'
      })
    },
    fetchColumns: ({ state, commit }, params = {}) => {
      const { currentPage = 1, pageSize = 5 } = params
      if (state.columns.currentPage < currentPage) {
        return asyncAndCommit(`/columns/?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit, { method: 'get' })
      }
    },
    fetchColumnById: ({ state, commit }, cid: string) => {
      if (!state.columns.data[cid]) {
        return asyncAndCommit(`/columns/${cid}`, 'fetchColumnById', commit, {
          method: 'get'
        })
      } else {
        return Promise.resolve({ data: state.columns.data[cid] })
      }
    },
    updateColumnById: ({ commit }, { id, data }) => {
      return asyncAndCommit(`/columns/${id}`, 'updateColumnById', commit, {
        method: 'patch',
        data
      })
    },
    fetchPostsById: ({ state, commit }, params) => {
      const { cid, currentPage = 1, pageSize = 5 } = params
      const { loadedColumns } = state.posts
      if (!loadedColumns[cid] || (loadedColumns[cid].currentPage < currentPage)) {
        return asyncAndCommit(`/columns/${cid}/posts?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchPostsById', commit, {
          method: 'get'
        }, cid)
      }
    },
    createPost: ({ commit }, payload) => {
      return asyncAndCommit('/posts', 'createPost', commit, {
        method: 'post',
        data: payload
      })
    },
    fetchCurrentUser: ({ commit }) => {
      return asyncAndCommit('/user/current', 'fetchCurrentUser', commit, {
        method: 'get'
      })
    },
    fetchCurrentPost: ({ state, commit }, id: string) => {
      if (!state.posts.data[id] || !state.posts.data[id].content) {
        return asyncAndCommit(`/posts/${id}`, 'fetchCurrentPost', commit, {
          method: 'get'
        })
      } else {
        return Promise.resolve({ data: state.posts.data[id] })
      }
    },
    updatePost: ({ commit }, payload) => {
      return asyncAndCommit(`/posts/${payload.id}`, 'updatePost', commit, {
        data: payload.data,
        method: 'patch'
      })
    },
    deletePost: ({ commit }, id: string) => {
      return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, {
        method: 'delete'
      })
    }
  }
})
export default store
