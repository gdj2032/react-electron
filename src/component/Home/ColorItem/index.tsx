import * as React from 'react';
import './index.scss';

class ColorItem extends React.Component<any> {
  static defaultProps = {
    red: 200,
    green: 20,
    blue: 50,
    timer: 50,
  }

  state = {
    red: this.props.red,
    green: this.props.green,
    blue: this.props.blue,
    timer: this.props.timer,
  }

  timer: any = '';

  componentDidMount() {
    this.timer = setInterval(() => {
      this.redTimer('red');
      this.redTimer('green');
      this.redTimer('blue');
    }, this.state.timer);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  isIncrease = {
    red: true,
    green: true,
    blue: true,
  };

  redTimer = (color: any) => {
    if(this.state[color] < 0) {
      this.isIncrease[color] = true;
    }
    if(this.state[color] > 255) {
      this.isIncrease[color] = false;
    }
    if(this.isIncrease[color]) {
      this.increase(color, this.state[color]);
    } else {
      this.decrease(color, this.state[color]);
    }
  }
  increase = (value: any, num: number) => {
    ++num;
    this.setState({ [value]: num });
  }

  decrease = (value: any, num: number) => {
    --num;
    this.setState({ [value]: num });
  }
  render() {
    const { red, green, blue } = this.state;
    const backgroundColor = `rgb(${red}, ${green}, ${blue})`
    return (
      <div className="ColorItem">
        <h3>颜色动画</h3>
        <div className="demo" style={{backgroundColor: backgroundColor}}></div>
      </div>
    );
  }
}

export default ColorItem;
