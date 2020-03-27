import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';

interface Props {
  dispatch: any,
  local: any,
  match: any,
  history: any,
}
class BookPage extends React.Component<Props> {

  state = {
    id: this.props.match.params.id,
  }

  componentDidMount() {
    console.log('this.props', this.props)
    // const { texts } = this.props.local
  }

  onGoBack = () => {
    this.props.history.goBack(0)
  }

  render() {
    return (
      <div className="g-home">
        <a onClick={this.onGoBack}>返回</a>
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
