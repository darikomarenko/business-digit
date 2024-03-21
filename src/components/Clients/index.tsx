import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import clientsStore, { Client } from '../../store/ClientStore';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';


const Clients: React.FC = observer(() => {

    useEffect(() => {
      clientsStore.getClients()
    }, []);

    const [selectedClients, setSelectedClients] = useState<number[]>([]);

    const handleDeleteUser = () => {
      if (selectedClients.length === 0) {
        alert('Выберите минимум одного пользователя');
        return;
      }

      if (window.confirm('Уверены, что хотите удалить??')) {
        selectedClients.forEach((clientId) => {
          const selectedUser = clientsStore.clients.find((client) => client.id === clientId);
          if (selectedUser) {
              clientsStore.deleteClient(selectedUser.id);
            }
          })
        alert(`Удалено клиентов: ${selectedClients.length}`);
        setSelectedClients([]);
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
        <button type='button' className={styles['clients__button']}>
          <Link to='/addclient'>Добавить</Link>
        </button>
        <button type='button' onClick={handleDeleteUser} className={styles['clients__button']}>
          Удалить
        </button>
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
            {clientsStore.clients.map((client: Client, index: number) => (
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
  })

export default Clients;