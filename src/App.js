import React from 'react';
import { withAuthenticator, AmplifyGreetings } from '@aws-amplify/ui-react'


function App() {
  return (
    <div className="App">
      <AmplifyGreetings username="testUsername"></AmplifyGreetings>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
