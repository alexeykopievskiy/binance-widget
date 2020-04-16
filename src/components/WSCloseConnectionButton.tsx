import * as React from 'react'
import { Button } from 'antd';

interface IProps {
  wsForceDisconnect: () => any
}

interface IState { }

class WSCloseConnectionButton extends React.PureComponent<IProps, IState> {

  render() {
    return (
      <Button type="primary" onClick={() => this.props.wsForceDisconnect()}>Close connection</Button>
    )
  }
}

export default WSCloseConnectionButton
