import React from 'react'
import {
  render,
  screen,
  queryByAttribute,
  fireEvent,
  queryByText,
  act,
} from '@testing-library/react'
import { wait } from '@testing-library/user-event/dist/utils'
import WebClientPage from '../features/WebClientPage'

jest.setTimeout(40000)

test('check if the give messages are correctly displayed', async () => {
  const dom = render(<WebClientPage />)

  // connect to cluster
  const hostnameInput = screen.getByPlaceholderText('Hostname')
  fireEvent.change(hostnameInput, {
    target: { value: '726ff7139f544d72b39e02bb14500402.s1.eu.hivemq.cloud' },
  })
  const usernameInput = screen.getByPlaceholderText('Username')
  fireEvent.change(usernameInput, { target: { value: 'Gangsoft10' } })
  const passwordInput = screen.getByPlaceholderText('Password')
  fireEvent.change(passwordInput, { target: { value: 'Aiddyr2000110!' } })
  const connectButton = screen.getByText('Connect')
  if (connectButton.parentElement) fireEvent.click(connectButton.parentElement)
  await screen.findByText('Connected Successfully!', {}, { timeout: 10000 })

  // subscribe a topic
  const topic = 'abc'
  const subTopicInput = screen.getByPlaceholderText('Topic for subscription')
  fireEvent.change(subTopicInput, { target: { value: topic } })
  const subscribeButton = screen.getByText('Subscribe')
  if (subscribeButton.parentElement) fireEvent.click(subscribeButton.parentElement)
  await screen.findByText('Subcribed successfully!', {}, { timeout: 10000 })

  // publish message
  const message = 'This is Message.'
  const topicInput = screen.getByPlaceholderText('Topic')
  fireEvent.change(topicInput, { target: { value: topic } })
  const qosInput = queryByAttribute('id', dom.container, 'qos')
  if (qosInput?.parentElement?.parentElement)
    fireEvent.mouseDown(qosInput?.parentElement?.parentElement)
  const messageInput = screen.getByPlaceholderText('Message body')
  fireEvent.change(messageInput, { target: { value: message } })
  const optionQos0 = await screen.findByText('QoS 0')
  fireEvent.click(optionQos0)
  const publishMessageButton = screen.getByText('Publish Message')
  if (publishMessageButton.parentElement) fireEvent.click(publishMessageButton.parentElement)
  await screen.findByText('Sent Successfully!', {}, { timeout: 10000 })

  // get message
  await act(async () => {
    await wait(2000)
  })
  const table = dom.container.querySelector('tbody')
  if (table) {
    const messageElement = queryByText(table, message)
    expect(messageElement?.nodeName).toBe('TD')
  }
})
