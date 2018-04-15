import {connect} from 'react-redux';
import React from 'react';

class AcdWizard extends React.Component {
    render() {
        return (
            <div className="uk-modal-dialog">
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
                                            <span className="sub-heading">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                        </h2>
                                        <hr className="md-hr" />
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">Name<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <h3>Step 2</h3>
                                    <section>
                                        <h2 className="heading_a">
                                            Registered Address
                                            <span className="sub-heading">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                        </h2>
                                        <hr className="md-hr" />
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">Address Line 1<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">Address Line 2<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">City<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">County<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
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
                                                        <label for="fullname">Postcode<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
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
                                                        <label for="fullname">Address Line 1<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">Address Line 2<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">City<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">County<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
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
                                                        <label for="fullname">Postcode<span className="req">*</span></label>
                                                        <input type="text" name="fullname" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <h3>Step 4</h3>
                                    <section>
                                        <h2 className="heading_a">
                                            More Details
                                            <span className="sub-heading">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                        </h2>
                                        <hr className="md-hr" />
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">Telephone<span className="req">*</span></label>
                                                        <input type="text" name="telephone" required className="md-input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="fullname">Email<span className="req">*</span></label>
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
                                                            <label for="fullname">Name<span className="req">*</span></label>
                                                            <input type="text" name="fullname" required className="md-input" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="parsley-row">
                                                        <div className="parsley-row uk-margin-top">
                                                            <label for="fullname">Relation<span className="req">*</span></label>
                                                            <input type="text" name="fullname" required className="md-input" />
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
