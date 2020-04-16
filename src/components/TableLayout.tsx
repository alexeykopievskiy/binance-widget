import * as React from 'react'
import { Table } from 'antd';

const { Column } = Table;

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
        pagination={false}
        scroll={{ y: 400 }}
        style={{ width: 500 }}
      >
        {columns.map((column: any, index: number) => (
          <Column title={column.title} dataIndex={column.dataIndex} key={column.key} render={column.render} sorter={column.sorter} />
        ))}
      </Table>
    )
  }
}

export default TableLayout
