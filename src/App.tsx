import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClientsStore } from './store/ClientStore';
import Clients from './components/Clients';
import Diagrams from './components/Diagrams';
import Header from './components/Header';
import NotFound from './components/NotFound';
import MainPage from './components/MainPage';

interface AppProps {
  clientsStore?: ClientsStore;
}

const App: React.FC<AppProps> = inject('clientsStore')(observer(({ clientsStore }) => {
  useEffect(() => {
    fetch('api/users')
      .then((response) => response.json())
      .then((data) => clientsStore.setClients(data))
      .catch((error) => {
        console.log(error);
      });
  }, [clientsStore]);

  return (
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/diagrams" element={<Diagrams />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
  );
}));

export default App;