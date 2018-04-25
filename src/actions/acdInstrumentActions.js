import * as allActions from './allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpPost,httpNodeServerPost }  from '../utils';


const acdInstrumentActions = {
    getInstrumentData: () => {
        return dispatch => {
                httpGet('getInstrument')
                .then((data) => {

                    dispatch({type: allActions.RECEIVE_ACDINSTRUMENT_DATA, acdInstrumentData: data});
                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    dispatch(push('/sign_in'))
            });
        };
    }
};


// export function AddAcdData(body){
//   return fetch('http://35.178.56.52:8081/api/v1/company', {
//       method: 'POST',
//       mode: 'CORS',
//       body: JSON.stringify(body),
//       headers: {
//           'Authorization':authHeader()
//       }
//   }).then(res => {
//     debugger;
//       return res;
// })
// }


export default acdInstrumentActions;
