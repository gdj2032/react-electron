import * as React from 'react';
import './index.scss';

class Demo extends React.Component<any> {
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
      <div className="Demo">Demo</div>
    );
  }
}

export default Demo;
