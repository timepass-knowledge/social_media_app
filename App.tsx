import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import Navigations from './src/navigations';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <Navigations />
    </Provider>
  );
}
