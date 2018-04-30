import {connect} from 'react-redux';
import React from 'react';
import Acd from './Acd';
import $ from 'jquery';

class EditAcdWizard extends React.Component {
    componentDidMount() {
        window.$("#wizard_edit").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true
        });

    window.$(document).on('click', '.button_finish', function () {
        //alert(getFormData($('#wizard_advanced_form')));
        var unindexed_array = window.$('#wizard_advanced_form').serializeArray();
        var indexed_array = {};
        window.$.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        var reqData = {
            "companyType": indexed_array["companyType"]
            , "name": indexed_array["name"]

            , "registeredAddress": {
                "addressLine1": indexed_array["raddressLine1"]
                ,
                "addressLine2": indexed_array["raddressLine2"]
                ,
                "city": indexed_array["registeredCity"],
                "county": indexed_array["registeredCounty"]
                ,
                "country": "United Kingdom"
                ,
                "postcode": indexed_array["registeredPostalCode"]
            }

            , "postalAddress": {
                "addressLine1": indexed_array["paddressLine1"]
                ,
                "addressLine2": indexed_array["paddressLine2"]
                ,
                "city": indexed_array["postalCity"],
                "county": indexed_array["postalCounty"]
                ,
                "country": "United Kingdom"
                ,
                "postcode": indexed_array["postalPostCode"]
            }

            , "domicile": indexed_array["domicile"]
            , "amlStatus": indexed_array["amlStatus"]
            , "kycStatus": indexed_array["kycStatus"]

            , "relationshipManager": {
                "name": indexed_array["RelationshipName"]
                ,
                "email": (indexed_array["relationshipemail"] != null && indexed_array["relationshipemail"] != undefined && indexed_array["relationshipemail"].length > 0) ? indexed_array["relationshipemail"] : ""
                ,
                "relation": (indexed_array["relation"] != null && indexed_array["relation"] != undefined && indexed_array["relation"].length > 0) ? indexed_array["relation"] : ""
            }

            , "instrumentType": indexed_array["instrumentType"]
            , "telephone": indexed_array["telephone"]
            , "fax": indexed_array["fax"]
            , "email": indexed_array["Email"]
            , "ucitisCompliant": true
        }
        console.log(JSON.stringify(reqData))
        //alert(localStorage.getItem('token'));
        //console.log('jjjjj'+JSON.stringify(this.props.acdEditData));
        var mode=$('#iisin').val();
        if(mode=="edit")
        {
          var companyId=$('#editIdentifier').val();
          window.$.ajax({
              type: "PUT",
              url: 'http://35.178.56.52:8081/api/v1/company/'+companyId,
              headers: {authorization: JSON.parse(localStorage.getItem('token'))}
              , data: JSON.stringify(reqData),
              success: function (res) {
                  alert(JSON.stringify(res));
                  window.location.href = "/acd";
                  //  ReactDOM.render(<Acd />,$(this));
              },
              error: function (err) {
                  alert(JSON.stringify(err));
              },
              dataType: 'json',
              contentType: 'application/json'
          });
        }
    });

    window.$('body').on('click', '#AMLBtnGroup .btn', function (event) {
        event.stopPropagation(); // prevent default bootstrap behavior
        if (window.$(this).attr('data-toggle') != 'button') { // don't toggle if data-toggle="button"
            var idval = window.$(this).attr('id');
            if (window.$(this).attr('id') == 'NotAML') {
                window.$('#partialAML,#fullAML').removeAttr('data-toggle');
                window.$(this).addClass('btn btn-success');
                window.$('#partialAML,#fullAML').removeClass('btn-success');
                window.$(this).attr('data-toggle', 'button');
                window.$("#companyType").val("FundManager");
            }
            ;
            if (window.$(this).attr('id') == 'partialAML') {
                window.$('#NotAML,#fullAML').removeAttr('data-toggle');
                window.$(this).addClass('btn btn-success');
                window.$('#NotAML,#fullAML').removeClass('btn-success');
                window.$(this).attr('data-toggle', 'button');
                window.$("#companyType").val("FundAccountant");
            }
            ;
            if (window.$(this).attr('id') == 'fullAML') {
                window.$('#NotAML,#partialAML').removeAttr('data-toggle');
                window.$(this).addClass('btn btn-success');
                window.$('#NotAML,#partialAML').removeClass('btn-success');

                window.$(this).attr('data-toggle', 'button');
                window.$("#companyType").val("Trustee");
            }
            ;
        }

    });
}

componentWillReceiveProps() {
}

    render() {
        return (


            <div className="uk-modal-dialog" id="acdmodalDialog">
                <button type="button" className="uk-modal-close uk-close"></button>
                <div className="uk-modal-header">
                    <h3 className="uk-modal-title">Edit ACD</h3>
                </div>
                <div className="col-sm-12 create-sec">
                    <div className="md-card uk-margin-large-bottom">
                        <div className="md-card-content">
                            <form className="uk-form-stacked" id="wizard_advanced_form">
                                <div id="wizard_edit">
                                    <h3>Step 1</h3>
                                    <section>
                                        <h2 className="heading_a">
                                            ACD Information
                                        </h2>
                                        <hr className="md-hr"/>
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="name">Name<span className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.name}
                                                               name="name" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-7">
                                                <div className="form-group mt-4">
                                                    <div className="uk-form-row parsley-row mt26">
                                                        <label for="gender" className="clabel">Entity Type<span
                                                            className="req">*</span></label>
                                                        <div className="parsley-row icheck-inline">

                                                            <div className="btn-group" data-toggle="buttons-checkbox"
                                                                 id="AMLBtnGroup">
                                                                <button type="button" id="NotAML"
                                                                        className="btn btn-success"
                                                                        data-toggle="button">
                                                                    Fund Manager
                                                                </button>
                                                                <button type="button" id="partialAML" className="btn ">
                                                                    Fund
                                                                    Accountant
                                                                </button>
                                                                <button type="button" id="fullAML" className="btn ">
                                                                    Trustee
                                                                </button>
                                                            </div>
                                                            <input type="hidden" name="companyType"
                                                                   id="companyType"/>
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
                                        <hr className="md-hr"/>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="raddressLine1">Address Line 1<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.registeredAddress.addressLine1} name="raddressLine1"
                                                               required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="raddressLine2">Address Line 2<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.registeredAddress.addressLine2} name="raddressLine2" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="registeredCity">City<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.registeredAddress.city} name="registeredCity" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="registeredCounty">County<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.registeredAddress.county} name="registeredCounty" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div class="col-sm-7">
                                                <div class="form-group mt-4">
                                                  <div class="parsley-row uk-margin-top">
                                                       <div class="select-option2">
                                                   <select id="rCountryCombo" class="form-control">
                                                       <option value="UK">UK</option>
                                                       <option value="France">France</option>
                                                       <option value="Italy">Italy</option>
                                                   </select>
                                               </div>
                                                  </div>
                                                </div>
                                            </div>

                                                <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                    <label for="registeredPostalCode">Postcode<span
                                                         className="req">*</span></label>
                                                     <input type="text" value={this.props.acdEditData.registeredAddress.postcode} name="registeredPostalCode" required
                                                            className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                      </div>
                                    </section>
                                    <h3>Step 3</h3>
                                    <section>
                                        <h2 className="heading_a">
                                            Postal Address
                                            <span
                                                className="sub-heading">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                        </h2>
                                        <hr className="md-hr"/>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="paddressLine1">Address Line 1<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.postalAddress.addressLine1} name="paddressLine1" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="paddressLine2">Address Line 2<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.postalAddress.addressLine2} name="paddressLine2" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="postalCity">City<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.postalAddress.city} name="postalCity" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="postalCounty">County<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.postalAddress.county} name="postalCounty" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div class="col-sm-7">
                                                <div class="form-group mt-4">
                                                  <div class="parsley-row uk-margin-top">
                                                       <div class="select-option2">
                                                   <select id="pCountryCombo" class="form-control">
                                                       <option value="UK">UK</option>
                                                       <option value="France">France</option>
                                                       <option value="Italy">Italy</option>
                                                   </select>
                                               </div>
                                                  </div>
                                                </div>
                                            </div>

                                                <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                       <label for="postalPostCode">Postcode<span
                                                            className="req">*</span></label>
                                                        <input type="text" name="postalPostCode" value={this.props.acdEditData.postalAddress.postcode} required
                                                               className="md-input"/>
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
                                        <hr className="md-hr"/>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="telephone">Telephone<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.telephone} name="telephone" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="Email">Email<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.email} name="Email" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fax">Fax<span
                                                            className="req">*</span></label>
                                                        <input type="text" value={this.props.acdEditData.fax} name="fax" required
                                                               className="md-input"/>
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
                                                            <label for="RelationshipName">Name<span
                                                                className="req">*</span></label>
                                                            <input type="text" value={this.props.acdEditData.relationshipManager.name} name="RelationshipName" required
                                                                   className="md-input"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="parsley-row">
                                                        <div className="parsley-row uk-margin-top">
                                                            <label for="relationshipemail">Email<span
                                                                className="req">*</span></label>
                                                            <input type="text" value={this.props.acdEditData.relationshipManager.email} name="relationshipemail" required
                                                                   className="md-input"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="parsley-row">
                                                        <div className="parsley-row uk-margin-top">
                                                            <label for="relation">Relation<span
                                                                className="req">*</span></label>
                                                            <input type="text" value={this.props.acdEditData.relationshipManager.relation} name="relation" required
                                                                   className="md-input"/>
                                                        </div>
                                                        <input type="hidden" value="edit" name ="iisin" id="iisin"/>
                                                        <input type="hidden" value={this.props.acdEditData.identifier} name ="editIdentifier" id="editIdentifier"/>
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

export default EditAcdWizard;
