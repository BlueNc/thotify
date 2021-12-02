import packageInfo from '../../package.json';

export const environment = {
  production: true,
  version: packageInfo.version,
  apiUrl: 'https://thot.ref.gnc'
};
