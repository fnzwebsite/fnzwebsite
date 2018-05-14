import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

import Account from 'components/Admin/view/AcdAccount'

class SamplePage extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.samplePage"/>}/> */}
                <div className="d-flex justify-content-center">
                    <Account/>
                </div>

            </div>      
        );        
    }     
}       

export default SamplePage;