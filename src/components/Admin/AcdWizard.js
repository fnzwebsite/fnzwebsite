import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import Acd from './Acd'
class AcdWizard extends React.Component {
  componentDidMount()
  {
    $(document).on('click', '.button_finish', function(){
  //alert(getFormData($('#wizard_advanced_form')));
  var unindexed_array = $('#wizard_advanced_form').serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

var reqData={
  "companyType":indexed_array["companyType"]
  ,"name":indexed_array["name"]

  ,"registeredAddress":{"addressLine1":indexed_array["raddressLine1"]
  ,"addressLine2":indexed_array["raddressLine2"]
  ,"city":indexed_array["registeredCity"],"county":indexed_array["registeredCounty"]
  ,"country":(indexed_array["registeredCountry"]!=null && indexed_array["registeredCountry"]!=undefined && indexed_array["registeredCountry"].length>0)?indexed_array["registeredCountry"]:""
  ,"postcode":indexed_array["registeredPostCode"]}

  ,"postalAddress":{"addressLine1":indexed_array["paddressLine1"]
  ,"addressLine2":indexed_array["paddressLine2"]
  ,"city":indexed_array["postalCity"],"county":indexed_array["postalCounty"]
  ,"country":(indexed_array["postalCountry"]!=null && indexed_array["postalCountry"]!=undefined && indexed_array["postalCountry"].length>0)?indexed_array["postalCountry"]:""
  ,"postcode":indexed_array["postalPostCode"]}

  ,"domicile":indexed_array["domicile"]
  ,"amlStatus":indexed_array["amlStatus"]
  ,"kycStatus":indexed_array["kycStatus"]

  ,"relationshipManager":{"name":indexed_array["RelationshipName"]
  ,"email":(indexed_array["relationshipemail"]!=null && indexed_array["relationshipemail"]!=undefined && indexed_array["relationshipemail"].length>0)?indexed_array["relationshipemail"]:""
  ,"relation":(indexed_array["relation"]!=null && indexed_array["relation"]!=undefined && indexed_array["relation"].length>0)?indexed_array["relation"]:""}

  ,"instrumentType":indexed_array["instrumentType"]
  ,"telephone":indexed_array["telephone"]
  ,"fax":indexed_array["Fax"]
  ,"email":indexed_array["Email"]
  ,"ucitisCompliant":true}
console.log(JSON.stringify(reqData))
  //alert(localStorage.getItem('token'));
    $.ajax({
  type: "POST",
  url: 'http://35.178.56.52:8081/api/v1/company',
  headers:{authorization:JSON.parse(localStorage.getItem('token'))}
  ,data: JSON.stringify(reqData),
  success: function(res){
    alert(JSON.stringify(res));
    window.location.href="/acd";
  //  ReactDOM.render(<Acd />,$(this));
  },
  error:function(err){
    alert(JSON.stringify(err));
  },
  dataType: 'json',
  contentType:'application/json'
});
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
                    <h3 className="uk-modal-title">Create ACD</h3>
                </div>
                <div className="col-sm-12 create-sec">
                    <div className="md-card uk-margin-large-bottom">
                        <div className="md-card-content">
                            <form className="uk-form-stacked" id="wizard_advanced_form">
                                <div id="wizard_advanced" data-uk-observe>
                                    <h3>Step 1</h3>
                                    <section>
                                        <h2 className="heading_a">
                                            ACD Information
                                        </h2>
                                        <hr className="md-hr" />
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="name">Name<span className="req">*</span></label>
                                                        <input type="text" name="name" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-7">
                                                <div class="form-group mt-4">
                                                    <div class="uk-form-row parsley-row mt26">
                                                        <label for="gender" class="clabel">Entity Type<span class="req">*</span></label>
                                                        <div class="parsley-row icheck-inline">

                                                            <div class="btn-group" data-toggle="buttons-checkbox" id="AMLBtnGroup">
                                                                <button type="button" id="NotAML" class="btn btn-success" data-toggle="button">Fund Manager</button>
                                                                <button type="button" id="partialAML" class="btn ">Fund Accountant</button>
                                                                <button type="button" id="fullAML" class="btn ">Trustee</button>
                                                            </div>
                                                            <input type="hidden" name ="companyType" id="companyType"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <h3>Step 2</h3>
                                    <section>
                                        <h2 className="heading_a">
                                            Registered Address
                                        </h2>
                                        <hr className="md-hr" />
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="raddressLine1">Address Line 1<span className="req">*</span></label>
                                                        <input type="text" name="raddressLine1" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="raddressLine2">Address Line 2<span className="req">*</span></label>
                                                        <input type="text" name="raddressLine2" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="registeredCity">City<span className="req">*</span></label>
                                                        <input type="text" name="registeredCity" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="registeredCounty">County<span className="req">*</span></label>
                                                        <input type="text" name="registeredCounty" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="parsley-row uk-margin-top">
                                                        <div className="select-option"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="registeredPostalCode">Postcode<span className="req">*</span></label>
                                                        <input type="text" name="registeredPostalCode" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <h3>Step 3</h3>
                                    <section>
                                        <h2 className="heading_a">
                                            Postal Address
                                            <span className="sub-heading">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                        </h2>
                                        <hr className="md-hr" />
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="paddressLine1">Address Line 1<span className="req">*</span></label>
                                                        <input type="text" name="paddressLine1" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="paddressLine2">Address Line 2<span className="req">*</span></label>
                                                        <input type="text" name="paddressLine2" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="postalCity">City<span className="req">*</span></label>
                                                        <input type="text" name="postalCity" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="postalCounty">County<span className="req">*</span></label>
                                                        <input type="text" name="postalCounty" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="parsley-row uk-margin-top">
                                                        <div className="select-option"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="postalPostCode">Postcode<span className="req">*</span></label>
                                                        <input type="text" name="postalPostCode" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <h3>Step 4</h3>
                                    <section>
                                        <h2 className="heading_a">
                                            More Details
                                        </h2>
                                        <hr className="md-hr" />
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="Telephone">Telephone<span className="req">*</span></label>
                                                        <input type="text" name="Telephone" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="Email">Email<span className="req">*</span></label>
                                                        <input type="text" name="Email" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">Fax<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <h4>Relationship:</h4>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="parsley-row">
                                                        <div className="parsley-row uk-margin-top">
                                                            <label for="RelationshipName">Name<span className="req">*</span></label>
                                                            <input type="text" name="RelationshipName" required className="md-input" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="parsley-row">
                                                        <div className="parsley-row uk-margin-top">
                                                            <label for="relationshipemail">Email<span className="req">*</span></label>
                                                            <input type="text" name="relationshipemail" required className="md-input" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="parsley-row">
                                                        <div className="parsley-row uk-margin-top">
                                                            <label for="Relation">Relation<span className="req">*</span></label>
                                                            <input type="text" name="Relation" required className="md-input" />
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

export default AcdWizard;
