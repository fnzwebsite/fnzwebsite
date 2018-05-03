import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom'
import acdAccountActions from '../../actions/acdAccountActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {getConfig} from '../../helpers/index';

class AddAcdAccountWizard extends React.Component {

  constructor(props) {
    super(props);
  };

  componentWillMount() {
    this.props.acdAccountActions.getAccountsData();
  }
  componentDidMount()
  {
      var self = this;
    window.$("#wizard_add_deal").steps({
      headerTag: "h3",
      bodyTag: "section",
      transitionEffect: "slideLeft",
      autoFocus: true
    });
    $(document).ready(function(){
      $.ajax({
        type: "GET",
        url: getConfig('ApiUrl')+'api/v1/account',
        headers:{authorization:JSON.parse(localStorage.getItem('token'))},
        success: function(res){
          var arr = Object.keys(res).map(function(k) { return res[k] });

          $(arr).each(function(index,item){
            //    console.log(item);
            $("#ddlAccount").append('<option value="'+item.identifier+'">'+item.name+'</option>')
          })
        },
        error:function(err){
          alert(JSON.stringify(err));
        }
      });

      $.ajax({
        type: "GET",
        url: getConfig('ApiUrl')+'api/v1/instrument',
        headers:{authorization:JSON.parse(localStorage.getItem('token'))},
        success: function(res){
          var arr = Object.keys(res).map(function(k) { return res[k] });

          $(arr).each(function(index,item){
            //    console.log(item);
            $("#ddlInstrument").append('<option value="'+item.isin+'">'+item.name+'</option>')
          })
        },
        error:function(err){
          alert(JSON.stringify(err));
        }
      });
    })
    $(document).on('click', '#wizard_add_deal .button_finish', function(){
      //alert(getFormData($('#wizard_advanced_form')));
      var unindexed_array = $('#wizard_advanced_form').serializeArray();
      var indexed_array = {};
      $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
      });
      //alert($('#ddlInstrument').val());
      var deal = indexed_array['quantityType'];
      if(deal==""){
        deal='Amount'
      }
        var reqData
        if (deal == 'Amount') {
            reqData = {
                "account": $('#ddlAccount').val(),
                "dealType": indexed_array['dealType'] == "" ? "BUY" : indexed_array['dealType'],
                "instrumentPrimaryIdentifier": $('#ddlInstrument').val(),
                "units": 0,
                "price": 0,
                "amount": indexed_array['quantity'],
                "tradeFor": "U",
                "currency": indexed_array['currencyCombo'],
                "source": "STP",
                "tradeTime": "2018-04-25T13:57:14.910Z"

            }
        }
        else {
            reqData = {
                "account": $('#ddlAccount').val(),
                "dealType": indexed_array['dealType'] == "" ? "BUY" : indexed_array['dealType'],
                "instrumentPrimaryIdentifier": $('#ddlInstrument').val(),
                "units": indexed_array['quantity'],
                "price": 0,
                "amount": 0,
                "tradeFor": "U",
                "currency": indexed_array['currencyCombo'],
                "source": "STP",
                "tradeTime": "2018-04-25T13:57:14.910Z"
            }
        }
      console.log(JSON.stringify(reqData))
      //alert(localStorage.getItem('token'));
      var mode=$('#iisin').val();
      if(mode=="add")
      {
        //alert('add');
        $('.button_finish').hide();
        $.ajax({
          type: "POST",
          url: getConfig('ApiUrl')+'api/v1/dealing',
          headers:{authorization:JSON.parse(localStorage.getItem('token'))}
          ,data: JSON.stringify(reqData),
          success: function(res){
            //alert(JSON.stringify(res));
            if(res[0].status==="SUCCESS")
            {
              window.toastr.options.onHidden = function() {
                  window.location.href = "/acd";
                  $('.button_finish').show();
                  self.props.reloadAcdDeal();
              }
              window.toastr.success('You have Successfully Created Deal');
            }
            else {
              window.toastr.options.onHidden = function() {$('.button_finish').show(); } //window.location.href = "/acd"; }
              window.toastr.error('Unable to create Deal, Error Message: '+ res[0].info);
            }
            //  ReactDOM.render(<Acd />,$(this));
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

    $('body').on('click', '#AMLBtnGroup .btn', function(event) {
      event.stopPropagation(); // prevent default bootstrap behavior
      if ($(this).attr('data-toggle') != 'button') { // don't toggle if data-toggle="button"
      var idval = $(this).attr('id');
      if ($(this).attr('id') == 'NotAML') {
        $('#fullAML').removeAttr('data-toggle');
        $(this).addClass('btn btn-success');
        $('#fullAML').removeClass('btn-success');
        $(this).attr('data-toggle', 'button');
        $("#dealType").val("BUY");
      };
      if ($(this).attr('id') == 'fullAML') {
        $('#NotAML').removeAttr('data-toggle');
        $(this).addClass('btn btn-success');
        $('#NotAML').removeClass('btn-success');
        $(this).attr('data-toggle', 'button');
        $("#dealType").val("SELL");
      };
    }

  });

  $('body').on('click', '#AMLBtnGroup1 .btn', function(event) {
    event.stopPropagation(); // prevent default bootstrap behavior
    if ($(this).attr('data-toggle') != 'button') { // don't toggle if data-toggle="button"
    var idval = $(this).attr('id');
    if ($(this).attr('id') == 'NotAML1') {
      $('#fullAML1').removeAttr('data-toggle');
      $(this).addClass('btn btn-success');
      $('#fullAML1').removeClass('btn-success');
      $(this).attr('data-toggle', 'button');
      $("#quantityType").val("Amount");
    };
    if ($(this).attr('id') == 'fullAML1') {
      $('#NotAML1').removeAttr('data-toggle');
      $(this).addClass('btn btn-success');
      $('#NotAML1').removeClass('btn-success');
      $(this).attr('data-toggle', 'button');
      $("#quantityType").val("Units");
    };
  }
});
}

componentWillMount() {

}
loadAccounts()
{
  let accountsArray = this.props.acdAccountData
  accountsArray = _.filter(accountsArray, (obj) => {
    return obj.name !== null
  })
  const accounts = _.values(accountsArray).map((account, index) => {
    //console.log("Account :" + account.name)
    return (<option value={account.name}>{account.name}</option>);
  });
  return (accounts);
}
render() {
  let accountsdropDown=null;
  let self=this;

  return (
    <div className="uk-modal-dialog" id="acdAddDealmodalDialog">
    <button type="button" className="uk-modal-close uk-close"></button>
    <div className="uk-modal-header">
    <h3 className="uk-modal-title">Create Deal</h3>
    </div>
    <div className="col-sm-12 create-sec">
    <div className="md-card uk-margin-large-bottom">
    <div className="md-card-content">
    <form className="uk-form-stacked" id="wizard_advanced_form">
    <div id="wizard_add_deal" data-uk-observe>
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
    <select id="ddlAccount" class="form-control">
    <option value="">Select Account</option>

    </select>
    </div>
    </div>
    </div>
    </div>
    <div className="col-sm-5">
    <div className="form-group ">
    <div className="parsley-row uk-margin-top">
    <div class="select-option2">
    <select id="ddlInstrument" name="ddlInstrument" class="form-control">
    <option value="">Select Instrument</option>

    </select>
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
    <div class="form-group">
    <div class="parsley-row icheck-inline quan">
    <div class="parsley-row uk-margin-top">
    <div class="md-input-wrapper">
    <label for="quantity">Quantity<span class="req">*</span></label>
    <input type="text" name="quantity" required="" class="md-input" data-parsley-id="4"/>
    <span class="md-input-bar"></span></div>

    </div>
    </div>
    <div class="parsley-row icheck-inline">

    <div class="btn-group" data-toggle="buttons-checkbox" id="AMLBtnGroup1">
    <button type="button" id="NotAML1" name="NotAML1" class="btn btn-success" data-toggle="button">
    Amount
    </button>
    <button type="button" id="fullAML1" class="btn ">
    Units
    </button>
    <input type="hidden" name="quantityType"
    id="quantityType"/>
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
    <select id="currencyCombo" name="currencyCombo" class="form-control">
    <option value="Currency">Currency</option>
    <option value="GBP">GBP</option>
    <option value="EURO">EURO</option>
    <option value="USD">USD</option>
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
    <button type="button" id="NotAML" class="btn btn-success" data-toggle="button">
    BUY
    </button>
    <button type="button" id="fullAML" class="btn ">
    SELL
    </button>
    </div>
    <input type="hidden" name="dealType"
    id="dealType"/>
    </div>
    <input type="hidden" name="iisin" value="add"
    id="iisin"/>
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
