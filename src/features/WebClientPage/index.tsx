import { Col, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Client } from 'mqtt'
import Connection from './Connection'
import Subscription from './Subscription'
import Messages from './Messages'

const WebClientPage = () => {
  const [client, setClient] = useState<Client | null>(null)

  useEffect(
    () => () => {
      client?.end()
    },
    [],
  )

  useEffect(() => {
    if (client) {
      client.on('error', (err) => {
        message.error(err.message, 2)
      })
    }
  }, [client])

  return (
    <Row justify='center' gutter={{ sm: 0, md: 20, xl: 40 }}>
      <Col>
        <Row>
          <Connection onConnect={setClient} />
        </Row>
        <Row>
          <Subscription client={client} />
        </Row>
      </Col>
      <Col>
        <Messages client={client} />
      </Col>
    </Row>
  )
}

export default WebClientPage
