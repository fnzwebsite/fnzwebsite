import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import * as acdDataActions from '../../actions/acdDataActions'
import $ from 'jquery';

class Acd extends React.Component {
    constructor(props) {
        super(props);
        //this.props.acdDataActions.getAllAcdData();
    }

    componentWillMount() {
        this.props.acdDataActions.getAllAcdData();

    }

    loadEntities() {
        let self = this;
        //alert(JSON.stringify(this.props.acdData.name));
        const rows = Object.keys(this.props.acdData).map(function (keyName, keyIndex) {
            return (
                <tr>
                    <td>{self.props.acdData[keyName].name}</td>
                    <td>{self.props.acdData[keyName].networkEntityType}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{self.props.acdData[keyName].contact.email}</td>
                    <td>{self.props.acdData[keyName].contact.telephone}</td>
                    <td></td>
                    <td classNameName="uk-text-center">
                        <a href="#" classNameName="edit"
                           data-uk-modal="{target:'#modal_header_footer'}"><i
                            classNameName="md-icon material-icons">&#xE254;</i></a>
                        <a href="#"><i classNameName="md-icon material-icons">&#xE872;</i></a>
                    </td>
                </tr>
            )

        });

        return rows;
    }

    render() {

        if (this.props.acdData) {
            return (
                <div className="mt-6">
                    <div className="row">
                        <div className="col-md-12 wizard-list">
                            <div className="row">
                                <div className="md-card uk-margin-medium-bottom">
                                    <div className="md-card-toolbar">
                                        <h3 className="md-card-toolbar-heading-text"> ACD List</h3>
                                        <a className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light" data-uk-modal="{target:'#modal_header_footer'}" href="#"><i className="fa fa-plus"></i>ACD</a>
                                    </div>
                                    <div className="md-card-content">
                                        <table id="dt_default" className="uk-table" cellspacing="0" width="100%">
                                            <thead>
                                            <tr>
                                                <th rowspan="2">Name</th>
                                            </tr>
                                            <tr>
                                                <th>City</th>
                                                <th>Country</th>
                                                <th>Postcode</th>
                                                <th>Email</th>
                                                <th>Telephone</th>
                                                <th>Fax</th>
                                                <th className="action uk-text-center">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {this.loadEntities()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <div></div>;
        }
    }
}

// const
// mapStateToProps = (state, props) => {
//   return {
//     user: state.user
//   }
// };

const
    mapStateToProps = (state, props) => {
        return {
            acdData: state.acdData,
        }
    };


Acd.propTypes = {
    acdDataActions: PropTypes.object,
    acdData: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        acdDataActions: bindActionCreators(acdDataActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)(Acd);

//    export default TransactionsTable;
