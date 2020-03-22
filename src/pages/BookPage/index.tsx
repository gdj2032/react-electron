import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { reduxStore } from 'utils/visible';

interface Props {
  dispatch: any,
  local: any,
}
class BookPage extends React.Component<Props> {
  componentDidMount() {
    console.log('this.props', this.props)
    reduxStore.dispatch = this.props.dispatch;
  }

  render() {
    return (
      <div className="g-home">
        bookPage
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    local: state.local,
  };
}
export default connect(mapStateToProps)(BookPage as any);
