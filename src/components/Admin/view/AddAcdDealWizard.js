import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom'
import acdAccountActions from '../actions/acdAccountActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import acdDealActions from '../actions/acdDealActions';
import acdInstrumentActions from '../actions/acdInstrumentActions';

class AddAcdDealWizard extends React.Component {

  componentWillReceiveProps(prevProps, prevState){
      if(prevProps.postAcdDealData && prevProps.postAcdDealData.status=="SUCCESS"){
          this.props.updateDeal();
          window.toastr.success('You have Successfully Created Account');
      }
  }

  componentDidUpdate(){
    let self=this;
    this.props.acdAccountActions.getAccountsData();
    this.props.acdInstrumentActions.getInstrumentData();

    if(self.props.acdAccountData){
      var arr = Object.keys(self.props.acdAccountData).map(function(k) { return self.props.acdAccountData[k] });
          $(arr).each(function(index,item){
            //    console.log(item);
            $("#ddlAccount").append('<option value="'+item.identifier+'">'+item.name+'</option>')
          })
    }

      if (this.props.acdInstrumentData) {
            var arr = Object.keys(self.props.acdInstrumentData).map(function(k) { return self.props.acdInstrumentData[k] });

            $(arr).each(function(index,item){
              //    console.log(item);
              $("#ddlInstrument").append('<option value="'+item.isin+'">'+item.name+'</option>')
            })
      }
  }

  componentDidMount()
  {
    let self=this;
    window.$("#wizard_add").steps({
      headerTag: "h3",
      bodyTag: "section",
      transitionEffect: "slideLeft",
      autoFocus: true
    });
    this.props.acdAccountActions.getAccountsData();
    $(document).ready(function(){
      //self.acdAccountActions.getAccountsData();
      //alert(JSON.stringify(self.props.acdAccountData));
      // if(self.props.acdAccountData && self.props.acdAccountData.length){
      //   var arr = Object.keys(self.props.acdAccountData).map(function(k) { return self.props.acdAccountData[k] });
      //       $(arr).each(function(index,item){
      //         //    console.log(item);
      //         $("#ddlAccount").append('<option value="'+item.identifier+'">'+item.name+'</option>')
      //       })
      // }



      // $.ajax({
      //   type: "GET",
      //   url: 'http://35.178.56.52:8081/api/v1/account',
      //   headers:{authorization:JSON.parse(localStorage.getItem('token'))},
      //   success: function(res){
      //     var arr = Object.keys(res).map(function(k) { return res[k] });
      //
      //     $(arr).each(function(index,item){
      //       //    console.log(item);
      //       $("#ddlAccount").append('<option value="'+item.identifier+'">'+item.name+'</option>')
      //     })
      //   },
      //   error:function(err){
      //     alert(JSON.stringify(err));
      //   }
      // });

      // $.ajax({
      //   type: "GET",
      //   url: 'http://35.178.56.52:8081/api/v1/instrument',
      //   headers:{authorization:JSON.parse(localStorage.getItem('token'))},
      //   success: function(res){
      //     var arr = Object.keys(res).map(function(k) { return res[k] });
      //
      //     $(arr).each(function(index,item){
      //       //    console.log(item);
      //       $("#ddlInstrument").append('<option value="'+item.isin+'">'+item.name+'</option>')
      //     })
      //   },
      //   error:function(err){
      //     alert(JSON.stringify(err));
      //   }
      // });
    })
    $(document).on('click', '.button_finish', function(){
      //alert(getFormData($('#wizard_advanced_form')));
      var unindexed_array = $('#wizard_advanced_form').serializeArray();
      var indexed_array = {};
      $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
      });
      //alert($('#ddlInstrument').val());
      var deal=$('AMLBtnGroup1').val();
      var reqData
      if(deal=='Amount'){
        reqData={
          "account": $('#ddlAccount').val(),
          "dealType": indexed_array['dealType']==""?"BUY":indexed_array['dealType'],
          "instrumentPrimaryIdentifier": $('#ddlInstrument').val(),
          "units": indexed_array['AMLBtnGroup1']=="Amount"?0:indexed_array['quantity'],
          "price": 0,
          "amount":indexed_array['quantity'],
          "tradeFor": "U",
          "currency": indexed_array['currencyCombo'],
          "source": "STP",
          "tradeTime": "2018-04-25T13:57:14.910Z"

        }
      }
      else{
        reqData={
          "account": $('#ddlAccount').val(),
          "dealType": indexed_array['dealType']==""?"BUY":indexed_array['dealType'],
          "instrumentPrimaryIdentifier": $('#ddlInstrument').val(),
          "units": indexed_array['AMLBtnGroup1']=="Amount"?0:indexed_array['quantity'],
          "price": 0,
          "units":indexed_array['quantity'],
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
        self.props.acdDealActions.postDealData(reqData);
        // $.ajax({
        //   type: "POST",
        //   url: 'http://35.178.56.52:8081/api/v1/dealing',
        //   headers:{authorization:JSON.parse(localStorage.getItem('token'))}
        //   ,data: JSON.stringify(reqData),
        //   success: function(res){
        //     //alert(JSON.stringify(res));
        //     if(res[0].status==="SUCCESS")
        //     {
        //       window.toastr.options.onHidden = function() { window.location.href="/acddeal";$('.button_finish').show();  }
        //       window.toastr.success('You have Successfully Created Deal');
        //     }
        //     else {
        //       window.toastr.options.onHidden = function() {$('.button_finish').show(); } //window.location.href = "/acd"; }
        //       window.toastr.error('Unable to create Deal, Error Message: '+ res[0].info);
        //     }
        //     //  ReactDOM.render(<Acd />,$(this));
        //   },
        //   error:function(err){
        //     window.toastr.error(JSON.stringify(err));
        //     $('.button_finish').show();
        //   },
        //   dataType: 'json',
        //   contentType:'application/json'
        // });
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
    <button type="button" id="NotAML1" class="btn btn-success" data-toggle="button">
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

const
    mapStateToProps = (state, props) => {
        return {
            postAcdDealData: state.postAcdDealData,
            acdAccountData: state.acdAccountData,
            acdInstrumentData: state.acdInstrumentData
        }
    };


AddAcdDealWizard.propTypes = {
    acdDealActions: PropTypes.object,
    postAcdDealData: PropTypes.array,
    acdAccountActions: PropTypes.object,
    acdAccountData: PropTypes.array,
    acdInstrumentActions: PropTypes.object,
    acdInstrumentData: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        acdDealActions: bindActionCreators(acdDealActions, dispatch),
        acdAccountActions: bindActionCreators(acdAccountActions, dispatch),
        acdInstrumentActions: bindActionCreators(acdInstrumentActions, dispatch)
    });

export default connect(mapStateToProps,
    mapDispatchToProps)(AddAcdDealWizard);
