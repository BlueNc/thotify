export interface Application {
    category: string;
    classification: string;
    components: any[];
    description: string;
    direction: string;
    name: string;
    technical_contact: string[];
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
    component: any;
    date_maj_status: string;
    id: number;
    instance: Instance;
    name: string;
    status: string;
    type: string;
    server_name: string;
    instance_name: string;
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
    ports?: any;
    server_name: string;
    server_status: string;
    status: string;
    type?: any;
}

export interface InstallationsByEnv {
    environment_name: string;
    installations: Installation[];
}

export interface Link {
    component_dst: string;
    component_dst_type: string;
    component_src: string;
    component_src_type: string;
    description: string;
    id_link: number;
    type: string;
}

export interface LinkByType {
  [key: string]: Link[]
}

export interface ThotComponentDetail {
    application: Application;
    application_name: string;
    db_roles: DbRole[];
    db_roles_by_env: DbRolesByEnv[];
    description: string;
    installations: Installation[];
    installations_by_env: InstallationsByEnv[];
    linked_by: Link[];
    linked_by_type: LinkByType;
    links: Link[];
    links_by_type: LinkByType;
    name: string;
    type: string;
}
