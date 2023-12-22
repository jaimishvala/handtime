import { Route, Routes } from 'react-router-dom';
import UserRoute from './Route/UserRoute';
import AdminRoute from './Route/AdminRoute';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { ThemeProvider } from './Context/theme.context';
import { PersistGate } from 'redux-persist/integration/react'


function App() {
  let { store, persist } = configureStore()

  return (
    <>
      <ThemeProvider> 
        <Provider store={store}>
          <PersistGate loading={null} persistor={persist}>
            <Routes>
              <Route exact path='/*' element={<UserRoute />} />

              <Route exact path='/Admin/*' element={<AdminRoute />} />
            </Routes>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
