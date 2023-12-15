import { Route, Routes } from 'react-router-dom';
import UserRoute from './Route/UserRoute';
import AdminRoute from './Route/AdminRoute';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { ThemeProvider } from './Context/theme.context';

function App() {
  let store = configureStore()

  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <Routes>
            <Route exact path='/*' element={<UserRoute />} />

            <Route exact path='/Admin/*' element={<AdminRoute />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
