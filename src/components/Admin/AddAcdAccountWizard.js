import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {getConfig} from '../../helpers/index';

class AddAcdAccountWizard extends React.Component {
    componentDidMount() {
        var self = this;
        window.$("#wizard_add_account").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true
        });

        window.$(document).on('click', '#wizard_add_account .button_finish', function () {
            //alert(getFormData($('#wizard_advanced_form')));
            var unindexed_array = window.$('#wizard_advanced_form_add').serializeArray();
            var indexed_array = {};
            window.$.map(unindexed_array, function (n, i) {
                indexed_array[n['name']] = n['value'];
            });

            var reqData = {
              "accountType": $('#accountCombo').val(),
              "name": indexed_array["account"],
              "wallet": {
                "address": "",
                "owner": [
                  null
                ],
                "balance": {}
              }
            }
            console.log(JSON.stringify(reqData))
            //alert(localStorage.getItem('token'));
            var mode=$('#iisin').val();
            if(mode=="add")
            {
                window.$.ajax({
                    type: "POST",
                    url: getConfig('ApiUrl')+'api/v1/account',
                    headers: {authorization: JSON.parse(localStorage.getItem('token'))}
                    , data: JSON.stringify(reqData),
                    success: function (res) {
                        if(res[0].status==="SUCCESS")
                        {
                            window.toastr.options.onHidden = function() {
                                window.location.href = "/acdaccount";
                                $('.button_finish').show();
                                self.props.reloadAcdAccount();
                            }
                            window.toastr.success('You have Successfully Created Account');
                        }
                        else {
                            window.toastr.options.onHidden = function() {$('.button_finish').show();} //window.location.href = "/acd"; }
                            window.toastr.error('Unable to create Account, Error Message: '+ res[0].info);
                        }
                    },
                    error: function (err) {
                        alert(JSON.stringify(err));
                    },
                    dataType: 'json',
                    contentType: 'application/json'
                });

            }
        });

    }

    componentWillReceiveProps() {
    }
    render() {
        return (
          <div className="uk-modal-dialog" id="acdAddAccountmodalDialog">
              <button type="button" className="uk-modal-close uk-close"></button>
              <div className="uk-modal-header">
                  <h3 className="uk-modal-title">Create Account</h3>
              </div>
              <div className="col-sm-12 create-sec">
                  <div className="md-card uk-margin-large-bottom">
                      <div className="md-card-content">
                          <form className="uk-form-stacked" id="wizard_advanced_form_add">
                              <div id="wizard_add_account" data-uk-observe>
                                  <h3>Step 1</h3>
                                  <section>
                                      <h2 className="heading_a">
                                          Account Information
                                      </h2>
                                      <hr className="md-hr"/>
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

                                                <input type="hidden" value="add" name ="iisin" id="iisin"/>

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

export default AddAcdAccountWizard;
