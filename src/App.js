import { Route, Routes } from 'react-router-dom';
import UserRoute from './Route/UserRoute';
import AdminRoute from './Route/AdminRoute';
import { Provider } from 'react-redux';
import { configureStore, persist, store } from './redux/store';
import { ThemeProvider } from './Context/theme.context';
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from 'notistack';


function App() {

  return (
    <>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
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
      </SnackbarProvider>
    </>
  );
}

export default App;
