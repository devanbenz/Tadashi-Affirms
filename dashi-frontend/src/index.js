import ReactDOM from 'react-dom';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react'

ReactDOM.render(
  <Auth0Provider
    domain='dev-11u3ws3u.us.auth0.com'
    clientId='Ljs0yTGRda6EQlpmNIfqyNBLsVuj70OX'
    redirectUri={window.location.origin}>
      <App />
    </Auth0Provider>,
  document.getElementById('root')
)