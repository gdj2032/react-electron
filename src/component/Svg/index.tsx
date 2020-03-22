import * as React from 'react';
import './index.scss';
// import 'static/svg/svg_rabbit.svg';
// import svg_phone from 'static/svg/svg_phone.svg';{ ReactComponent as Logo }

class SvgImg extends React.Component<any> {
  static defaultProps = {
    visible: false,
  }

  render() {
    const {
      onClick,
      className,
      src,
      width,
      height,
      alt,
    } = this.props;

    return (
      <div onClick={onClick || null} className={className || ''}>
        <img src={src} width={width || null} height={height || null} alt={`${alt || ''}`} />
      </div>
    );
  }
}

export default SvgImg;
