import React from 'react';
import { inject, observer } from 'mobx-react';
import { ClientsStore } from './store/ClientStore';
import { Client } from '../../store/ClientStore';
interface ClientsProps {
  clientsStore?: ClientsStore;
}

const Clients: React.FC<ClientsProps> = ({ clientsStore }) => {
  if (!clientsStore) return null;

  const clients = clientsStore.clients || [];

  return (
    <div>
      {clients.map((client: Client, index: number) => (
        <div key={index}>
          <div>{client.id}</div>
          <div>{client.name}</div>
          <div>{client.email}</div>
        </div>
      ))}
    </div>
  );
}

export default inject('clientsStore')(observer(Clients));