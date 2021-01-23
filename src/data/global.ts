export interface ColumnProps {
  id: number;
  avatar?: string;
  title: string;
  description: string;
}
export type ColumnsProps = ColumnProps[]
export interface UserProps {
  id?: number;
  name?: string;
  isLogin: boolean;
  columnId?: number;
}
export interface RuleProps {
  type: 'required' | 'email';
  message: string;
}
export type RulesProps = RuleProps[]
export interface PostProps {
  id: number;
  title: string;
  image?: string;
  description?: string;
  createAt: string;
  columnId?: number;
}
export type PostListProps = PostProps[]

export const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 10,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

export const testUser: UserProps = {
  name: 'Visionwuwu',
  isLogin: false,
  columnId: 1
}
export const emailRules:RulesProps = [
  {
    type: 'required',
    message: '邮箱不能为空'
  },
  {
    type: 'email',
    message: '邮箱格式不正确'
  }
]
export const passwordRules:RulesProps = [
  {
    type: 'required',
    message: '邮箱不能为空'
  }
]
export const titleRules:RulesProps = [
  {
    type: 'required',
    message: '文章标题不能为空'
  }
]
export const detialRules:RulesProps = [
  {
    type: 'required',
    message: '文章详情不能为空'
  }
]

export const testPosts: PostListProps = [
  {
    id: 1,
    title: '英语语法的第一个坑if从句，你掉进去了吗？（一）',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e912f4c7f24af242a382b8c.png?x-oss-process=image/resize,m_fill,h_110,w_200',
    description: '我在学校学语法的时候，最让我头疼的就是各种语法的专有名词，状语，同位语，动名词，动词分词，这些听上去很高大上的称谓到底是什么？这篇文章会分三次推送给，先从什么是状语说起，然后再深入聊聊if的正常语态和虚拟语态句型。 英语中最早学习的复杂句型…',
    createAt: '2021-01-15 14:09:00',
    columnId: 1
  },
  {
    id: 2,
    title: '五分钟入门英语语法可能吗？',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e913eb3912836262645f30f.jpg?x-oss-process=image/resize,m_fill,h_110,w_200',
    description: '语法速成乍一听很像卖假药的小广告，但严格来说，在满足了各种条件下，英语语法速成并不是不可能的。 首先“速成“的定义到底是什么？如果是指流利使用正确的语法表达意思，那就是纯扯淡，因为所有的技能都需要大量练习时间，”一万小时定律“是经过千百万… 英语中最早学习的复杂句型…',
    createAt: '2021-01-15 17:08:00',
    columnId: 1
  }
]
