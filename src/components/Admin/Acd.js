import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import * as acdDataActions from '../../actions/acdDataActions'
import $ from 'jquery';
import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';
// import 'datatables.net-responsive/js/dataTables.responsive';
// import 'datatables.net-responsive-dt/css/responsive.dataTables.css';

var createReactClass = require('create-react-class');
var tableAsJqeryElement = null;
var Table = createReactClass({
    componentDidMount: function () {
        //this.loadDataTable();
    },
    componentDidUpdate: function (prevProps, prevState) {
        //this.loadDataTable();
    },
    componentWillReceiveProps: function (prevProps, prevState) {
        if(prevProps.loadThisDay != this.props.loadThisDay || prevProps.dealingData !=  this.props.dealingData) {
            if (tableAsJqeryElement) {
                tableAsJqeryElement.fnDestroy();
                tableAsJqeryElement = null;
            }
        }
//        this.loadDataTable();
    },
    loadDataTable: function () {
        setTimeout(function () {
            // tableAsJqeryElement = $('#table').dataTable();
            if (tableAsJqeryElement) {
                tableAsJqeryElement.fnDraw();
            }
        }, 0)
    },

    render: function () {
        let self = this;
        //alert(JSON.stringify(this.props.acdData.name));
        let rows = Object.keys(this.props.acdData).map(function (keyName, keyIndex) {
            return (
                <tr>

                </tr>
            )

        });
        // rows = rows.filter(function (item) {
        //     return item != undefined
        // })

        return (
                <table id="table" className="uk-table" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Network</th>
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
                    {rows}
                    </tbody>
                </table>
            )
    }
});

class Acd extends React.Component {
    constructor(props) {
        super(props);
        //this.props.acdDataActions.getAllAcdData();
    }

    componentWillMount() {
        this.props.acdDataActions.getAllAcdData();

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
                                        <h3 className="md-card-toolbar-heading-text"> Entities</h3>
                                        <a className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light" data-uk-modal="{target:'#modal_header_footer'}" href="#"><i className="fa fa-plus"></i>Entity</a>
                                    </div>
                                    <div className="md-card-content">
                                        <Table acdData={this.props.acdData} />
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
