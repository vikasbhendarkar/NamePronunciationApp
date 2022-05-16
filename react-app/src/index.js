import React from 'react';
import ReactDOM from 'react-dom';
import NamePronunciationApp from './App';
import * as serviceWorker from './serviceWorker';

// Rendering our NamePronunciationApp at the index.html <div> section of id 'root'.
// Hosted via Nginx Web server.
ReactDOM.render(<NamePronunciationApp />, document.getElementById('root'));

serviceWorker.unregister();
