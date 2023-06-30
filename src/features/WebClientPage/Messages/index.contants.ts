export const RULES = {
  topic: [{ required: true, message: 'Please input your topic!' }],
  qos: [{ required: true, message: 'Please select your QoS!' }],
  message: [{ required: true, message: 'Please input your message!' }],
}

export const QOS_OPTIONS = [
  { value: 0, label: 'QoS 0' },
  { value: 1, label: 'QoS 1' },
  { value: 2, label: 'QoS 2' },
]

export const COLUMNS = [
  {
    title: 'Message',
    dataIndex: 'message',
  },
  {
    title: 'Topic',
    dataIndex: 'topic',
  },
  {
    title: 'QoS',
    dataIndex: 'qos',
    render: (qos: number) => `QoS ${qos}`,
  },
]
