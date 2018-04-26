import * as allActions from './allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpPost,httpNodeServerPost }  from '../utils';


const acdDataActions = {
    getAllAcdData: () => {
        return dispatch => {
                httpGet('getacd')
                .then((data) => {

                    dispatch({type: allActions.RECEIVE_ACD_DATA, acdData: data});
                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');
                    dispatch(push('/sign_in'))
            });
        };
    },

    postAcdData:(formData)=>{
//      alert('postacddata...');
console.log(JSON.stringify(formData));
const reqData={
  "companyType":"smt","name":"smt16",
  "registeredAddress":{"addressLine1":"ad1","addressLine2":"ad2","city":"c1","county":"",
  "country":"","postcode":""},
  "postalAddress":{"addressLine1":"ad2","addressLine2":"ad22","city":"","county":"","country":""
  ,"postcode":""},"domicile":"","amlStatus":"","kycStatus":"",
  "relationshipManager":{"name":"TestUser","email":"test@example.com"},
  "instrumentType":"","telephone":"","fax":"","email":"","ucitisCompliant":true}
      return dispatch=>{
        httpNodeServerPost('postacd',reqData)
        .then((data)=>{
            alert('sucess...');
  //          dispatch({type: allActions.RECEIVE_ACD_DATA, acdData: data});
        }).catch(err => {
         alert(JSON.stringify(err));
        if (err.message == "Token Expired or Token not valid.")
            dispatch(push('/sign_in'))
    });
      }
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


export default acdDataActions;
