import * as React from 'react';
import './index.scss';
// import 'static/svg/svg_rabbit.svg';
// import svg_phone from 'static/svg/svg_phone.svg';{ ReactComponent as Logo }

interface IProps {
  src: any;
  width?: string | number | undefined;
  height?: string | number | undefined;
  onClick?: () => void;
  className?: any;
  alt?: any;
}

class Svg extends React.Component<IProps> {
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
      <div onClick={() => onClick && onClick()} className={className || ''}>
        <img src={src} width={width} height={height} alt={`${alt || ''}`} />
      </div>
    );
  }
}

export default Svg;
