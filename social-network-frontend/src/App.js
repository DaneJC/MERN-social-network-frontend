import React, { Component } from 'react';
import { render } from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import MainRouter from './MainRouter';

const App = () => (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
)

export default App;
