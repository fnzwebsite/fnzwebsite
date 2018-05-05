import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import acdAccountActions from '../actions/acdAccountActions';
import AcdAccountWizard from "./AddAcdAccountWizard";
import {Link} from 'react-router-dom';
import EditAcdAccountWizard from "./EditAcdAccountWizard";

var createReactClass = require('create-react-class');
var tableAsJqeryElement = null;
var Table = createReactClass({
    componentDidMount: function () {
    },
    componentDidUpdate: function (prevProps, prevState) {
        this.loadDataTable();
    },
    componentWillReceiveProps: function (prevProps, prevState) {
         this.loadDataTable();
    },
    loadDataTable: function () {
        window.$('#table').dataTable({
            "order": [[0, "desc"]],
            "bDestroy": true
        });
        let self = this;
        window.$('#table tbody').on('click', 'a.handle-edit-modal', function (e) {
            let key = window.$(this).data("id")
            let acdAccountEditData = self.props.acdAccountData[key];
            self.props.loadEditAcdAccountData(acdAccountEditData);

        });
    },

    render: function () {
        let LoadRows = null;
        let self = this;
        //alert(JSON.stringify(this.props.acdAccountData));
        //console.log(JSON.stringify(this.props.acdAccountData));
        if (this.props.acdAccountData) {
            LoadRows = Object.keys(this.props.acdAccountData).sort((a, b) => b.identifier - a.identifier).map(function (keyName, keyIndex) {
                return <tr>
                <td>{self.props.acdAccountData[keyName].name}</td>
               <td>{self.props.acdAccountData[keyName].accountType}</td>
                    <td class="uk-text-center">
                        <Link to={'/acdaccount'} params={{ testvalue: "hello" }} className="handle-edit-modal" data-id={keyName}
                           data-uk-modal="{target:'#modal_header_footer'}"><i
                            class="md-icon material-icons">&#xE254;</i></Link>
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
//        this.props.acdDataActions.getAllAcdData();
//        this.handleClick = this.handleClick.bind(this);
        this.loadEditAcdAccountData = this.loadEditAcdAccountData.bind(this);
        this.loadAddAcdData = this.loadAddAcdData.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
    }

    loadEditAcdAccountData(acdAccountEditData) {
        this.setState({
            acdAccountEditData: acdAccountEditData,
            modalType: "edit"
        })
    }
    updateAccount(){
        this.props.acdAccountActions.getAccountsData();
    }
    loadAddAcdData() {
        this.setState({
            modalType: "add"
        })
    }

    componentWillMount() {
        this.props.acdAccountActions.getAccountsData();
    }

//     handleClick(event) {
// //      alert('handle click...');
//         this.props.acdInstrumentActions.postAcdData(this.state);
//     }

    render() {


            return (
                <div className="container-fluid" id="page_content">
                    <div className="uk-modal" id="modal_header_footer">
                        {this.state.modalType == "add" && <AcdAccountWizard updateAccount={this.updateAccount}/>}
                        {this.state.modalType == "edit" &&<EditAcdAccountWizard acdAccountEditData={this.state.acdAccountEditData}/>}
                    </div>
                    <div className="mt-6">
                        <div className="row">
                            <div className="col-md-12 wizard-list">
                                <div className="row">
                                    <div className="md-card uk-margin-medium-bottom">
                                        <div className="md-card-toolbar">
                                            <h3 className="md-card-toolbar-heading-text"> Account List</h3>
                                            <a onClick={this.loadAddAcdData} className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light"
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

// const
// mapStateToProps = (state, props) => {
//   return {
//     user: state.user
//   }
// };

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

//    export default TransactionsTable;
