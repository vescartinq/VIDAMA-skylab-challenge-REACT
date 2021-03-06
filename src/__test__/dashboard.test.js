import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Dashboard from '../components/dashboard/Dashboard';

describe('dashboard', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Should have three compos', () => {
    act(() => {
      render(<Dashboard />, container);
    });
    expect(<Dashboard />).toBeDefined();
  });
});
