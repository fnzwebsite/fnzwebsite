import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import acdInstrumentActions from '../../actions/acdInstrumentActions';
//import * from 'jquery';
// import $ from 'jquery';
// import 'datatables.net';
import AcdInstrumentWizard from "./AddAcdInstrumentWizard";
import {Link} from 'react-router-dom';
import EditInstrumentWizard from "./EditAcdInstrumentWizard";

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
            let acdInstrumentEditData = self.props.acdInstrumentData[key];
            self.props.loadEditInstrumentAcdData(acdInstrumentEditData);

        });
    },

    render: function () {
        let LoadRows = null;
        let self = this;
        console.log(JSON.stringify(this.props.acdInstrumentData));
        if (this.props.acdInstrumentData) {
            LoadRows = Object.keys(this.props.acdInstrumentData).sort((a, b) => b.name - a.name).map(function (keyName, keyIndex) {
                return <tr>
                <td>{self.props.acdInstrumentData[keyName].subFundKey}</td>
               <td></td>
               <td>{self.props.acdInstrumentData[keyName].isin}</td>
               <td>{self.props.acdInstrumentData[keyName].mexId}</td>
              <td>{self.props.acdInstrumentData[keyName].instrumentType}</td>
              <td>{self.props.acdInstrumentData[keyName].instrumentLevel}</td>
              <td>{self.props.acdInstrumentData[keyName].instrumentBasis}</td>
                    <td class="uk-text-center">
                        <Link to={'/acdinstrument'} params={{ testvalue: "hello" }} className="handle-edit-modal" data-id={keyName}
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
                        <th>Sub Fund Name</th>
                        <th>Share Class Name</th>
                        <th>ISIN</th>
                        <th>MEX ID</th>
                        <th>Instrument Type</th>
                        <th>Instrument Level</th>
                        <th>Instrument Basis</th>
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

class AcdInstrument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalType: "add",
            show: true
        };
//        this.props.acdDataActions.getAllAcdData();
//        this.handleClick = this.handleClick.bind(this);
        this.loadEditInstrumentAcdData = this.loadEditInstrumentAcdData.bind(this);
        this.loadAddAcdData = this.loadAddAcdData.bind(this);
    }

    loadEditInstrumentAcdData(acdInstrumentEditData) {
        this.setState({
            acdInstrumentEditData: acdInstrumentEditData,
            modalType: "edit"
        })
    }

    loadAddAcdData() {
        this.setState({
            modalType: "add"
        })
    }

    componentWillMount() {
        this.props.acdInstrumentActions.getInstrumentData();
    }

//     handleClick(event) {
// //      alert('handle click...');
//         this.props.acdInstrumentActions.postAcdData(this.state);
//     }

    render() {


            return (
                <div className="container-fluid" id="page_content">
                    <div className="uk-modal" id="modal_header_footer">
                        {this.state.modalType == "add" && <AcdInstrumentWizard/>}
                        {this.state.modalType == "edit" &&<EditInstrumentWizard acdInstrumentEditData={this.state.acdInstrumentEditData}/>}
                    </div>
                    <div className="mt-6">
                        <div className="row">
                            <div className="col-md-12 wizard-list">
                                <div className="row">
                                    <div className="md-card uk-margin-medium-bottom">
                                        <div className="md-card-toolbar">
                                            <h3 className="md-card-toolbar-heading-text"> Instrument List</h3>
                                            <a onClick={this.loadAddAcdData} className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light"
                                               data-uk-modal="{target:'#modal_header_footer'}" href="#"><i
                                                className="fa fa-plus"></i>Instrument</a>
                                        </div>
                                        <div className="md-card-content">
                                            <Table acdInstrumentData={this.props.acdInstrumentData} loadEditInstrumentAcdData={this.loadEditInstrumentAcdData}/>
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
            acdInstrumentData: state.acdInstrumentData,
        }
    };


AcdInstrument.propTypes = {
    acdInstrumentActions: PropTypes.object,
    acdInstrumentData: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        acdInstrumentActions: bindActionCreators(acdInstrumentActions, dispatch)
    });

export default connect(mapStateToProps,
    mapDispatchToProps)(AcdInstrument);

//    export default TransactionsTable;
