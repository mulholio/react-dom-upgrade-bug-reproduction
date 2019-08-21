import React, { Component } from 'react';
import Router from 'next/router';
import { render } from '@testing-library/react';
import MyApp from './_app';

// This is to mock the locale we add on in a custom server.js
// (not implemented in this reproduction)
const reqMock = { locale: 'en' };

class TestComponent extends Component {
  static async getInitialProps({ query }) {
    return {};
  }
  render() {
    return (
      <div>Component</div>
    )
  }
}

describe('MyApp', () => {
  it(
    'renders the sub component',
    async () => {
      const props = await MyApp.getInitialProps({
        Component: TestComponent,
        ctx: {
          req: reqMock,
        },
      });

      const mockedRouter = { pathname: '/web-client-test/' };
      Router.router = mockedRouter;

      const memriseApp = (
        <MyApp
          {...props}
          Component={TestComponent}
          router={Router.router}
        />
      );

      const { getByText } = render(memriseApp);
      expect(
        getByText('Component'),
      ).toBeInTheDocument();
    });
});
