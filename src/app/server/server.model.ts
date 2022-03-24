export interface LastDeployment {
  date_of_deployment: string;
  version: string;
}

export interface Installation {
  component_name: string;
  date_maj_status: string;
  environment_criticality: number;
  environment_name: string;
  http_host?: string[];
  id: number;
  last_deployment: LastDeployment;
  port_management?: number;
  ports?: any[];
  server_name: string;
  server_status: string;
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
  date_maj_status?: Date;
  description?: string;
  env: string;
  installations: Installation[];
  ip: string[];
  name: string;
  os_name: string;
  os_version: string;
  partitions: Partition[];
  ram: number;
  restore_srv: boolean;
  status: string;
  virtual_ips: string[];
  zone: string;
}

export interface Dbms {
  editor: string;
  id: number;
  name: string;
  version: string;
}

export interface DbInstance {
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
  server_name: string;
  server_status: string;
  status: string;
}
