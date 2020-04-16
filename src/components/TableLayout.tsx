import * as React from 'react'
import { Table } from 'antd';

interface IProps {
  updateFavorites: (favorites: React.ReactText[]) => any
  dataSource: any,
  columns: any,
  favoriteKeys: React.ReactText[]
}

interface IState {
  favorites: string[]
}

class TableLayout extends React.PureComponent<IProps, IState> {

  onChangeFavorite = (selectedRowKeys: React.ReactText[]) => {
    this.props.updateFavorites(selectedRowKeys)
  }

  render() {
    const { favoriteKeys, dataSource, columns } = this.props
    return (
      <Table
        rowSelection={{
          selectedRowKeys: favoriteKeys,
          onChange: this.onChangeFavorite
        }}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ y: 600 }}
        style={{ width: 500 }}
      />
    )
  }
}

export default TableLayout
