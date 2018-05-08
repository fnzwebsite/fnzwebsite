import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

class SamplePage extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.samplePage"/>}/> */}
                <div className="d-flex justify-content-center">
                    <h1>Under Construction</h1>
                </div>

            </div>      
        );        
    }     
}       

export default SamplePage;