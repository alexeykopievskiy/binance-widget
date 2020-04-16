import * as React from 'react'

interface IProps { }

interface IState { }

class FilterLayout extends React.PureComponent<IProps, IState> {
  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

export default FilterLayout
