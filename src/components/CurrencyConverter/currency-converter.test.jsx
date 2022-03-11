import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent, findByTestId, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyConverter from './currency-converter';
import axiosMock from 'axios';
import axios from '../../__mocks__/axios';

describe('CurrencyConverter Test', () => {

  it('Should render the component without errors', () => {
      const div = document.createElement('div');
      ReactDOM.render(<CurrencyConverter />, div);
      ReactDOM.unmountComponentAtNode(div);
  })

  it('must simulate a currency conversion', async () => {
    const { findByTestId, getByTestId } = render(<CurrencyConverter />);
    axiosMock.get.mockResolvedValueOnce({
      data: {
        success: true,
        rates: {
          BRL: 4.564292,
          USD: 1.101049
        }
      }
    });
    fireEvent.click(getByTestId('btnConverter'));
    const modal = await findByTestId('modal');
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(modal).toHaveTextContent('1 BRL = 0,24 USD');
})

})
