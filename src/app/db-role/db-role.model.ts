export interface Application {
  direction: string;
  name: string;
}

export interface Component {
  application: Application;
  name: string;
  type: string;
}

export interface Dbms {
  editor: string;
  id: number;
  name: string;
  version: string;
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

export interface Instance {
  cluster: boolean;
  date_creation: string;
  date_maj_status: string;
  dbid?: any;
  dbms: Dbms;
  id: number;
  ip: string;
  name: string;
  port: number;
  role: string;
  server: Server;
  server_name: string;
  server_status: string;
  status: string;
}

export interface OwnedDatabas {
  date_maj_status: string;
  db_instance_id: number;
  db_role_id: number;
  id: number;
  id_db_role: number;
  instance_name: string;
  name: string;
  role_name: string;
  server_name: string;
  status: string;
}

export interface Database {
  id: number;
  name: string;
  status: string;
}

export interface Role {
  date_maj_status: string;
  name: string;
  status: string;
}

export interface Privilege {
  database: Database;
  db_database_id: number;
  id: number;
  privilege: string;
  role: Role;
}

export interface DbRole {
  component: Component;
  date_maj_status: string;
  id: number;
  instance: Instance;
  name: string;
  owned_databases: OwnedDatabas[];
  privileges: Privilege[];
  status: string;
  type: string;
}
