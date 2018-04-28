import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import acdDealActions from '../../actions/acdDealActions';
//import * from 'jquery';
// import $ from 'jquery';
// import 'datatables.net';
import AcdDealWizard from "./AddAcdDealWizard";
import {Link} from 'react-router-dom';
import EditAcdDealWizard from "./EditAcdDealWizard";
import acdAccountActions from '../../actions/acdAccountActions'

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
        // if (prevProps.loadThisDay != this.props.loadThisDay || prevProps.dealingData != this.props.dealingData) {
        //     if (tableAsJqeryElement) {
        //         tableAsJqeryElement.fnDestroy();
        //         tableAsJqeryElement = null;
        //     }
        // }
        // this.loadDataTable();
    },
    loadDataTable: function () {
        window.$('#table').dataTable({
            "order": [[0, "desc"]],
            "bDestroy": true
        });
        let self = this;
        window.$('#table tbody').on('click', 'a.handle-edit-modal', function (e) {
            let key = window.$(this).data("id")
            let acdDealEditData = self.props.acdDealData[key];
        });
    },

    render: function () {
        let LoadRows = null;
        let self = this;
        //console.log('acc'+JSON.stringify(this.props.acdAccountData));
        var accountsData=[];

        if(this.props.acdAccountData){
        Object.keys(this.props.acdAccountData).sort((a, b) => b.name - a.name).map(function (keyName, keyIndex) {
            accountsData[keyIndex]=(self.props.acdAccountData[keyName].identifier)
          })
        }
        else {
          accountsData.push("No Accounts found");
        }
        console.log(accountsData);
        if (this.props.acdDealData) {
            LoadRows = Object.keys(this.props.acdDealData).sort((a, b) => b.name - a.name).map(function (keyName, keyIndex) {
                return <tr>
                <td>{self.props.acdDealData[keyName].account}</td>
               <td>{self.props.acdDealData[keyName].dealType}</td>
               <td></td>
               <td></td>
              <td>{self.props.acdDealData[keyName].currency}</td>
              <td class="uk-text-center">
                        <Link to={'/acddeal'} params={{ testvalue: "hello" }} className="handle-edit-modal" data-id={keyName}
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
                        <th>Account</th>
                        <th>Deal type</th>
                        <th>Fund</th>
                        <th>Quantity</th>
                        <th>Currency</th>
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

class AcdDeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalType: "add",
            show: true
        };
//        this.props.acdDataActions.getAllAcdData();
//        this.handleClick = this.handleClick.bind(this);
        this.loadEditDealAcdData = this.loadEditDealAcdData.bind(this);
        this.loadAddDealData = this.loadAddDealData.bind(this);
    }

    loadEditDealAcdData(acdDealEditData) {
        this.setState({
            acdDealEditData: acdDealEditData,
            modalType: "edit"
        })
    }

    loadAddDealData() {
        this.setState({
            modalType: "add"
        })
    }

    componentWillMount() {
        this.props.acdDealActions.getDealData();
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
                        {this.state.modalType == "add" && <AcdDealWizard/>}
                        {this.state.modalType == "edit" &&<EditAcdDealWizard acdDealEditData={this.state.acdDealEditData}/>}
                    </div>
                    <div className="mt-6">
                        <div className="row">
                            <div className="col-md-12 wizard-list">
                                <div className="row">
                                    <div className="md-card uk-margin-medium-bottom">
                                        <div className="md-card-toolbar">
                                            <h3 className="md-card-toolbar-heading-text"> Deal List</h3>
                                            <a onClick={this.loadAddDealData} className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light"
                                               data-uk-modal="{target:'#modal_header_footer'}" href="#"><i
                                                className="fa fa-plus"></i>Deal</a>
                                        </div>
                                        <div className="md-card-content">
                                            <Table acdDealData={this.props.acdDealData} loadEditDealAcdData={this.loadEditDealAcdData} acdAccountData={this.props.acdAccountData}/>
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
            acdDealData: state.acdDealData,
            acdAccountData: state.acdAccountData
        }
    };


AcdDeal.propTypes = {
    acdDealActions: PropTypes.object,
    acdDealData: PropTypes.array,
    acdAccountActions: PropTypes.object,
    acdAccountData: PropTypes.array,
    accounts: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        acdDealActions: bindActionCreators(acdDealActions, dispatch),
        acdAccountActions: bindActionCreators(acdAccountActions, dispatch)
    });

export default connect(mapStateToProps,
    mapDispatchToProps)(AcdDeal);

//    export default TransactionsTable;
