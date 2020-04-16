import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from 'styled-components';

import { getBinanceData } from '../services';
import { saveProducts, saveFilters, saveIndicatorType, saveSearch, updateFavorites } from '../ducks/data'
import { wsConnect } from '../ducks/socket'
import { Models, Enums } from '../interfaces'

import FilterLayout from "../components/FilterLayout";
import TabsLayout from "../components/TabsLayout";
import SearchLayout from "../components/SearchLayout";
import IndicatorLayout from "../components/IndicatorLayout";
import TableLayout from "../components/TableLayout";
import { getPreparedData } from "../utils";

interface IProps {
  saveProducts: (products: Models.IProduct[]) => any
  updateFavorites: (favorites: React.ReactText[]) => any
  saveFilters: (filters: any) => any
  saveIndicatorType: (IndicatorType: any) => any
  saveSearch: (search: any) => any
  wsConnect: () => any
  products?: any,
  filters?: any,
  IndicatorType?: string,
  search?: string,
  wsIsConnected?: boolean,
  wsIsConnecting?: boolean,
  favoriteKeys: React.ReactText[]
}

const Container = styled.div`
  margin: auto;
  border: 1px solid #eee;
`;

const FilterContainer = styled.div`
  padding: 10px;
`;

const Green = styled.span`
  color: green;
`;

const Red = styled.span`
  color: red;
`;

class MarketContainer extends Component<IProps, {}> {

  fetchProducts = async () => {
    try {
      const { data: { data } } = await getBinanceData()

      this.props.saveProducts(data)

      this.setState({ isLoading: false, errors: null })
    } catch (err) {
      this.setState({ isLoading: false, errors: err.message })
    }
  }

  componentDidMount() {
    const { wsIsConnected, wsIsConnecting } = this.props;

    this.fetchProducts();
    if (!wsIsConnected && !wsIsConnecting) {
      this.props.wsConnect();
    }
  }

  filterChange = (change: string) => {
    return (change.startsWith('+') ? <Green>{change}</Green> : <Red>{change}</Red>)
  }

  getColumns = (IndicatorType?: string) => {
    let columns: any[] = [
      {
        title: 'Pair',
        dataIndex: 'pair',
        key: 'pair',
        render: (pair: string) => <span>{pair}</span>,
        sorter: (curr: any, next: any) => curr.pair.localeCompare(next.pair)
      },
      {
        title: 'Last Price',
        dataIndex: 'lastPrice',
        key: 'lastPrice',
        render: (price: string) => <span>{price}</span>,
        sorter: (curr: any, next: any) => curr.lastPrice - next.lastPrice
      }
    ];
    if (IndicatorType === Enums.IndicatorType.VOLUME) {
      columns.push(
        {
          title: 'Volume',
          dataIndex: 'volume',
          key: 'volume',
          render: (volume: string) => <span>{volume}</span>,
          sorter: (curr: any, next: any) => curr.volume - next.volume
        }
      )
    } else {
      columns.push(
        {
          title: 'Change',
          dataIndex: 'change',
          key: 'change',
          render: (change: string) => this.filterChange(change),
          sorter: (curr: any, next: any) => parseFloat(curr.change) - parseFloat(next.change)
        }
      )
    }

    return columns
  }

  render() {
    const { products, filters, IndicatorType, search, saveFilters, saveSearch, saveIndicatorType, updateFavorites, favoriteKeys } = this.props

    const dataSource = getPreparedData(products, filters, search, favoriteKeys)

    return (
      <Container>
        <FilterContainer>
          <FilterLayout>
            <TabsLayout
              filters={filters}
              saveFilters={saveFilters}
            />
            <FilterLayout>
              <SearchLayout
                search={search}
                saveSearch={saveSearch}
              />
              <IndicatorLayout
                IndicatorType={IndicatorType}
                saveIndicatorType={saveIndicatorType}
              />
            </FilterLayout>
          </FilterLayout>
        </FilterContainer>
        <TableLayout
          updateFavorites={updateFavorites}
          favoriteKeys={favoriteKeys}
          dataSource={dataSource}
          columns={this.getColumns(IndicatorType)}
        />
      </Container>
    )
  }
}

const mapStateToProps = (
  {
    data: { products, filters, IndicatorType, search, favoriteKeys },
    socket: { wsIsConnected, wsIsConnecting }
  }: {
    data: { products: any, filters: any, IndicatorType: string, search: string, favoriteKeys: React.ReactText[] },
    socket: { wsIsConnected: boolean, wsIsConnecting: boolean }
  }) => ({
    products,
    filters,
    IndicatorType,
    search,
    wsIsConnected,
    wsIsConnecting,
    favoriteKeys
  });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveProducts: (products: Models.IProduct[]) => saveProducts(products, dispatch),
  updateFavorites: (favorites: React.ReactText[]) => updateFavorites(favorites, dispatch),
  saveFilters: (filters: any) => saveFilters(filters.tab, filters.alts, filters.fiat, dispatch),
  saveIndicatorType: (IndicatorType: string) => saveIndicatorType(IndicatorType, dispatch),
  saveSearch: (search: string) => saveSearch(search, dispatch),
  wsConnect: () => wsConnect(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketContainer);
