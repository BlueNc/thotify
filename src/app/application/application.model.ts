export interface Component {
  application_name: string;
  description: string;
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

export interface DbRole {
  component: Component;
  date_maj_status: string;
  id: number;
  instance: Instance;
  name: string;
  status: string;
  type: string;
}


export interface DbRolesByEnv {
  db_roles: DbRole[];
  environment_name: string;
}

export interface LastDeployment {
  date_of_deployment: string;
  version: string;
}

export interface Installation {
  component_name: string;
  date_maj_status: string;
  environment_criticality: number;
  environment_name: string;
  http_host?: any;
  id: number;
  last_deployment: LastDeployment;
  port_management?: any;
  ports: number[];
  server_name: string;
  server_status: string;
  status: string;
  type: string;
}

export interface Server {
  installations: Installation[];
  name: string;
}

export interface InstallationsByEnvSrv {
  environment_name: string;
  servers: Server[];
}

export interface Application {
  components: Component[];
  db_roles: DbRole[];
  db_roles_by_env: DbRolesByEnv[];
  description: string;
  direction: string;
  installations: Installation[];
  installations_by_env_srv: InstallationsByEnvSrv[];
  name: string;
  technical_contact: string[];
}

