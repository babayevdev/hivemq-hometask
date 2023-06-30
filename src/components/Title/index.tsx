import React, { ReactNode } from 'react'

import styles from './index.module.scss'

interface IProps {
  children: ReactNode | string
}

const Title = ({ children }: IProps) => {
  return <div className={styles.title}>{children}</div>
}

export default Title
