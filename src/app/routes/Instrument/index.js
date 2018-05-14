import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

import Instrument from 'components/Admin/view/AcdInstrument'

class SamplePage extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.samplePage"/>}/> */}
                <div className="d-flex justify-content-center">
                    <Instrument/>
                </div>

            </div>      
        );        
    }     
}       

export default SamplePage;