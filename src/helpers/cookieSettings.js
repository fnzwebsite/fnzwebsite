import cookie from 'react-cookie'
import { config } from '/configurations'

export default class Root extends Component {
  componentWillMount() {
    cookie.save('config', config.default)
  }
}
