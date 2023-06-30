import React, { ReactNode } from 'react'
import { Row } from 'antd'

interface ICenterProps {
  children: ReactNode | string
}

const Center = ({ children }: ICenterProps) => {
  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      {children}
    </Row>
  )
}

export default Center
