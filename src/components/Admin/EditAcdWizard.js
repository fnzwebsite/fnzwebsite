import {connect} from 'react-redux';
import React from 'react';
import Acd from './Acd'

class EditAcdWizard extends React.Component {
    componentDidMount() {
        window.$("#wizard_add").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true
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
                                <div id="wizard_add">
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
                                                        <input type="text" value={'this'} name="raddressLine1"
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
                                                        <input type="text" name="raddressLine2" required
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
                                                        <input type="text" name="registeredCity" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="registeredCounty">County<span
                                                            className="req">*</span></label>
                                                        <input type="text" name="registeredCounty" required
                                                               className="md-input"/>
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
                                                        <label for="registeredPostalCode">Postcode<span
                                                            className="req">*</span></label>
                                                        <input type="text" name="registeredPostalCode" required
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
                                                        <input type="text" name="paddressLine1" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="paddressLine2">Address Line 2<span
                                                            className="req">*</span></label>
                                                        <input type="text" name="paddressLine2" required
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
                                                        <input type="text" name="postalCity" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="postalCounty">County<span
                                                            className="req">*</span></label>
                                                        <input type="text" name="postalCounty" required
                                                               className="md-input"/>
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
                                                        <label for="postalPostCode">Postcode<span
                                                            className="req">*</span></label>
                                                        <input type="text" name="postalPostCode" required
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
                                                        <label for="Telephone">Telephone<span
                                                            className="req">*</span></label>
                                                        <input type="text" name="Telephone" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="Email">Email<span
                                                            className="req">*</span></label>
                                                        <input type="text" name="Email" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">Fax<span
                                                            className="req">*</span></label>
                                                        <input type="text" name="fullname" required
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
                                                            <input type="text" name="RelationshipName" required
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
                                                            <input type="text" name="relationshipemail" required
                                                                   className="md-input"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="parsley-row">
                                                        <div className="parsley-row uk-margin-top">
                                                            <label for="Relation">Relation<span
                                                                className="req">*</span></label>
                                                            <input type="text" name="Relation" required
                                                                   className="md-input"/>
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

export default EditAcdWizard;
