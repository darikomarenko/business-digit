import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClientsStore } from './store/ClientStore';
import Clients from './components/Clients';
import Diagrams from './components/Diagrams';
import Header from './components/Header';
import NotFound from './components/NotFound';
import MainPage from './components/MainPage';
import ClientForm from './components/Clients/ClientForm';
import { fetchUsers } from './api'
interface AppProps {
  clientsStore: ClientsStore;
}

const App: React.FC<AppProps> = inject('clientsStore')(observer(({ clientsStore }) => {
  useEffect(() => {
    const data = fetchUsers()
    clientsStore.setClients(data)
  }, [clientsStore]);

  return (
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/addclient" element={<ClientForm />} />
            <Route path="/diagrams" element={<Diagrams />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
  );
}));

export default App;