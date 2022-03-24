export interface Owner {
  id: number;
  name: string;
}

export interface Databas {
  date_maj_status: string;
  id: number;
  instance: Instance;
  name: string;
  owner: Owner;
  status: string;
}

export interface Dbms {
  editor: string;
  id: number;
  name: string;
  version: string;
}

export interface Application {
  direction: string;
  name: string;
}

export interface Component {
  application: Application;
  name: string;
  type: string;
}

export interface Instance {
  environment_criticality: number;
  environment_name: string;
  id: number;
  name: string;
  role: string;
  server_name: string;
  server_status: string;
  status: string;
}

export interface Role {
  component: Component;
  date_maj_status: string;
  id: number;
  instance: Instance;
  name: string;
  status: string;
  type: string;
}

export interface Partition {
  mount: string;
  name: string;
  size: any;
}

export interface Server {
  cpu: number;
  date_maj_status: string;
  description?: any;
  env: string;
  ip: string[];
  name: string;
  os_name: string;
  os_version: string;
  partitions: Partition[];
  ram: number;
  restore_srv: boolean;
  status: string;
  virtual_ips: any[];
  zone: string;
}

export interface DbInstanceDetail {
  cluster: boolean;
  databases: Databas[];
  date_creation: string;
  date_maj_status: string;
  dbid?: any;
  dbms: Dbms;
  id: number;
  ip: string;
  name: string;
  port: number;
  role: string;
  roles: Role[];
  server: Server;
  server_name: string;
  server_status: string;
  status: string;
}
