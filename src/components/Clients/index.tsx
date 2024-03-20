import React from 'react';
import { inject, observer } from 'mobx-react';
import { ClientsStore } from '../../store/ClientStore';
import { Client } from '../../store/ClientStore';
import { deleteUser } from '../../api'
import {Link, redirect} from 'react-router-dom'
interface ClientsProps {
  clientsStore?: ClientsStore;
}

const Clients: React.FC<ClientsProps> = ({ clientsStore }) => {
  if (!clientsStore) return null;

  const clients = clientsStore.clients || [];

  const handleDeleteUser = (user: Client) => {
    alert('Уверены?')
    deleteUser(user.id);
    alert(`Удалено: ${user.surname}`)
    return redirect ("/clients")
  };

  const handleClick = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };
  return (
    <div>
      <button type='button' onClick={handleClick}> <Link to='/addclient'>Добавить клиента</Link></button>
        <table>
          <thead>
            <tr>
              <th>Выбрать</th>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Email</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
          {clients.map((client: Client, index: number) => (
            <tr key={index}>
              <td><input type="checkbox"></input></td>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.surname}</td>
              <td>{client.email}</td>
              <td><button type='button'onClick={() => handleDeleteUser(client)}>Удалить</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default inject('clientsStore')(observer(Clients));