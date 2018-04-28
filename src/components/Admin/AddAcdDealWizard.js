import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom'

class AddAcdAccountWizard extends React.Component {
  componentDidMount()
  {
      window.$("#wizard_add").steps({
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
  "account": "string",
  "dealType": "string",
  "instrumentPrimaryIdentifier": "string",
  "units": "string",
  "price": 0,
  "amount": "string",
  "tradeFor": "string",
  "dealingStatus": "string",
  "source": "string",
  "id": "string",
  "currency": "string"
}


console.log(JSON.stringify(reqData))
  //alert(localStorage.getItem('token'));
  var mode=$('#iisin').val();
  if(mode=="add")
  {
    //alert('add');
    $.ajax({
  type: "POST",
  url: 'http://35.178.56.52:8081/api/v1/dealing',
  headers:{authorization:JSON.parse(localStorage.getItem('token'))}
  ,data: JSON.stringify(reqData),
  success: function(res){
    alert(JSON.stringify(res));
    window.location.href="/acddeal";
  //  ReactDOM.render(<Acd />,$(this));
  },
  error:function(err){
    alert(JSON.stringify(err));
  },
  dataType: 'json',
  contentType:'application/json'
});
  }

  //if($('#isin').val)
  //alert(("insert");

    });

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
                    <h3 className="uk-modal-title">Create Deal</h3>
                </div>
                <div className="col-sm-12 create-sec">
                    <div className="md-card uk-margin-large-bottom">
                        <div className="md-card-content">
                            <form className="uk-form-stacked" id="wizard_advanced_form">
                                <div id="wizard_add" data-uk-observe>
                                    <h3>Step 1</h3>
                                    <section>
                                        <h2 className="heading_a">
                                            Deal Details
                                        </h2>
                                        <hr className="md-hr" />
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                    <div class="select-option2">
                                                        <select id="accountCombo" class="form-control">
                                                            <option value="Account">Account</option>
                                                            <option value="Account Type">1234</option>
                                                            <option value="Fund Accountant">567</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-7">
                                                <div class="form-group mt-4">
                                                    <div class="uk-form-row parsley-row mt26">
                                                        <label for="gender" class="clabel">Deal Type<span
                                                            class="req">*</span></label>
                                                        <div class="parsley-row icheck-inline">

                                                            <div class="btn-group" data-toggle="buttons-checkbox"
                                                                 id="AMLBtnGroup">
                                                                <button type="button" id="partialAML" class="btn ">
                                                                    BUY
                                                                </button>
                                                                <button type="button" id="fullAML" class="btn ">
                                                                    SELL
                                                                </button>
                                                            </div>
                                                            <input type="hidden" name="companyType"
                                                                   id="companyType"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                    <div class="select-option2">
                                                        <select id="fundCombo" class="form-control">
                                                            <option value="Fund">Fund</option>
                                                            <option value="Indexed Fund">Indexed Fund</option>
                                                            <option value="Balanced Fund">Balanced Fund</option>
                                                            <option value="Growth Fund">Growth Fund</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-7">
                                                <div class="form-group mt-4">
                                                    <div class="uk-form-row parsley-row mt26">
                                                    <label for="quantity">Quantity<span className="req">*</span></label>
                                                    <input type="text" name="quantity" required className="md-input" />
                                                        <div class="parsley-row icheck-inline">

                                                            <div class="btn-group" data-toggle="buttons-checkbox"
                                                                 id="AMLBtnGroup">
                                                                <button type="button" id="partialAML" class="btn ">
                                                                    Amount
                                                                </button>
                                                                <button type="button" id="fullAML" class="btn ">
                                                                    Units
                                                                </button>
                                                            </div>
                                                            <input type="hidden" name="companyType"
                                                                   id="companyType"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                    <div class="select-option3">
                                                        <select id="currencyCombo" class="form-control">
                                                            <option value="Currency">Currency</option>
                                                            <option value="GBP">GBP</option>
                                                            <option value="EURO">EURO</option>
                                                            <option value="USD">USD</option>
                                                        </select>
                                                    </div>
                                                    </div>
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
