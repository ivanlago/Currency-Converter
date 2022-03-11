import Raect from 'react';
import ReactDOM from 'react-dom';
import ListCurrency from './list-currency';

describe('ListCurrency', () => {

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ListCurrency />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

})