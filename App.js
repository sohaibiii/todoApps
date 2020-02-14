import React from 'react';

import NavContainer from './src/navigation/RootNavigation';
import withProvider from './src/redux/withProvider';

const App = () => {
  return (
    <>
      <NavContainer />
    </>
  );
};

export default withProvider(App);
