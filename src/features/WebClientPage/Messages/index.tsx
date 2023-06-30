import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Col, Form, Input, Row, Select, Table, message as Message } from 'antd'
import { Client } from 'mqtt'
import SubmitButton from '../../../components/SubmitButton'
import Title from '../../../components/Title'
import { generateRandomKey } from '../../../utils'
import { IMessageData, IMessageDataWithKey } from './index.types'
import { RULES, QOS_OPTIONS, COLUMNS } from './index.contants'

import styles from './index.module.scss'

interface IProps {
  client: Client | null
}

const Messages = ({ client }: IProps) => {
  const [messages, setMessages] = useState<IMessageData[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    if (client) {
      client.on('message', (topic, payload, packet) => {
        setMessages((prevState) => [
          ...prevState,
          {
            topic: topic.toString(),
            message: payload.toString(),
            qos: packet.qos,
          },
        ])
      })
    }
  }, [client])

  const messagesWithKey: IMessageDataWithKey[] = useMemo(() => {
    return messages.map((message) => ({
      ...message,
      key: generateRandomKey(20),
    }))
  }, [messages])

  const handlePublishMessage = useCallback(
    (values: IMessageData) => {
      const { topic, qos, message } = values
      if (!client) {
        Message.error('Please connect first!', 2)
        return
      }
      if (!client.connected) {
        client.reconnect()
      }
      client.publish(topic, message, { qos }, (err) => {
        if (err) {
          Message.error(err.message)
        } else {
          Message.success('Sent Successfully!', 2)
        }
        form.resetFields()
      })
    },
    [client],
  )

  return (
    <div className={styles.message}>
      <Title>Messages</Title>
      <Form form={form} autoComplete='off' onFinish={handlePublishMessage}>
        <Row justify='space-between'>
          <Col span={11}>
            <Form.Item name='topic' rules={RULES.topic}>
              <Input placeholder='Topic' />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name='qos' rules={RULES.qos}>
              <Select placeholder='Quality of Service (QoS)' options={QOS_OPTIONS} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name='message' rules={RULES.message}>
          <Input.TextArea placeholder='Message body' />
        </Form.Item>

        <Form.Item>
          <SubmitButton>Publish Message</SubmitButton>
        </Form.Item>
      </Form>
      <Table
        className={styles.messageTable}
        columns={COLUMNS}
        dataSource={messagesWithKey}
        scroll={{ y: 200 }}
        locale={{ emptyText: 'No messages!' }}
      />
    </div>
  )
}

export default Messages
