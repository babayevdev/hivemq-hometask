import React, { ReactNode } from 'react'
import { Layout } from 'antd'

import styles from './index.module.scss'

const { Header, Content } = Layout

interface IMainLayoutProps {
  children?: ReactNode
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <Layout>
      <Header className={styles.header}>MQTT Web Client</Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  )
}

export default MainLayout
