import * as React from 'react'
import { Radio, Form, Select } from 'antd';
import styled from 'styled-components';
import { StarFilled } from '@ant-design/icons';

import { Enums } from '../interfaces'

const { Option } = Select;

const selectStyles = { width: 'calc(100% + 30px)', marginLeft: '-15px' }

interface IProps {
  filters: any,
  saveFilters: (filters: any) => any
}

interface IState { }

const FilterContainer = styled.div`
  margin-left: 10px;
  display: inline-block;

  .ant-radio-button-wrapper {
    border: none;
  }
`;

class TabsLayout extends React.PureComponent<IProps, IState> {

  handleTabsChange = (e: any) => {
    const { filters } = this.props

    this.props.saveFilters({
      ...filters,
      tab: e.target.value
    })
  };

  handleAltsChange = (value: string) => {
    const { filters } = this.props

    this.props.saveFilters({
      ...filters,
      tab: Enums.MainTabs.ALTS,
      alts: value
    })
  }

  handleFiatChange = (value: string) => {
    const { filters } = this.props

    this.props.saveFilters({
      ...filters,
      tab: Enums.MainTabs.FIAT,
      fiat: value
    })
  }

  render() {
    const { filters } = this.props;

    return (
      <>
        <Form.Item>
          <Radio.Group value={filters ? filters.tab : Enums.Currencies.BTC} onChange={this.handleTabsChange}>
            <Radio.Button value={Enums.MainTabs.FAVORITE}><StarFilled /></Radio.Button>
            <Radio.Button value={Enums.MainTabs.MARGIN}>{Enums.MainTabs.MARGIN}</Radio.Button>
            <Radio.Button value={Enums.Currencies.BNB}>{Enums.Currencies.BNB}</Radio.Button>
            <Radio.Button value={Enums.Currencies.BTC}>{Enums.Currencies.BTC}</Radio.Button>
            <FilterContainer>
              <Radio.Button value={Enums.MainTabs.ALTS}>
                <Select defaultValue={Enums.MainTabs.ALTS} style={selectStyles} onChange={this.handleAltsChange}>
                  <Option value={Enums.MainTabs.ALTS}>{Enums.MainTabs.ALTS}</Option>
                  <Option value={Enums.Currencies.ETH}>{Enums.Currencies.ETH}</Option>
                  <Option value={Enums.Currencies.TRX}>{Enums.Currencies.TRX}</Option>
                  <Option value={Enums.Currencies.XRP}>{Enums.Currencies.XRP}</Option>
                </Select>
              </Radio.Button>
              <Radio.Button value={Enums.MainTabs.FIAT}>
                <Select defaultValue={Enums.MainTabs.FIAT} style={selectStyles} onChange={this.handleFiatChange}>
                  <Option value={Enums.MainTabs.FIAT}>{Enums.MainTabs.FIAT}</Option>
                  <Option value={Enums.Currencies.USDC}>{Enums.Currencies.USDC}</Option>
                  <Option value={Enums.Currencies.USDT}>{Enums.Currencies.USDT}</Option>
                </Select>
              </Radio.Button>
            </FilterContainer>
          </Radio.Group>
        </Form.Item>
      </>
    )
  }
}

export default TabsLayout
