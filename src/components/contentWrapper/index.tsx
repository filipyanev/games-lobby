import React from 'react';
import styles from './index.module.css';

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return <div className={styles['content-wrapper']}>{children}</div>;
}

export default ContentWrapper;
