import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import acdAccountActions from '../../actions/acdAccountActions';
import AcdAccountWizard from "./AddAcdAccountWizard";
import {Link} from 'react-router-dom';
import EditAcdAccountWizard from "./EditAcdAccountWizard";



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
                // if (tableOrder) {
                //     tableAsJqeryElement.order([[tableOrder.split(',')[0], tableOrder.split(',')[1]]]).draw(false);
                // } else {
                //     tableAsJqeryElement.order([[4, 'desc']]).draw(false);
                // }
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
                let acdEditData = self.props.acdAccountData[key];
                self.props.loadEditAcdAccountData(acdEditData);
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
        if (this.props.acdAccountData) {
            LoadRows = Object.keys(this.props.acdAccountData).sort((a, b) => b.name - a.name).map(function (keyName, keyIndex) {
                return <tr>
                <td>{self.props.acdAccountData[keyName].name}</td>
                <td>{self.props.acdAccountData[keyName].accountType}</td>
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
                        <th>Account</th>
                        <th>Account Type</th>
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
            return <td colSpan='7'>No Accounts Found</td>;
        }
    },

});

class AcdAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalType: "add",
            show: true
        };
        this.loadEditAcdAccountData = this.loadEditAcdAccountData.bind(this);
        this.loadAddAcdAccountData = this.loadAddAcdAccountData.bind(this);
        this.reloadAcdAccount = this.reloadAcdAccount.bind(this);
}

    loadEditAcdAccountData(acdEditData) {
        this.setState({
            acdEditData: acdEditData,
            modalType: "edit"
        })
    }

    loadAddAcdAccountData() {
        this.setState({
            modalType: "add"
        })
    }

    componentWillMount() {
        this.props.acdAccountActions.getAccountsData();
    }

    reloadAcdAccount(){
        this.props.acdAccountActions.getAccountsData();
    }

    render() {
            return (
                <div className="container-fluid" id="page_content">

                    <div className="uk-modal" id="modal_header_footer">
                        {this.state.modalType == "add" && <AcdAccountWizard reloadAcdAccount={this.reloadAcdAccount}/>}
                        {this.state.modalType == "edit" &&<EditAcdAccountWizard reloadAcdAccount={this.reloadAcdAccount} acdEditData={this.state.acdEditData}/>}
                    </div>

                    <div className="mt-6">
                        <div className="row">
                            <div className="col-md-12 wizard-list">
                                <div className="row">
                                    <div className="md-card uk-margin-medium-bottom">
                                        <div className="md-card-toolbar">
                                            <h3 className="md-card-toolbar-heading-text">Account List</h3>
                                            <a onClick={this.loadAddAcdAccountData} className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light"
                                               data-uk-modal="{target:'#modal_header_footer'}" href="#"><i
                                                className="fa fa-plus"></i>Account</a>
                                        </div>
                                        <div className="md-card-content">
                                            <Table acdAccountData={this.props.acdAccountData} loadEditAcdAccountData={this.loadEditAcdAccountData}/>
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
            acdAccountData: state.acdAccountData,
        }
    };


AcdAccount.propTypes = {
    acdAccountActions: PropTypes.object,
    acdAccountData: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        acdAccountActions: bindActionCreators(acdAccountActions, dispatch)
    });

export default connect(mapStateToProps,
    mapDispatchToProps)(AcdAccount);
