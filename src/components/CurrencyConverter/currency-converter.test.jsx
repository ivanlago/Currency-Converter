import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyConverter from './currency-converter';
import axiosMock from 'axios';

describe('CurrencyConverter Test', () => {

  it('Should render the component without errors', () => {
      const div = document.createElement('div');
      ReactDOM.render(<CurrencyConverter />, div);
      ReactDOM.unmountComponentAtNode(div);
  })

  it('must simulate a currency conversion', async () => {
    render(<CurrencyConverter />);
    axiosMock.get.mockResolvedValueOnce({
      data: {
        success: true,
        rates: {
          BRL: 4.564292,
          USD: 1.101049
        }
      }
    });
    fireEvent.click(screen.getByTestId('btnConverter'));
    const result = await screen.findByTestId('result')
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(result).toHaveTextContent('1 BRL = 0.24 USD');
})

})
