import cookie from 'react-cookie'
import { config } from './Config'

export const getConfig = (parameter) => {
  var conf = cookie.load('Config');
  if (conf == null)
    conf = config['default'];
  return conf[parameter]
}
