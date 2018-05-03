import {connect} from 'react-redux';
import React from 'react';
import Acd from './Acd';
import $ from 'jquery';
import {getConfig} from '../../helpers/index';

var stepsWizard = null;

class EditAcdAccountWizard extends React.Component {
    componentDidMount() {


        var self = this;

        window.$("#wizard_edit").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true
        });

        this.setData();

        window.$(document).on('click', '.button_finish', function () {
            //alert(getFormData($('#wizard_advanced_form')));
            var unindexed_array = window.$('#wizard_advanced_form').serializeArray();
            var indexed_array = {};
            window.$.map(unindexed_array, function (n, i) {
                indexed_array[n['name']] = n['value'];
            });

            var reqData = {
                "accountType": $('#accountCombo').val(),
                "name": indexed_array["account"],
                "wallet": {
                  "address": "string",
                  "owner": [
                    null
                  ],
                  "balance": {}
                }
            }
            console.log(JSON.stringify(reqData))
            //alert(localStorage.getItem('token'));
            //console.log('jjjjj'+JSON.stringify(this.props.acdEditData));
            var mode = $('#iisin').val();
            if (mode == "edit") {
              var editIdentifier =$('#editIdentifier').val();
                $('.button_finish').hide();
                window.$.ajax({
                    type: "PUT",
                    url: getConfig('ApiUrl')+'api/v1/account/'+editIdentifier,
                    headers: {authorization: JSON.parse(localStorage.getItem('token'))}
                    , data: JSON.stringify(reqData),
                    beforeSend: function () {
                        //$("#loading-image").show();
                    },
                    success: function (res) {
                        //  alert(JSON.stringify(res));
                        //      $("#loading-image").hide();
                        if (res[0].status === "SUCCESS") {
                            window.toastr.options.onHidden = function () {
                                self.props.reloadAcdAccount();
                                window.location.href = "/acdaccount";
                                $('.button_finish').show();
                            }
                            window.toastr.success('You have Successfully modified Account');
                        }
                        else {
                            window.toastr.options.onHidden = function () {
                                $('.button_finish').show();
                            } //window.location.href = "/acd"; }
                            window.toastr.error('Unable to Modify Account, Error Message: ' + res[0].info);
                        }

                        //  ReactDOM.render(<Acd />,$(this));
                    },
                    error: function (err) {
                        alert(err.responseText);
                        $('.button_finish').show();
                    },
                    dataType: 'json',
                    contentType: 'application/json'
                });
            }
        });

     }


    componentDidUpdate() {
        this.setData();
    }

    setData() {
      console.log(this.props.acdEditData);
      window.$("input#account").val(this.props.acdEditData.name);
      window.$("input#editaccountType").val(this.props.acdEditData.accountType);
      var accType=$("input#editaccountType").val();
      window.$("#accountCombo").val(accType);
    }


    render() {
        return (
          <div className="uk-modal-dialog" id="acdEditAccountmodalDialog">
           <button type="button" className="uk-modal-close uk-close"></button>
           <div className="uk-modal-header">
               <h3 className="uk-modal-title">Edit Account</h3>
           </div>
           <div className="col-sm-12 create-sec">
               <div className="md-card uk-margin-large-bottom">
                   <div className="md-card-content">
                       <form className="uk-form-stacked" id="wizard_advanced_form">
                           <div id="wizard_edit" data-uk-observe>
                               <h3>Step 1</h3>
                               <section>
                                   <h2 className="heading_a">
                                       Account Details
                                   </h2>
                                   <hr className="md-hr" />
                                   <div className="row">
                                       <div className="col-sm-5">
                                           <div className="form-group ">
                                               <div className="parsley-row uk-margin-top">
                                                   <label for="account">Account<span className="req">*</span></label>
                                                   <input type="text" id="account" name="account" required className="md-input" />
                                               </div>
                                           </div>
                                       </div>
                                       <div class="col-sm-7">
                                           <div class="form-group mt-4">
                                             <div class="parsley-row uk-margin-top">
                                                 <div class="select-option2">
                                                 <label>Account Type<span className="req">*</span></label>
                                                 <select id="accountCombo" name="accountCombo" class="form-control">
                                                     <option value="">Select Account Type</option>
                                                     <option value="Nominee">Nominee</option>
                                                     <option value="GIA">GIA</option>
                                                     <option value="ISA">ISA</option>
                                                     <option value="JISA">JISA</option>
                                                     <option value="Joint Account">Joint Account</option>
                                                 </select>
                                                 </div>
                                             </div>
                                             <input type="hidden" name ="editaccountType" id="editaccountType"/>
                                             <input type="hidden" value="edit" name ="iisin" id="iisin"/>
                                             <input type="hidden" name ="editIdentifier" value={this.props.acdEditData.identifier} id="editIdentifier"/>
                                           </div>
                                       </div>
                                   </div>
                               </section>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
       </div>
        )
    }
}

export default EditAcdAccountWizard;
