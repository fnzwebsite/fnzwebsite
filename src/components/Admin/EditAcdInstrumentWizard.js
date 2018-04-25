import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom'
import Acd from './Acd'
class EditInstrumentWizard extends React.Component {
    componentDidMount()
    {
        window.$("#wizard_edit").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true
        });
    }


    render() {
        return (
            <div className="uk-modal-dialog" id="acdmodalDialog">
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
                                                        <input type="text" name="fundNameDisplay" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="shareClassName">Share Class Name<span className="req">*</span></label>
                                                        <input type="text" name="shareClassName" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="subFundName">Sub Fund Name<span className="req">*</span></label>
                                                        <input type="text" name="subFundName" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-7">
                                                <div class="form-group mt-4">
                                                    <div class="parsley-row uk-margin-top">
                                                        <div class="select-option2">
                                                            <select id="combo2" class="form-control">
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
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="isin">ISIN<span className="req">*</span></label>
                                                        <input type="text" value={this.props.acdInstrumentEditData.isin} name="isin" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="sedol">Sedol<span className="req">*</span></label>
                                                        <input type="text" name="sedol" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div class="parsley-row uk-margin-top">
                                                        <div class="input-group date" id="datetimepicker3" data-target-input="nearest">
                                                            <div class="md-input-wrapper"><input type="text" class="md-input datetimepicker-input" data-target="#datetimepicker3" placeholder="Valuation Point time" required="" data-parsley-id="14"/><span class="md-input-bar"></span></div>
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
                                                            <input type="hidden" name ="companyType" id="companyType"/>
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

export default EditInstrumentWizard;
