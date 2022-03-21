export interface Application {
  category: string;
  classification?: any;
  description: string;
  direction: string;
  name: string;
  technical_contact: string[];
}

export interface Component {
  application: Application;
  application_name: string;
  description: string;
  name: string;
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

export interface Installation {
  component: Component;
  component_name: string;
  date_maj_status: string;
  environment_criticality: number;
  environment_name: string;
  http_host?: any;
  id: number;
  port_management?: any;
  ports: number[];
  server: Server;
  server_name: string;
  server_status: string;
  status: string;
  type: string;
  urls: string[];
}
