import {connect} from 'react-redux';
import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import acdDataActions from '../actions/acdDataActions'
import AddAcdWizard from "./AddAcdWizard";
import EditAcdWizard from "./EditAcdWizard";


var createReactClass = require('create-react-class');
var tableAsJqeryElement = null;
var Table = createReactClass({
    resetTable: function (seconds) {
        if (tableAsJqeryElement) {
            setTimeout(function() {
                tableAsJqeryElement
                    .rows()
                    .draw();
                let tableOrder = localStorage.getItem('orderAcd');
                if (tableOrder) {
                    tableAsJqeryElement.order([[tableOrder.split(',')[0], tableOrder.split(',')[1]]]).draw(false);
                } else {
                    tableAsJqeryElement.order([[4, 'desc']]).draw(false);
                }
            }, seconds);
        }
    },

    componentDidMount: function () {
        this.resetTable(500);
    },
    componentDidUpdate: function (prevProps, prevState) {
        // this.resetTable(500);
    },
    componentWillReceiveProps: function (prevProps, prevState) {
    },
    loadDataTable: function (elem) {
        if(tableAsJqeryElement == null) {
            var self = this;
            window.$('a.handle-edit-modal').off('click');
            window.$('a.handle-edit-modal').on('click', function (e) {
                let key = window.$(this).data("id")
                let acdEditData = self.props.acdData[key];
                self.props.loadEditAcdData(acdEditData);
            });
        }

        tableAsJqeryElement = window.$(elem).DataTable();
        if (tableAsJqeryElement) {
            tableAsJqeryElement.on('order.dt', function(e, dt, type, indexes) {
                if (tableAsJqeryElement) {
                    var order = tableAsJqeryElement.order();
                    if (order != undefined && order.length > 0 && order[0][0] != 0 && order[0][1] != undefined) {
                        localStorage.setItem('orderAcd', order);
                    }
                }
            });
        }
    },
    render: function () {
        let LoadRows = null;
        let self = this;
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
                    <td className="uk-text-center">
                        <a className="handle-edit-modal" data-id={keyName}
                              data-uk-modal="{target:'#modal_header_footer'}"><i
                            className="md-icon material-icons">&#xE254;</i></a>
                        <a href="#"><i className="md-icon material-icons">&#xE872;</i></a>
                    </td>
                </tr>
            });

            LoadRows = LoadRows.filter(function (item) {
                return item != undefined
            })

            return (
                <div style={{minHeight: '200px'}}>
                    <table ref={elem => this.loadDataTable(elem)} id="table" className="stripe" cellSpacing="0" width="100%">
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
            return <td colSpan='7'>No Companies Found</td>;
        }
    },

});

class Acd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalType: "add",
            show: true
        };

        this.loadEditAcdData = this.loadEditAcdData.bind(this);
        this.loadAddAcdData = this.loadAddAcdData.bind(this);
        this.updateAcd = this.updateAcd.bind(this);


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
        this.setState({
            acdEditData: acdEditData,
            modalType: "edit"
        })
    }

    loadAddAcdData() {
        this.setState({
            modalType: "add"
        })
    }

    componentWillMount() {
        this.props.acdDataActions.getAllAcdData();
    }



    updateAcd(){
        this.props.acdDataActions.getAllAcdData();
    }

    render() {
            return (
                <div className="container-fluid" id="page_content">

                    <div className="uk-modal" id="modal_header_footer">
                        {this.state.modalType == "add" && <AddAcdWizard updateAcd={this.updateAcd}/>}
                        {this.state.modalType == "edit" &&<EditAcdWizard reloadAcd={this.reloadAcd} acdEditData={this.state.acdEditData}/>}
                    </div>

                    <div className="mt-6">
                        <div className="row">
                            <div className="col-md-12 wizard-list">
                                <div className="row">
                                    <div className="md-card uk-margin-medium-bottom">
                                        <div className="md-card-toolbar">
                                            <h3 className="md-card-toolbar-heading-text">Companies</h3>
                                            <a onClick={this.loadAddAcdData} className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light"
                                               data-uk-modal="{target:'#modal_header_footer'}" href="#"><i
                                                className="fa fa-plus"></i>Company</a>
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
