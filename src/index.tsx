import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Provider } from 'react-redux'
import initStore from './libs/initRedux'
import MarketContainer from './containers/MarketContainer';

import 'antd/dist/antd.css';

const { store } = initStore()

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  padding: 30px;
`;

ReactDOM.render(
  <Provider store={store}>
    <Container>
      <MarketContainer />
    </Container>
  </Provider>,
  document.getElementById("root")
);
