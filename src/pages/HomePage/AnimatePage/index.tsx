import * as React from 'react';
import './index.scss';
import Progress from 'component/Home/Progress';
import ColorItem from 'component/Home/ColorItem';
import HomeTextItem from 'component/Home/HomeTextItem';

class AnimatePage extends React.Component {

  render() {
    return (
      <div className="animatePage">
        <h2>AnimatePage</h2>
        <Progress />
        <ColorItem />
        <HomeTextItem />
      </div>
    );
  }
}

export default AnimatePage;
