import React, {useEffect} from 'react';

import NavContainer from './src/navigation/RootNavigation';
import withProvider from './src/redux/withProvider';

const App = () => {
  useEffect(() => {
    RNCalendarEvents.authorizationStatus();
    RNCalendarEvents.authorizeEventStore();
  }, []);

  console.disableYellowBox = true;

  return (
    <>
      <NavContainer />
    </>
  );
};

export default withProvider(App);
