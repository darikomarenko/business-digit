import { Provider } from 'mobx-react';
import clientsStore from './store/ClientStore.ts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clients from './components/Clients';
import Diagrams from './components/Diagrams';
import Header from './components/Header';
import NotFound from './components/NotFound';
import MainPage from './components/MainPage';
import ClientForm from './components/Clients/ClientForm';

const stores = {
  clientStore: clientsStore
}

function App() {

  return (
    <Provider {...stores}>
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
      </Provider>
  );
}

export default App;