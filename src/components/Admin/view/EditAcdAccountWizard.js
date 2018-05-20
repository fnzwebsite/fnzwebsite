import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom'
import Acd from './Acd'
class EditAcdAccountWizard extends React.Component {
    componentDidMount()
    {
        window.$("#wizard_edit").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true
        });
        $(document).on('click', '.button_finish', function(){
      //alert(getFormData($('#wizard_advanced_form')));
      var unindexed_array = $('#wizard_advanced_form').serializeArray();
        var indexed_array = {};
        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

    var reqData={
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
      var mode=$('#iisin').val();
      var editIdentifier =$('#editIdentifier').val();
      if(mode=="edit")
      {
          $('.button_finish').hide();
        $.ajax({
      type: "PUT",
      url: 'http://35.178.56.52:8081/api/v1/account/'+editIdentifier,
      headers:{authorization:JSON.parse(localStorage.getItem('token'))}
      ,data: JSON.stringify(reqData),
      success: function(res){
        //alert(JSON.stringify(res));
        if(res[0].status==="SUCCESS")
        {
          window.toastr.options.onHidden = function() { window.location.href="/acdaccount";$('.button_finish').show();  }
          window.toastr.success('You have successfully modified Account');
        }
        else {
          window.toastr.options.onHidden = function() {$('.button_finish').show(); } //window.location.href = "/acd"; }
          window.toastr.error('Unable to modify account, Error Message: '+ res[0].info);
        }

      },
      error:function(err){
        window.toastr.error(JSON.stringify(err));
        $('.button_finish').show();
      },
      dataType: 'json',
      contentType:'application/json'
    });
      }

        });
        $(document).ready(function(){
          var accType=$("#editaccountType").val();
          $('#accountCombo').val(accType)
        //  alert(accType);
        })
       $('body').on('click', '#AMLBtnGroup .btn', function(event) {
           event.stopPropagation(); // prevent default bootstrap behavior
           if ($(this).attr('data-toggle') != 'button') { // don't toggle if data-toggle="button"
               var idval = $(this).attr('id');
               if ($(this).attr('id') == 'NotAML') {
                   $('#partialAML,#fullAML').removeAttr('data-toggle');
                   $(this).addClass('btn btn-success');
                   $('#partialAML,#fullAML').removeClass('btn-success');
                   $(this).attr('data-toggle', 'button');
                   $("#companyType").val("FundManager");
               };
               if ($(this).attr('id') == 'partialAML') {
                   $('#NotAML,#fullAML').removeAttr('data-toggle');
                   $(this).addClass('btn btn-success');
                   $('#NotAML,#fullAML').removeClass('btn-success');
                   $(this).attr('data-toggle', 'button');
                    $("#companyType").val("FundAccountant");
               };
               if ($(this).attr('id') == 'fullAML') {
                   $('#NotAML,#partialAML').removeAttr('data-toggle');
                   $(this).addClass('btn btn-success');
                   $('#NotAML,#partialAML').removeClass('btn-success');

                   $(this).attr('data-toggle', 'button');
                   $("#companyType").val("Trustee");
               };
           }

       });

      }


    render() {
        return (
          <div className="uk-modal-dialog" id="acdmodalDialog">
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
                                                      <input type="text" value={this.props.acdAccountEditData.name} name="account" required className="md-input" />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="col-sm-7">
                                              <div className="form-group mt-4">
                                                <div className="parsley-row uk-margin-top">
                                                    <div className="select-option2">
                                                    <select id="accountCombo" name="accountCombo" className="form-control">
                                                        <option value="">Account Type</option>
                                                        <option value="Nominee">Nominee</option>
                                                        <option value="GIA" selected>GIA</option>
                                                        <option value="ISA">ISA</option>
                                                        <option value="JISA">JISA</option>
                                                        <option value="Joint Account">Joint Account</option>
                                                    </select>
                                                    </div>
                                                </div>
                                                <input type="hidden" name ="companyType" id="companyType"/>
                                                <input type="hidden" name ="editaccountType" id="editaccountType" value={this.props.acdAccountEditData.accountType}/>
                                                <input type="hidden" value="edit" name ="iisin" id="iisin"/>
                                                <input type="hidden" value={this.props.acdAccountEditData.identifier} name ="editIdentifier" id="editIdentifier"/>
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
