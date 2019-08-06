import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { reduxStore } from 'utils/visible';
import { HookDemo } from 'utils/hook';
import SvgImg from 'component/SvgImg';
import svg_rabbit from 'static/svg/svg_rabbit.svg';

interface Props {
  dispatch: any,
  local: any,
}
class HomePage extends React.Component<Props> {
  componentDidMount() {
    reduxStore.dispatch = this.props.dispatch;
  }

  render() {
    return (
      <div className="HomePage">
        <h2>HomePage</h2>
        <HookDemo />
        <SvgImg src={svg_rabbit} width={50} height={50} />
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    local: state.local,
  };
}
export default connect(mapStateToProps)(HomePage as any);
