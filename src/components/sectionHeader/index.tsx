import React from 'react';
import ContentWrapper from '../contentWrapper';
import styles from './index.module.css';

interface IProps {
  key: string;
  title?: string;
  customRender?: React.ReactNode;
}

class SectionHeader extends React.PureComponent<IProps> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    title: undefined,
    customRender: undefined,
  };

  render() {
    const { key, title, customRender } = this.props;
    let content;

    if (title) {
      content = <h3>{title}</h3>;
    } else if (customRender) {
      content = customRender;
    } else {
      return undefined;
    }

    return (
      <div key={key} className={styles['section-header']}>
        <ContentWrapper>{content}</ContentWrapper>
      </div>
    );
  }
}

export default SectionHeader;
