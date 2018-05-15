import * as allActions from 'actions/allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpDirectPost }  from 'utils/Utils';


const organisationActions = {
    getOrganisationData: () => {
        return dispatch => {
            httpGet('getcompany')
                .then((data) => {

                    dispatch({type: allActions.RECEIVE_ORGANISATION_DATA, organisationData: data});
                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');
                    dispatch(push('/#/signin'))
            });
        };
    },

    postCompanyData: (body) => {
        return dispatch => {
            httpDirectPost('company',body)
                .then((data) => {
                    dispatch({type: allActions.POST_ORGANISATION_DATA, postOrganisationData: data[0]});

                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    dispatch(push('/signin'))
            });
        };
    }
};




export default organisationActions;
