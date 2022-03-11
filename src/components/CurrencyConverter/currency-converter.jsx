import './currency-converter.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Alert, Spinner, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import ListCurrency from '../ListCurrency/list-currency';


function CurrencyConverter() {
  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=305cab9b997f2ffa5dbe518f642f5d64'

  const [value, setValue] = useState('1');
  const [currencyOf, setCurrencyOf] = useState('BRL');
  const [currencyFor, setCurrencyFor] = useState('USD');
  const [showSpinner, setShowSpinner] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resultConversion, setResultConversion] = useState('');
  const [showErrorMsg, setShoeErrorMsg] = useState(false);

  function handleValue(event) {
    setValue(event.target.value.replace(/\D/g, ''));
  }

  function handleCurrencyOf(event) {
    setCurrencyOf(event.target.value);
  }

  function handleCurrencyFor(event) {
    setCurrencyFor(event.target.value);
  }

  function handleCloseModal() {
    setValue('1');
    setCurrencyOf('BRL');
    setCurrencyFor('USD');
    setFormValidated(false);
    setShowModal(false);
  }

  function toConvert(event) {
    event.preventDefault();
    setFormValidated(true);
    if (event.currentTarget.checkValidity() === true) {
      setShowSpinner(true);
      axios.get(FIXER_URL)
        .then(res => {
          const price = getPrice(res.data)

          if (price) {
            setResultConversion(`${value} ${currencyOf} = ${price} ${currencyFor}`)
            setShowModal(true);
            setShowSpinner(false);
            setShoeErrorMsg(false);
          } else {
            showError();
          }
          
        }).catch(err => showError())
    }    
  };

  function getPrice(dataPrice) {
    if (!dataPrice || dataPrice.success !== true) {
      return false;
    }
    const priceOf = dataPrice.rates[currencyOf];
    const priceFor = dataPrice.rates[currencyFor];
    const price = (1 / priceOf * priceFor) * value;
    return price.toFixed(2);
  }

  function showError() {
    setShoeErrorMsg(true);
    setShowSpinner(false);
  }

  return (
    <div className='container'>
      <h1>Currency Converter</h1>

      <Alert variant='danger' show={showErrorMsg} >
      Error getting conversion data. Try again.
      </Alert>

      <Form onSubmit={toConvert} noValidate validated={formValidated}>
        <Row>
        <Col sm="3">
            <Form.Control placeholder='0' value={value} onChange={handleValue} required />
          </Col>
            
          <Col sm="3">
            <Form.Control as="select" value={currencyOf} onChange={handleCurrencyOf}>
              <ListCurrency />
            </Form.Control>
          </Col>

          <Col sm="1" className='text-center' style={{paddingTop: '5px'}}>
            <FontAwesomeIcon icon={ faAngleDoubleRight } />
          </Col>

          <Col sm="3">
            <Form.Control as="select" value={currencyFor} onChange={handleCurrencyFor}>
              <ListCurrency />
            </Form.Control>
          </Col>

          <Col sm='2'>
            <Button variant='success' type='submit'>
              <span className={showSpinner ? null : 'hidden'}>
                <Spinner animation='border' size='sm' />
              </span>
              <span className={showSpinner ? 'hidden' : null}>
                To Convert
              </span>
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal data-testid='modal' show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>Conversion</Modal.Header>
        <Modal.Body>{resultConversion}</Modal.Body>
        <Modal.Footer>
          <Button data-testid="btnConverter" variant='success' onClick={handleCloseModal}>New Conversion</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default CurrencyConverter;
