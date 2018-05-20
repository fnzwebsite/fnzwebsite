import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom'
import Acd from './Acd'
import acdInstrumentActions from '../actions/acdInstrumentActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

class AcdInstrumentWizard extends React.Component {
  componentWillReceiveProps(prevProps, prevState){
      if(prevProps.postAcdInstrumentData.status=="SUCCESS"){
          this.props.updateInstrument();
          window.toastr.success('You have Successfully Created Account');
      }
  }
  componentDidMount()
  {
    let self = this;
    window.$("#wizard_add").steps({
      headerTag: "h3",
      bodyTag: "section",
      transitionEffect: "slideLeft",
      autoFocus: true
    });
     $(document).ready(function(){
       window.$('#datetimepicker3, #datetimepicker4').datetimepicker({
           format: 'LT'
       });
     })
    $(document).on('click', '.button_finish', function(){
      //alert(getFormData($('#wizard_advanced_form')));
      var unindexed_array = $('#wizard_advanced_form').serializeArray();
      var indexed_array = {};
      $.map(unindexed_array, function(n, i){
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
        "calendarDataId":"1cc041dc-3ee3-4784-bc9d-964d08d77e08",
        "instrumentBasis": "",
        "cancellationRight": true,
        "fundCompanyKey": "064e977e-4c16-49c1-9626-59055721a99b",
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
        "valuationPointTime": "12:00:00",
        "wknno": ""
      }
      console.log(JSON.stringify(reqData))
      //alert(localStorage.getItem('token'));
      var mode=$('#iisin').val();
      if(mode=="add")
      {
        //alert('add');
        $('.button_finish').hide();
        self.props.acdInstrumentActions.postInstrumentData(reqData);
        // $.ajax({
        //   type: "POST",
        //   url: 'http://35.178.56.52:8081/api/v1/instrument',
        //   headers:{authorization:JSON.parse(localStorage.getItem('token'))}
        //   ,data: JSON.stringify(reqData),
        //   success: function(res){
        //     //alert(JSON.stringify(res));
        //     if(res[0].status==="SUCCESS")
        //     {
        //       window.toastr.options.onHidden = function() { window.location.href="/acdinstrument";
        //       $('.button_finish').show(); }
        //       window.toastr.success('You have Successfully created Instrument');
        //     }
        //     else {
        //       window.toastr.options.onHidden = function() {$('.button_finish').show();} //window.location.href = "/acd"; }
        //       window.toastr.error('Unable to Create Instrument, Error Message: '+ res[0].info);
        //     }
        //   },
        //   error:function(err){
        //     window.toastr.error(err.responseText);
        //   },
        //   dataType: 'json',
        //   contentType:'application/json'
        // });
      }

      //if($('#isin').val)
      //alert(("insert");

    });

    $('body').on('click', '#AMLBtnGroup .btn', function(event) {
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


render() {
  return (
    <div className="uk-modal-dialog" id="acdmodalDialog">
    <button type="button" className="uk-modal-close uk-close"></button>
    <div className="uk-modal-header">
    <h3 className="uk-modal-title">Create Instrument</h3>
    </div>
    <div className="col-sm-12 create-sec">
    <div className="md-card uk-margin-large-bottom">
    <div className="md-card-content">
    <form className="uk-form-stacked" id="wizard_advanced_form">
    <div id="wizard_add" data-uk-observe>
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
    <div className="col-sm-6">
    <div className="form-group">
    <div className="parsley-row uk-margin-top">
    <div className="select-option">
    <select id="entityCombo" name="entityCombo" className="form-control">
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
    <div className="parsley-row uk-margin-top">
    <div className="input-group date" id="datetimepicker3" data-target-input="nearest">
    <div className="md-input-wrapper"><input type="text" className="md-input datetimepicker-input" data-target="#datetimepicker3" placeholder="Valuation Point time" required="" data-parsley-id="14"/></div>
    <div className="input-group-append" data-target="#datetimepicker3" data-toggle="datetimepicker">
    <div className="input-group-text"><i className="fa fa-clock-o"></i></div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div className="col-sm-6">
    <div className="form-group mt-4">
    <div className="uk-form-row parsley-row mt26">
    <label for="gender" className="clabel">Instrument Type<span className="req">*</span></label>
    <div className="parsley-row icheck-inline">
    <div className="btn-group" data-toggle="buttons-checkbox" id="AMLBtnGroup">
    <button type="button" id="NotAML" className="btn btn-success" data-toggle="button">Income</button>
    <button type="button" id="partialAML" className="btn ">Accumulation</button>
    </div>
    <input type="hidden" name ="instrumentType" id="instrumentType"/>
    <input type="hidden" value="add" name ="iisin" id="iisin"/>
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

const
    mapStateToProps = (state, props) => {
        return {
            postAcdAccountData: state.postAcdAccountData,
        }
    };


AcdInstrumentWizard.propTypes = {
    acdInstrumentActions: PropTypes.object,
    postAcdInstrumentData: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        acdInstrumentActions: bindActionCreators(acdInstrumentActions, dispatch)
    });

export default connect(mapStateToProps,
    mapDispatchToProps)(AcdInstrumentWizard);
