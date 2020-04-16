import * as React from 'react'

interface IProps { }

interface IState { }

class FilterLayout extends React.PureComponent<IProps, IState> {
  render() {
    return (
      <div className={'filter-container'}>
        {this.props.children}
      </div>
    )
  }
}

export default FilterLayout
