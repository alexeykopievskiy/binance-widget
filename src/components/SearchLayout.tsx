import * as React from 'react'
import { Input } from 'antd';

const { Search } = Input;

interface IProps {
  search?: string,
  saveSearch: (search: string) => any
}

interface IState { }

class SearchLayout extends React.PureComponent<IProps, IState> {

  onSearch = (value: string) => {
    this.props.saveSearch(value)
  }

  render() {
    return (
      <Search
        placeholder="Search"
        onChange={(e) => {
          this.onSearch(e.target.value)
        }}
        defaultValue={this.props.search}
        style={{ width: 200 }}
      />
    )
  }
}

export default SearchLayout
