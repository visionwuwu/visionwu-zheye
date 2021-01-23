import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'danger' | 'default'
export interface MessageProps {
  type?: MessageType;
  message?: string;
}
function createMessage (props: MessageProps, timeout = 2000): void {
  const messageInstance = createApp(Message, {
    ...props
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    document.body.removeChild(mountNode)
    messageInstance.unmount(mountNode)
  }, timeout)
}
export default createMessage
