import {connect} from 'react-redux';
import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import acdDealActions from '../../actions/acdDealActions';
import AddAcdDealWizard from "./AddAcdDealWizard";
import EditAcdDealWizard from "./EditAcdDealWizard";
import acdAccountActions from '../../actions/acdAccountActions'
import {getConfig} from '../../helpers/index';

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
        window.$(document).ready(function(){
       var selectDialogueLink = window.$('<a href="" class="md-btn md-btn-success" ><i class="fa fa-upload"></i>Upload File</a>');
      var fileSelector =window.$('<input type="file" id="fileUpload">');

      selectDialogueLink.click(function() {
          fileSelector.click();
       //  alert(window.$("#fileUpload"));
          return false;
      });
      window.$('#uploadText').html(selectDialogueLink);

      fileSelector.change(function(e){
        var currentFile = e.target.files[0];
       //      alert('The file "' + currentFile +  '" has been selected.');
             const formData = new FormData();
      formData.append('upfile', currentFile);
      formData.append('accept', 'application/json');
      formData.append('Content-Type', 'multipart/form-data');
      console.log(currentFile);
     window.$.ajax({
          type: "POST",
          url: getConfig('ApiUrl')+'api/v1/dealfileupload',
          headers:{authorization:JSON.parse(localStorage.getItem('token'))},
          data: formData,
          processData: false,
          contentType: false,
          success: function(res){
           //  alert(JSON.stringify(res));
              // if(res[0][0].status==="SUCCESS")
              // {
                window.toastr.options.onHidden = function() { window.location.href="/acddeal";}
                window.toastr.success('Successfully Uploaded Deals');
              // }
              // else {
              //   window.toastr.options.onHidden = function() { } //window.location.href = "/acd"; }
              //   window.toastr.error('Unable to Upload Deals, Error Message: '+ JSON.stringify(res));
              // }
            },
            error:function(err){
              alert(JSON.stringify(err));
            }
        });
      })
     })
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
                let acdEditData = self.props.acdDealData[key];
                self.props.loadEditAcdDealData(acdEditData,key);
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
        if (this.props.acdDealData) {
            LoadRows = Object.keys(this.props.acdDealData).sort((a, b) => b.name - a.name).map(function (keyName, keyIndex) {
                return <tr>
                <td>{self.props.acdDealData[keyName].account}</td>
                <td>{self.props.acdDealData[keyName].dealType}</td>
                <td>{self.props.acdDealData[keyName].instrumentPrimaryIdentifier}</td>
                <td>{self.props.acdDealData[keyName].units}</td>
                <td>{self.props.acdDealData[keyName].currency}</td>
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
            return <td colSpan='7'>No Deals Found</td>;
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

        this.loadEditAcdDealData = this.loadEditAcdDealData.bind(this);
        this.loadAddAcdDealData = this.loadAddAcdDealData.bind(this);
        this.reloadAcdDeal = this.reloadAcdDeal.bind(this);



    }

    loadEditAcdDealData(acdEditData,key) {
        this.setState({
            acdEditData: acdEditData,
            modalType: "edit",
            editkey: key
        })
    }

    loadAddAcdDealData() {
        this.setState({
            modalType: "add"
        })
    }

    componentWillMount() {
        this.props.acdDealActions.getDealData();
    }


    reloadAcdDeal(){
        this.props.acdDealActions.getDealData();
    }

    onFileUpload(e) {
     var currentFile = e.target.files[0];
     this.setState({file: currentFile})
     const formData = new FormData();
     formData.append('upfile', currentFile);
     formData.append('accept', 'application/json');
     formData.append('Content-Type', 'multipart/form-data');
     console.log(currentFile);
     window.$.ajax({
       type: "POST",
       url: getConfig('ApiUrl')+'api/v1/dealfileupload',
       headers:{authorization:JSON.parse(localStorage.getItem('token'))},
       data: formData,
       processData: false,
       contentType: false,
       success: function(res){
         alert(JSON.stringify(res));
       },
       error:function(err){
         alert(JSON.stringify(err));
       }
     });

   }
    render() {
            return (
                <div className="container-fluid" id="page_content">

                    <div className="uk-modal" id="modal_header_footer">
                        {this.state.modalType == "add" && <AddAcdDealWizard reloadAcdDeal={this.reloadAcdDeal}/>}
                        {this.state.modalType == "edit" &&<EditAcdDealWizard reloadAcdDeal={this.reloadAcdDeal} acdEditData={this.state.acdEditData} editkey={this.state.editkey}/>}
                    </div>

                    <div className="mt-6">
                        <div className="row">
                            <div className="col-md-12 wizard-list">
                                <div className="row">
                                    <div className="md-card uk-margin-medium-bottom">
                                        <div className="md-card-toolbar">
                                            <h3 className="md-card-toolbar-heading-text">Deals List</h3>
                                            <div id="uploadText" class="upload"></div>
                                            <a onClick={this.loadAddAcdDealData} className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light"
                                               data-uk-modal="{target:'#modal_header_footer'}" href="#"><i
                                                className="fa fa-plus"></i>Deal</a>
                                        </div>
                                        <div className="md-card-content">
                                            <Table acdDealData={this.props.acdDealData} loadEditAcdDealData={this.loadEditAcdDealData}/>
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
     acdDealData: state.acdDealData
   }
 };


 AcdDeal.propTypes = {
   acdDealActions: PropTypes.object,
   acdDealData: PropTypes.array,
   acdAccountActions: PropTypes.object
 };

 const
 mapDispatchToProps = (dispatch) => ({
   acdDealActions: bindActionCreators(acdDealActions, dispatch)
 });

 export default connect(mapStateToProps,
   mapDispatchToProps)(AcdDeal);
