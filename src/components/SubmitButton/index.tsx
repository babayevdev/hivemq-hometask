import { Button } from 'antd'
import React, { ReactNode } from 'react'

import styles from './index.module.scss'

interface IProps {
  children: ReactNode
}

const SubmitButton = ({ children }: IProps) => {
  return (
    <Button className={styles.submitButton} type='primary' htmlType='submit'>
      {children}
    </Button>
  )
}

export default SubmitButton
