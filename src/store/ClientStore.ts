import { makeAutoObservable } from 'mobx';

export type Client = {
  id: number;
  name: string;
  surname: string;
  email: string;
  
};

export class ClientsStore {
  clients: Client[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setClients(clients: Client[]) {
    this.clients = clients;
  }

  addClient(client: Client) {
    this.clients.push(client);
  }

  deleteClient(index: number) {
    this.clients.splice(index, 1);
  }

  updateClient(index: number, client: Client) {
    this.clients[index] = client;
  }
}

const clientsStore = new ClientsStore();
export default clientsStore;