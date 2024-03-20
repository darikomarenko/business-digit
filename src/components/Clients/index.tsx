import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { ClientsStore } from '../../store/ClientStore';
import { Client } from '../../store/ClientStore';
import { deleteUser } from '../../api';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss'

interface ClientsProps {
  clientsStore?: ClientsStore;
}

const Clients: React.FC<ClientsProps> = ({ clientsStore }) => {
  if (!clientsStore) return null;

  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const clients = clientsStore.clients || [];

  const handleDeleteUser = () => {
    if (selectedClients.length === 0) {
      alert('Please select at least one client to delete');
      return;
    }

    if (window.confirm('Are you sure you want to delete the selected clients?')) {
      selectedClients.forEach((clientId) => {
        const selectedUser = clients.find((client) => client.id === clientId);
        if (selectedUser) {
          deleteUser(selectedUser.id);
          alert(`Deleted: ${selectedUser.surname}`);
        }
      });
      //надо обновить LS
    }
  };

  const handleCheckboxChange = (clientId: number) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter((id) => id !== clientId));
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  };

  return (
    <div className={styles['clients']}>
      <button type='button' className={styles['clients__button']}> <Link to='/addclient'>Добавить</Link></button>
      <button type='button' onClick={handleDeleteUser} className={styles['clients__button']}>Удалить</button>
      <table className={styles['clients__table']}>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client: Client, index: number) => (
            <tr key={index}>
              <td>
                <input 
                  type="checkbox"
                  onChange={() => handleCheckboxChange(client.id)} 
                  checked={selectedClients.includes(client.id)}
                />
              </td>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.surname}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default inject('clientsStore')(observer(Clients));