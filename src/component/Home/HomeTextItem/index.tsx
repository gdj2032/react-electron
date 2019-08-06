import * as React from 'react';
import './index.scss';

class HomeTextItem extends React.Component<any> {
  static defaultProps = {
    visible: false,
  }
  constructor(props: any) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="HomeTextItem">
        <h3>文字渐变</h3>
      </div>
    );
  }
}

export default HomeTextItem;
