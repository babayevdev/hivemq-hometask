import React, { useCallback, useMemo, useState } from 'react'
import { Col, Form, Input, List, Row, message } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import { Client } from 'mqtt'
import SubmitButton from '../../../components/SubmitButton'
import Title from '../../../components/Title'
import { ISubscripbeData } from './index.types'

import styles from './index.module.scss'

interface IProps {
  client: Client | null
}

const Subscription = ({ client }: IProps) => {
  const [grantedTopics, setGrantedTopics] = useState<string[]>([])
  const [form] = Form.useForm()

  const rule = useMemo(
    () => [
      { required: true, message: 'Please input a topic!' },
      () => ({
        validator(_: unknown, value: string) {
          if (!grantedTopics.includes(value)) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('This topic has already been subscribed!'))
        },
      }),
    ],
    [grantedTopics],
  )

  const handleSubscripe = useCallback(
    (values: ISubscripbeData) => {
      if (!client) {
        message.error('Please connect first!', 2)
        return
      }
      if (!client.connected) {
        client.reconnect()
      }
      client.subscribe(values.subTopic, (err, grant) => {
        if (err) {
          message.error(err.message, 2)
        } else {
          message.success('Subcribed successfully!', 2)
          setGrantedTopics((prevState) => [...prevState, ...grant.map((item) => item.topic)])
        }
      })
      form.resetFields()
    },
    [client],
  )

  return (
    <div className={styles.subscribe}>
      <Title>Subscription</Title>
      <Form form={form} autoComplete='off' onFinish={handleSubscripe}>
        <Form.Item name='subTopic' rules={rule}>
          <Input placeholder='Topic for subscription' />
        </Form.Item>

        <Form.Item>
          <SubmitButton>Subscribe</SubmitButton>
        </Form.Item>
      </Form>
      <List
        className={styles.grantedList}
        locale={{ emptyText: 'No granted topics!' }}
        dataSource={grantedTopics}
        renderItem={(item) => (
          <Row gutter={10}>
            <Col>
              <CheckCircleFilled rev='true' />
            </Col>
            <Col>{item}</Col>
          </Row>
        )}
      />
    </div>
  )
}

export default Subscription
