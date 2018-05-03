import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {getConfig} from '../../helpers/index';

var stepsWizard = null;

class EditInstrumentWizard extends React.Component {
    componentDidMount() {


        var self = this;

        window.$("#wizard_edit").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true
        });

        this.setData();
        $(document).ready(function () {
          window.$('#datetimepicker3, #datetimepicker4').datetimepicker({
              format: 'LT'
            })
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
                var calender=$("#calenderEdit").val();
                     $('#ddlCalender').val(calender)
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
                var company=$("#companyEdit").val();
                     $('#ddlCompany').val(company)
              },
              error:function(err){
                alert(JSON.stringify(err));
              }
            });

         var insType=$('#instrumentType').val();
         //alert(deal);
         if(insType=="Accumulation"){
           $('#NotAML').removeAttr('data-toggle');
           $('#partialAML').addClass('btn btn-success');
           $('#NotAML').removeClass('btn-success');
           $(this).attr('data-toggle', 'button');
         }
       });
        window.$(document).on('click', '.button_finish', function () {
            //alert(getFormData($('#wizard_advanced_form')));
            var unindexed_array = window.$('#wizard_advanced_form').serializeArray();
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
            //console.log('jjjjj'+JSON.stringify(this.props.acdEditData));
            var mode = $('#iisin').val();
            if (mode == "edit") {
                $('.button_finish').hide();
                window.$.ajax({
                    type: "PUT",
                    url: getConfig('ApiUrl')+'api/v1/instrument',
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
                                self.props.reloadAcdInstrument();
                                window.location.href = "/acdinstrument";
                                $('.button_finish').show();
                            }
                            window.toastr.success('You have Successfully modified Instrument');
                        }
                        else {
                            window.toastr.options.onHidden = function () {
                                $('.button_finish').show();
                            } //window.location.href = "/acd"; }
                            window.toastr.error('Unable to Modify Instrument, Error Message: ' + res[0].info);
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

    componentDidUpdate() {
        this.setData();
    }

    setData() {
        window.$("input#fundNameDisplay").val(this.props.acdEditData.displayName);
        window.$("input#subFundName").val(this.props.acdEditData.subFundKey);
        window.$("input#isin").val(this.props.acdEditData.isin);
        window.$("input#sedol").val(this.props.acdEditData.sedol);
        window.$("input#instrumentType").val(this.props.acdEditData.instrumentType);
        var time=timeTo12HrFormat(this.props.acdEditData.valuationPointTime);
        window.$("input#valuationPointTime").val(time);
        window.$("input#calenderEdit").val(this.props.acdEditData.calendarDataId);
        window.$("input#companyEdit").val(this.props.acdEditData.fundCompanyKey);

        //window.$("input#entityType").val(this.props.acdEditData.ent);

    }


    render() {
        return (
          <div className="uk-modal-dialog" id="acdEditInstrumentmodalDialog">
               <button type="button" className="uk-modal-close uk-close"></button>
               <div className="uk-modal-header">
                   <h3 className="uk-modal-title">Edit Instrument</h3>
               </div>
               <div className="col-sm-12 create-sec">
                   <div className="md-card uk-margin-large-bottom">
                       <div className="md-card-content">
                           <form className="uk-form-stacked" id="wizard_advanced_form">
                               <div id="wizard_edit" data-uk-observe>
                                   <h3>Step 1</h3>
                                   <section>
                                       <h2 className="heading_a">
                                           Instrument Details
                                       </h2>
                                       <hr className="md-hr" />
                                       <div className="row">
                                           <div className="col-sm-5">
                                               <div className="form-group ">
                                                   <div className="parsley-row uk-margin-top">
                                                       <label for="fundNameDisplay">Fund Name Display<span className="req">*</span></label>
                                                       <input type="text" id="fundNameDisplay" name="fundNameDisplay" required className="md-input" />
                                                   </div>
                                               </div>
                                           </div>
                                           <div className="col-sm-5">
                                               <div className="form-group ">
                                                   <div className="parsley-row uk-margin-top">
                                                       <label for="shareClassName">Share Class Name<span className="req">*</span></label>
                                                       <input type="text" name="shareClassName" id="shareClassName" required className="md-input" />
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="row">
                                           <div className="col-sm-5">
                                               <div className="form-group ">
                                                   <div className="parsley-row uk-margin-top">
                                                       <label for="subFundName">Sub Fund Name<span className="req">*</span></label>
                                                       <input type="text" name="subFundName" id="subFundName" required className="md-input" />
                                                   </div>
                                               </div>
                                           </div>
                                           <div class="col-sm-7">
                                               <div class="form-group mt-4">
                                                   <div class="parsley-row uk-margin-top">
                                                       <div class="select-option2">
                                                       <label for="entity">Entity Type<span className="req">*</span></label>
                                                           <select id="entityCombo" name="entityCombo" class="form-control">
                                                               <option value="">Select Entity Type</option>
                                                               <option value="Fund Accountant">Fund Accountant</option>
                                                               <option value="Trustee">Trustee</option>
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
                                                       <label for="isin">ISIN<span className="req">*</span></label>
                                                       <input type="text" name="isin" id="isin" required className="md-input" />
                                                   </div>
                                               </div>
                                           </div>
                                           <div className="col-sm-5">
                                               <div className="form-group ">
                                                   <div className="parsley-row uk-margin-top">
                                                       <label for="sedol">Sedol<span className="req">*</span></label>
                                                       <input type="text" name="sedol" id="sedol" required className="md-input" />
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="row">
                                           <div className="col-sm-5">
                                               <div className="form-group ">
                                                   <div class="parsley-row uk-margin-top">
                                                       <div class="input-group date" id="datetimepicker3" data-target-input="nearest">
                                                           <div class="md-input-wrapper"><input type="text" id="valuationPointTime" name="valuationPointTime" class="md-input datetimepicker-input" data-target="#datetimepicker3" placeholder="Valuation Point time" required="" data-parsley-id="14"/><span class="md-input-bar"></span></div>
                                                           <div class="input-group-append" data-target="#datetimepicker3" data-toggle="datetimepicker">
                                                               <div class="input-group-text"><i class="fa fa-clock-o"></i></div>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                           <div class="col-sm-7">
                                               <div class="form-group mt-4">
                                                   <div class="uk-form-row parsley-row mt26">
                                                       <label for="gender" class="clabel">Instrument Type<span class="req">*</span></label>
                                                       <div class="parsley-row icheck-inline">

                                                           <div class="btn-group" data-toggle="buttons-checkbox" id="AMLBtnGroup">
                                                               <button type="button" id="NotAML" class="btn btn-success" data-toggle="button">Income</button>
                                                               <button type="button" id="partialAML" class="btn ">Accumulation</button>
                                                           </div>
                                                           <input type="hidden" name ="instrumentType" id="instrumentType"/>
                                                           <input type="hidden" value="edit" name ="iisin" id="iisin"/>
                                                           <input type="hidden" name ="entityType" id="entityType"/>
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
                                       <input type="hidden" name ="calenderEdit" id="calenderEdit"/>
                                       <input type="hidden" name ="companyEdit" id="companyEdit"/>
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


    function timeTo12HrFormat(time)
{   // Take a time in 24 hour format and format it in 12 hour format
    var time_part_array = time.split(":");
    var ampm = 'AM';

    if (time_part_array[0] >= 12) {
        ampm = 'PM';
    }

    if (time_part_array[0] > 12) {
        time_part_array[0] = time_part_array[0] - 12;
    }

    var formatted_time = time_part_array[0] + ':' + time_part_array[1] + ':' + time_part_array[2] + ' ' + ampm;

    return formatted_time;
}

export default EditInstrumentWizard;
