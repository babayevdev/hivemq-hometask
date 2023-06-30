export interface IMessageData {
  topic: string
  qos: 0 | 1 | 2
  message: string
}

export interface IMessageDataWithKey extends IMessageData {
  key: React.Key
}
