import * as React from 'react'
import { Enums } from "../interfaces";
import { Radio } from 'antd';

interface IProps {
  IndicatorType?: string,
  saveIndicatorType: (IndicatorType: string) => any
}

interface IState { }

class MarketIndicatorTypeTypes extends React.PureComponent<IProps, IState> {

  handleIndicatorTypeChange = (e: any) => {
    this.props.saveIndicatorType(e.target.value)
  };

  render() {
    return (
      <Radio.Group style={{ marginLeft: 15 }} value={this.props.IndicatorType} onChange={this.handleIndicatorTypeChange}>
        <Radio.Button value={Enums.IndicatorType.CHANGE}>{Enums.IndicatorType.CHANGE}</Radio.Button>
        <Radio.Button value={Enums.IndicatorType.VOLUME}>{Enums.IndicatorType.VOLUME}</Radio.Button>
      </Radio.Group>
    )
  }
}

export default MarketIndicatorTypeTypes
