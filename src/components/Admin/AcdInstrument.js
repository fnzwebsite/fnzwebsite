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
                let acdEditData = self.props.acdInstrumentData[key];
                self.props.loadEditAcdInstrumentData(acdEditData);
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
        if (this.props.acdInstrumentData) {
            LoadRows = Object.keys(this.props.acdInstrumentData).sort((a, b) => b.name - a.name).map(function (keyName, keyIndex) {
                return <tr>
                <td>{self.props.acdInstrumentData[keyName].subFundKey}</td>
                 <td></td>
                 <td>{self.props.acdInstrumentData[keyName].isin}</td>
                <td>{self.props.acdInstrumentData[keyName].instrumentType}</td>
                <td>{self.props.acdInstrumentData[keyName].instrumentLevel}</td>
                <td>{self.props.acdInstrumentData[keyName].instrumentBasis}</td>
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
                        <th>Sub Fund Name</th>
                        <th>Share Class Name</th>
                        <th>ISIN</th>
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
            return <td colSpan='7'>No Instrument Found</td>;
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

        this.loadEditAcdInstrumentData = this.loadEditAcdInstrumentData.bind(this);
        this.loadAddAcdInstrumentData = this.loadAddAcdInstrumentData.bind(this);
        this.reloadAcdInstrument = this.reloadAcdInstrument.bind(this);

    }

    loadEditAcdInstrumentData(acdEditData) {
        this.setState({
            acdEditData: acdEditData,
            modalType: "edit"
        })
    }

    loadAddAcdInstrumentData() {
        this.setState({
            modalType: "add"
        })
    }

    componentWillMount() {
        this.props.acdInstrumentActions.getInstrumentData();
    }



    reloadAcdInstrument(){
        this.props.acdInstrumentActions.getInstrumentData();
    }

    render() {
            return (
                <div className="container-fluid" id="page_content">

                    <div className="uk-modal" id="modal_header_footer">
                        {this.state.modalType == "add" && <AcdInstrumentWizard reloadAcdInstrument={this.reloadAcdInstrument}/>}
                        {this.state.modalType == "edit" &&<EditInstrumentWizard reloadAcdInstrument={this.reloadAcdInstrument} acdEditData={this.state.acdEditData}/>}
                    </div>

                    <div className="mt-6">
                        <div className="row">
                            <div className="col-md-12 wizard-list">
                                <div className="row">
                                    <div className="md-card uk-margin-medium-bottom">
                                        <div className="md-card-toolbar">
                                            <h3 className="md-card-toolbar-heading-text">Instrument List</h3>
                                            <a onClick={this.loadAddAcdInstrumentData} className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light"
                                               data-uk-modal="{target:'#modal_header_footer'}" href="#"><i
                                                className="fa fa-plus"></i>Instrument</a>
                                        </div>
                                        <div className="md-card-content">
                                            <Table acdInstrumentData={this.props.acdInstrumentData} loadEditAcdInstrumentData={this.loadEditAcdInstrumentData}/>
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
