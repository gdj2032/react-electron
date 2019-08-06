// 使用requestAnimationFrame改变state
import React, { Component } from 'react';
import './index.scss';

interface State {
  percent: number,
  schedule: number,
  animateSpeed: number,
}
export default class Progress extends Component<any> {

  state: State = {
    percent: 10,
    schedule: 1,
    animateSpeed: 50,
  }
  componentDidMount() {
    this.stop();
  }

  increase = () => {
    const { percent, schedule, animateSpeed } = this.state;
    const targetPercent = percent >= (100 - schedule) ? 100 : percent + schedule;
    const speed: number = (targetPercent - percent) / animateSpeed;
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const currentProgress = Math.min(parseInt(String(speed * progress + percent), 10), targetPercent);
      this.setState({
        percent: currentProgress
      });
      if (currentProgress < targetPercent) {
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  }

  decrease = () => {
    const { percent, schedule, animateSpeed } = this.state;
    const targetPercent = percent < schedule ? 0 : percent - schedule;
    const speed = (percent - targetPercent) / animateSpeed;
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const currentProgress = Math.max(parseInt(String(percent - speed * progress), 10), targetPercent);
      this.setState({
        percent: currentProgress
      });
      if (currentProgress > targetPercent) {
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  }

  decreaseTimer = setInterval(() => {
    if(this.state.percent === 0) {
      this.stop();
      return;
    }
    this.decrease();
  }, 100);
  increaseTimer = setInterval(() => {
    if(this.state.percent === 100) {
      this.stop();
      return;
    }
    this.increase();
  }, 100);

  automaticIncrease = () => {
    clearInterval(this.decreaseTimer);
    this.increaseTimer = setInterval(() => {
      if(this.state.percent === 100) {
        this.stop();
        return;
      }
      this.increase();
    }, 100);
  }
  automaticDecrease = () => {
    clearInterval(this.increaseTimer);
    this.decreaseTimer = setInterval(() => {
      if(this.state.percent === 0) {
        this.stop();
        return;
      }
      this.decrease();
    }, 100);
  }

  stop = () => {
    clearInterval(this.increaseTimer);
    clearInterval(this.decreaseTimer);
  }

  render() {
    const { percent } = this.state;
    return (
      <div className="g-pro">
        <h3>进度条：</h3>
        <div className="progress">
          <div className="progress-wrapper" >
            <div className="progress-inner" style={{ width: `${percent}%` }} ></div>
          </div>
          <div className="progress-info" >{percent}%</div>
        </div>
        <div className="btns">
          <button onClick={this.decrease}>-</button>
          <button onClick={this.increase}>+</button>
          <button onClick={this.automaticIncrease}>自动增加</button>
          <button onClick={this.automaticDecrease}>自动减少</button>
          <button onClick={this.stop}>停止</button>
        </div>
      </div>
    );
  }
}