import React, { useCallback } from 'react'
import { Col, Form, Input, Row, message } from 'antd'
import * as mqtt from 'mqtt'
import { Client } from 'mqtt'
import SubmitButton from '../../../components/SubmitButton'
import Title from '../../../components/Title'
import { generateRandomKey } from '../../../utils'
import { IConnectionData } from './index.types'
import { RULES } from './index.contants'

import styles from './index.module.scss'

interface IProps {
  onConnect: (e: Client) => void
}

const Connection = ({ onConnect }: IProps) => {
  const handleConnect = useCallback(
    (values: IConnectionData) => {
      const { hostname, username, password } = values
      const client = mqtt.connect({
        clientId: generateRandomKey(10),
        protocol: 'wss',
        hostname: hostname,
        protocolVersion: 4,
        port: 8884,
        path: '/mqtt',
        clean: true,
        resubscribe: false,
        keepalive: 60,
        reconnectPeriod: 0,
        username: username,
        password: password,
      })
      client.on('connect', () => {
        message.success('Connected Successfully!', 2)
        onConnect(client)
      })
    },
    [onConnect],
  )

  return (
    <div className={styles.connection}>
      <Title>Connection</Title>
      <Form autoComplete='off' onFinish={handleConnect}>
        <Form.Item name='hostname' rules={RULES.hostname}>
          <Input placeholder='Hostname' />
        </Form.Item>

        <Row justify='space-between'>
          <Col span={11}>
            <Form.Item name='username' rules={RULES.username}>
              <Input placeholder='Username' />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name='password' rules={RULES.password}>
              <Input.Password placeholder='Password' />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <SubmitButton>Connect</SubmitButton>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Connection
