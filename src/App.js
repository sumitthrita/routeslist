import './routeslist.css';
import Homepage from './components/Homepage';
import store from './Redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className='routeslist'>
      <Provider store={store} >
        <Homepage />
      </Provider>
    </div>
  );
}

export default App;
