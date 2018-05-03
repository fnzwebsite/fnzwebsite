import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom'
import Acd from './Acd';
import {getConfig} from '../../helpers/index';

class AcdInstrumentWizard extends React.Component {
    componentDidMount() {
        var self = this;
        window.$("#wizard_add_instrument").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true
        });

        $(document).ready(function(){
       window.$('#datetimepicker3, #datetimepicker4').datetimepicker({
           format: 'LT'
       });

       $.ajax({
         type: "GET",
         url: getConfig('ApiUrl')+'api/v1/calendar',
         headers:{authorization:JSON.parse(localStorage.getItem('token'))},
         success: function(res){
           var arr = Object.keys(res).map(function(k) { return {arr:res[k],id:k} });
           //console.log(JSON.stringify(arr));
           $(arr).each(function(index,item){
             //    console.log(item);
             let key = $(this).data("id")
             $("#ddlCalender").append('<option value="'+item.id+'">'+item.arr.name+'</option>')
           })
         },
         error:function(err){
           alert(JSON.stringify(err));
         }
       });
       $.ajax({
         type: "GET",
         url: getConfig('ApiUrl')+'api/v1/company',
         headers:{authorization:JSON.parse(localStorage.getItem('token'))},
         success: function(res){
           var arr = Object.keys(res).map(function(k) { return res[k] });

           $(arr).each(function(index,item){
             //    console.log(item);
             $("#ddlCompany").append('<option value="'+item.identifier+'">'+item.name+'</option>')
           })
         },
         error:function(err){
           alert(JSON.stringify(err));
         }
       });
     })
        $(document).on('click', '#wizard_add_instrument .button_finish', function ()  {
            //alert(getFormData($('#wizard_advanced_form')));
            var unindexed_array = window.$('#wizard_advanced_form_add').serializeArray();
            var indexed_array = {};
            window.$.map(unindexed_array, function (n, i) {
                indexed_array[n['name']] = n['value'];
            });

            var reqData={
       "additionalExpenses": 0,
       "annualManagementCharge": 0,
       "autoBoxLimits": 1000,
       "bankAccount": {
         "accountNumber": "123456789",
         "sortCode": "10-10-10",
         "telephone": "222222",
         "type": "UK"
       },
       "boxType": "auto",
       "calendarDataId":indexed_array["ddlCalender"],
       "instrumentBasis": "",
       "cancellationRight": true,
       "fundCompanyKey": indexed_array["ddlCompany"],
       "currency": "GBP",
       "cusip": "",
       "dealingCutOffTime": "",
       "dilutionLevyMethod": "",
       "dilutionLevyRatePurchase": 0,
       "dilutionLevyRateRepurchase": 0,
       "dilutionLevyRateSwitchIn": 0,
       "dilutionLevyRateSwitchOut": 0,
       "dilutionLevyTriggerPurchase": 0,
       "dilutionLevyTriggerRepurchase": 0,
       "dilutionLevyTriggerSwitchIn": 0,
       "dilutionLevyTriggerSwitchOut": 0,
       "displayName": indexed_array["fundNameDisplay"],
       "distributionCalendar": "",
       "eusdCapital": true,
       "eusdIncome": true,
       "fatcaNumber": "",
       "fundAccountantKey": "",
       "fundDealingStatus": "",
       "fundHolidayCalendar": "",
       "fundStatus": "live",
       "instrumentLevel": "gross",
       "incomeDetails": "",
       "interestDividend": "interest",
       "initialCharge": 0,
       "instrumentType": indexed_array["instrumentType"]==""?"Income":indexed_array["instrumentType"],
       "isin": indexed_array["isin"],
       "largeDealSize": {
         "type": "unit",
         "value": 1000
       },
       "launchDate": "",
       "mexId": "",
       "minDealFollowOn": {
         "type": "",
         "value": 0
       },
       "minDealInitial": {
         "type": "",
         "value": 0
       },
       "minHolding": {
         "type": "",
         "value": 0
       },
       "name": "name123",
       "pricePrecision": 3,
       "priceType": "units",
       "pricingBasis": "daily",
       "purchaseSettlementCycle": 10,
       "redemptionSettlementCycle": 10,
       "faCrossRef": "",
       "sedol": indexed_array["sedol"],
       "status": 0,
       "subFundKey": indexed_array["fundNameDisplay"],
       "totalExpenseRatio": 0,
       "trusteeKey": "",
       "unitsPrecision": 3,
       "valuationFrequency": "daily",
       "valuationPointTime": convertTime(indexed_array["valuationPointTime"]),
       "wknno": ""
     }
            console.log(JSON.stringify(reqData))
            //alert(localStorage.getItem('token'));
            var mode=$('#iisin').val();
            if(mode=="add")
            {
                window.$.ajax({
                    type: "POST",
                    url: getConfig('ApiUrl')+'api/v1/instrument',
                    headers: {authorization: JSON.parse(localStorage.getItem('token'))}
                    , data: JSON.stringify(reqData),
                    success: function (res) {
                        if(res[0].status==="SUCCESS")
                        {
                            window.toastr.options.onHidden = function() {
                                window.location.href = "/acdinstrument";
                                $('.button_finish').show();
                                self.props.reloadAcdInstrument();
                            }
                            window.toastr.success('You have Successfully Created Instrument');
                        }
                        else {
                            window.toastr.options.onHidden = function() {$('.button_finish').show();} //window.location.href = "/acd"; }
                            window.toastr.error('Unable to create Instrument, Error Message: '+ res[0].info);
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

        window.$('body').on('click', '#AMLBtnGroup .btn', function(event) {
      event.stopPropagation(); // prevent default bootstrap behavior
      if ($(this).attr('data-toggle') != 'button') { // don't toggle if data-toggle="button"
      var idval = $(this).attr('id');
      if ($(this).attr('id') == 'NotAML') {
        $('#partialAML').removeAttr('data-toggle');
        $(this).addClass('btn btn-success');
        $('#partialAML').removeClass('btn-success');
        $(this).attr('data-toggle', 'button');
        $("#instrumentType").val("Income");
      };
      if ($(this).attr('id') == 'partialAML') {
        $('#NotAML').removeAttr('data-toggle');
        $(this).addClass('btn btn-success');
        $('#NotAML').removeClass('btn-success');
        $(this).attr('data-toggle', 'button');
        $("#instrumentType").val("Accumulation");
      };
    }

  });


    }

    componentWillReceiveProps() {
    }
    render() {
        return (
          <div className="uk-modal-dialog" id="acdAddInstrumentmodalDialog">
  <button type="button" className="uk-modal-close uk-close"></button>
  <div className="uk-modal-header">
  <h3 className="uk-modal-title">Create Instrument</h3>
  </div>
  <div className="col-sm-12 create-sec">
  <div className="md-card uk-margin-large-bottom">
  <div className="md-card-content">
  <form className="uk-form-stacked" id="wizard_advanced_form_add">
  <div id="wizard_add_instrument" data-uk-observe>
  <h3>Step 1</h3>
  <section>
  <h2 className="heading_a">
  Instrument Details
  </h2>
  <hr className="md-hr" />
  <div className="row">
  <div className="col-sm-6">
  <div className="form-group ">
  <div className="parsley-row uk-margin-top">
  <label for="fundNameDisplay">Fund Name Display<span className="req">*</span></label>
  <input type="text" name="fundNameDisplay" required className="md-input" />
  </div>
  </div>
  </div>
  <div className="col-sm-6">
  <div className="form-group ">
  <div className="parsley-row uk-margin-top">
  <label for="shareClassName">Share Class Name<span className="req">*</span></label>
  <input type="text" name="shareClassName" required className="md-input" />
  </div>
  </div>
  </div>
  </div>
  <div className="row">
  <div className="col-sm-6">
  <div className="form-group ">
  <div className="parsley-row uk-margin-top">
  <label for="subFundName">Sub Fund Name<span className="req">*</span></label>
  <input type="text" name="subFundName" required className="md-input" />
  </div>
  </div>
  </div>
  <div class="col-sm-6">
  <div class="form-group">
  <div class="parsley-row uk-margin-top">
  <div class="select-option">
  <select id="entityCombo" name="entityCombo" class="form-control">
  <option value="Entity Type">Entity Type</option>
  <option value="Fund Accountant">Fund Accountant</option>
  <option value="Trustee">Trustee</option>
  </select>
  </div>
  </div>
  </div>
  </div>
  </div>
  <div className="row">
  <div className="col-sm-6">
  <div className="form-group ">
  <div className="parsley-row uk-margin-top">
  <label for="isin">ISIN<span className="req">*</span></label>
  <input type="text" name="isin" required className="md-input" />
  </div>
  </div>
  </div>
  <div className="col-sm-6">
  <div className="form-group ">
  <div className="parsley-row uk-margin-top">
  <label for="sedol">Sedol<span className="req">*</span></label>
  <input type="text" name="sedol" required className="md-input" />
  </div>
  </div>
  </div>
  </div>
  <div className="row">
  <div className="col-sm-6">
  <div className="form-group ">
  <div class="parsley-row uk-margin-top">
  <div class="input-group date" id="datetimepicker3" data-target-input="nearest">
  <div class="md-input-wrapper"><input type="text" id="valuationPointTime" name="valuationPointTime" class="md-input datetimepicker-input" data-target="#datetimepicker3" placeholder="Valuation Point time" required="" data-parsley-id="14"/></div>
  <div class="input-group-append" data-target="#datetimepicker3" data-toggle="datetimepicker">
  <div class="input-group-text"><i class="fa fa-clock-o"></i></div>
  </div>
  </div>
  </div>
  </div>
  </div>
  <div class="col-sm-6">
  <div class="form-group mt-4">
  <div class="uk-form-row parsley-row mt26">
  <label for="gender" class="clabel">Instrument Type<span class="req">*</span></label>
  <div class="parsley-row icheck-inline">
  <div class="btn-group" data-toggle="buttons-checkbox" id="AMLBtnGroup">
  <button type="button" id="NotAML" class="btn btn-success" data-toggle="button">Income</button>
  <button type="button" id="partialAML" class="btn ">Accumulation</button>
  </div>
  <input type="hidden" name ="instrumentType" id="instrumentType"/>
  <input type="hidden" value="add" name ="iisin" id="iisin"/>
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
  <select id="ddlCalender" name="ddlCalender" class="form-control">
  <option value="">Select Calender</option>
  </select>
  </div>
  </div>
  </div>
  </div>
  <div className="col-sm-7">
  <div className="form-group ">
  <div className="parsley-row uk-margin-top">
  <div class="select-option2">
  <select id="ddlCompany" name="ddlCompany" class="form-control">
  <option value="">Select Company</option>
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

function convertTime(date) {
        var elem = date.split(' ');
        var stSplit = elem[0].split(":");// alert(stSplit);
        var stHour = stSplit[0];
        var stMin = stSplit[1];
        var stAmPm = elem[1];
        var newhr = 0;
        var ampm = '';
        var newtime = '';
        //alert("hour:"+stHour+"\nmin:"+stMin+"\nampm:"+stAmPm); //see current values

        if (stAmPm=='PM')
        {
         if (stHour!=12)
         {
             stHour=stHour*1+12;
         }

        }
        else if(stAmPm=='AM' && stHour=='12'){
        stHour = stHour -12;
        }
        else{
         stHour=stHour;
          }
        //alert(stHour+':'+stMin+':'+'00')
        return stHour+':'+stMin+':'+'00';
      }

export default AcdInstrumentWizard;
