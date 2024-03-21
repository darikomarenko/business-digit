import { makeAutoObservable, runInAction } from 'mobx';
import { addUser, deleteUser, fetchUsers, updateUser } from '../api';

export type Client = {
    id: number
    name: string
    patronymic: string
    surname: string
    email: string
    phone: string
    address: string
};

export class ClientsStore {
  clients: Client[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getClients() {
    try {
      const users = await fetchUsers()
      console.log(users);
      runInAction(() => this.clients = users.map((u) => u as Client));
    } catch (e) {
      console.log(e)
    }
  }

  async addClient(client: Client) {
    try {
      await addUser(client)
      runInAction(() => this.clients.push(client));
    } catch (e) {
      console.log(e)
    }
  }

  async deleteClient(clientID: number) {
    try {
      await deleteUser(clientID)
      runInAction(() => this.clients = this.clients.filter((u) => u.id != clientID)); 
    } catch (e) {
      console.log(e)
    }
  }

  async updateClient(client: Client) {
    try {
      await updateUser(client)
      runInAction(() => this.clients = this.clients.map((u) => u.id == client.id ? client : u));
    } catch (e) {
      console.log(e)
    }
  }
}

const clientsStore = new ClientsStore();
export default clientsStore;