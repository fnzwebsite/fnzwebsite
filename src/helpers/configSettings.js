import cookie from 'react-cookie'
import { config } from './configurations'

export const getConfig = (parameter) => {
  var conf = cookie.load('config');
  if (conf == null)
    conf = config['default'];
  return conf[parameter]
}
