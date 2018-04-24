import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import acdDataActions from '../../actions/acdDataActions'
//import * from 'jquery';
import $ from 'jquery';
import 'datatables.net';
import AcdWizard from "../Admin/AcdWizard";
import {Link} from 'react-router-dom';

var createReactClass = require('create-react-class');
var tableAsJqeryElement = null;
var Table = createReactClass({
    componentDidMount: function () {
        //   const list = ['ReactJS', 'JSX', 'JavaScript', 'jQuery', 'jQuery UI'];
        this.loadDataTable();
        // $(document).on('click', '#editRow', function(){
        //   //alert('edit....')
        //     $("#modal_header_footer").addClass("uk-open");
        //       $("#modal_header_footer").attr("aria-expanded","true");
        //         $("#modal_header_footer").modal('show');
        //     //  this.trigger("show.uk.dropdown",$("#modal_header_footer"))
        //
        // });

    },
    componentDidUpdate: function (prevProps, prevState) {
        this.loadDataTable();
    },
    componentWillReceiveProps: function (prevProps, prevState) {
        if (prevProps.loadThisDay != this.props.loadThisDay || prevProps.dealingData != this.props.dealingData) {
            if (tableAsJqeryElement) {
                tableAsJqeryElement.fnDestroy();
                tableAsJqeryElement = null;
            }
        }
        this.loadDataTable();
    },
    loadDataTable: function () {
        let self = this;
        setTimeout(function () {
            tableAsJqeryElement = $('#table').dataTable({
                "order": [[0, "desc"]]
            });
            if (tableAsJqeryElement) {
                tableAsJqeryElement.fnDraw();
            }

            $('#table tbody').on('click', 'a.handle-edit-modal', function (e) {
                let key = $(this).data("id")
                let acdEditData = self.props.acdData[key];
                self.props.loadEditAcdData(acdEditData);
            });
        }, 0)
    },

    render: function () {
        let LoadRows = null;
        let self = this;
        //console.log(JSON.stringify(this.props.acdData));
        if (this.props.acdData) {
            LoadRows = Object.keys(this.props.acdData).sort((a, b) => b.name - a.name).map(function (keyName, keyIndex) {
                return <tr>
                    <td>{self.props.acdData[keyName].name}</td>
                    <td>{self.props.acdData[keyName].registeredAddress.city}</td>
                    <td>{self.props.acdData[keyName].registeredAddress.country}</td>
                    <td>{self.props.acdData[keyName].registeredAddress.postcode}</td>
                    <td>{self.props.acdData[keyName].email}</td>
                    <td>{self.props.acdData[keyName].telephone}</td>
                    <td>{self.props.acdData[keyName].fax}</td>
                    <td class="uk-text-center">
                        <Link to={{ pathname: '/acd', state: { foo: 'bar'} }}>My route</Link>
                        <Link to={'/acd'} params={{ testvalue: "hello" }} className="handle-edit-modal" data-id={keyName}
                           data-uk-modal="{target:'#modal_header_footer'}"><i
                            class="md-icon material-icons">&#xE254;</i></Link>
                        <a href="#"><i class="md-icon material-icons">&#xE872;</i></a>
                    </td>
                </tr>
            });

            LoadRows = LoadRows.filter(function (item) {
                return item != undefined
            })

            return (
                <div style={{minHeight: '200px'}}>
                    <table id="table" className="stripe" cellSpacing="0" width="100%">
                        <thead>
                        <tr>
                            <th>Name</th>
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
                        {LoadRows}
                        </tbody>
                    </table>

                </div>
            );
        } else {
            return <p>no data</p>;
        }
    },

});

class Acd extends React.Component {
    constructor(props) {
        super(props);
//        this.props.acdDataActions.getAllAcdData();
        this.handleClick = this.handleClick.bind(this);
        this.loadEditAcdData = this.loadEditAcdData.bind(this);


        this.state = {
            companyType: "TA",
            name: "smt15",
            registeredAddress: {
                addressLine1: "ad1",
                addressLine2: "ad2",
                city: "c1",
                county: "",
                country: "",
                postcode: ""
            },
            postalAddress: {
                addressLine1: "ad2",
                addressLine2: "ad22",
                city: "",
                county: "",
                country: "",
                postcode: ""
            },
            domicile: "",
            amlStatus: "",
            kycStatus: "",
            relationshipManager: {
                name: "TestUser",
                email: "test@example.com"
            },
            instrumentType: "",
            telephone: "",
            fax: "",
            email: "",
            ucitisCompliant: true,
            acdEditData: null
        };
    }

    loadEditAcdData(acdEditData) {
        // this.setState({
        //     acdEditData: acdEditData
        // })
    }

    componentWillMount() {
        this.props.acdDataActions.getAllAcdData();
    }

    handleClick(event) {
//      alert('handle click...');
        this.props.acdDataActions.postAcdData(this.state);
    }

    render() {


            return (
                <div className="container-fluid" id="page_content">
                    <div className="uk-modal" id="modal_header_footer">
                        <AcdWizard acdEditData={this.state.acdEditData}/>
                    </div>
                    <div className="mt-6">
                        <div className="row">
                            <div className="col-md-12 wizard-list">
                                <div className="row">
                                    <div className="md-card uk-margin-medium-bottom">
                                        <div className="md-card-toolbar">
                                            <h3 className="md-card-toolbar-heading-text"> Entities</h3>
                                            <a className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light"
                                               data-uk-modal="{target:'#modal_header_footer'}" href="#"><i
                                                className="fa fa-plus"></i>Entity</a>
                                        </div>
                                        <div className="md-card-content">
                                            <Table acdData={this.props.acdData} loadEditAcdData={this.loadEditAcdData}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )

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
