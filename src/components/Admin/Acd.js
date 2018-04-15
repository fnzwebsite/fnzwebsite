                                    import {connect} from 'react-redux';
                                    import React from 'react';
                                    import moment from 'moment'
                                    import {bindActionCreators} from 'redux';
                                    import PropTypes from 'prop-types';
                                    import { Redirect} from 'react-router-dom';
                                    import * as acdDataActions from '../../actions/acdDataActions'
                                    import $ from 'jquery';

                                    class Acd extends React.Component {
                                      constructor(props) {
                                        super(props);
                                        //this.props.acdDataActions.getAllAcdData();
                                      }

                                      componentWillMount(){
                                        this.props.acdDataActions.getAllAcdData();

                                      }
                                      loadEntities()
                                      {
                                          let self = this;
                                        //alert(JSON.stringify(this.props.acdData.name));
                                          const rows=Object.keys(this.props.acdData).map(function (keyName, keyIndex) {
                                            return(
                                              <tr>
                                                  <td>{self.props.acdData[keyName].name}</td>
                                                  <td>{self.props.acdData[keyName].networkEntityType}</td>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td>{self.props.acdData[keyName].contact.email}</td>
                                                  <td>{self.props.acdData[keyName].contact.telephone}</td>
                                                  <td></td>
                                                  <td className="uk-text-center">
                                                <a href="#" className="edit" data-uk-modal="{target:'#modal_header_footer'}"><i className="md-icon material-icons">&#xE254;</i></a>
                                              <a href="#"><i className="md-icon material-icons">&#xE872;</i></a>
                                            </td>
                                              </tr>
                                            )

                                          });

                                          return rows;
                                        }
                                      render() {

                                        if(this.props.acdData)
                                        {
                                        return (
                                          <div className="container-fluid" id="page_content">
                                                <div className="mt-6">
                                                <div className="row">
                                                <div className="col-md-12 wizard-list">
                                                <div className="row">
                                                <div className="md-card uk-margin-medium-bottom">

                                                <div className="md-card-toolbar">
                                                <h3 className="md-card-toolbar-heading-text"> Entities</h3>
                                                <a className="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light" data-uk-modal="{target:'#modal_header_footer'}" href="#"><i className="fa fa-plus"></i>Entity</a>
                                                </div>
                                                <div className="md-card-content">
                                                <table id="dt_default" className="uk-table" cellSpacing="0" width="100%">
                                                <thead>
                                                <tr>
                                                <th rowSpan="2">Name</th>
                                                </tr>
                                                <tr>
                                                <th>Entity Type</th>
                                                <th>City</th>
                                                <th>Country</th>
                                                <th>Postcode</th>
                                                <th>Email</th>
                                                <th>Telephone</th>
                                                <th>Fax</th>
                                                <th className="action uk-text-center">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.loadEntities()}
                                                </tbody>
                                                </table>
                                                </div>
                                                </div>
                                                </div>
                                                </div>
                                                </div>
                                                </div>

                                                <div id="modal">
                                                    <div className="uk-modal" id="modal_header_footer">
                                                    <div className="uk-modal-dialog">
                                                    <button type="button" className="uk-modal-close uk-close"></button>

                                                    <div className="uk-modal-header">
                                                    <h3 className="uk-modal-title">Create Entity</h3>
                                                    </div>
                                                    <div className="col-sm-12 create-sec">
                                                    <div className="md-card uk-margin-large-bottom">
                                                    <div className="md-card-content">
                                                    <form className="uk-form-stacked" id="wizard_advanced_form">
                                                    <div id="wizard_advanced" data-uk-observe>

                                                    <h3>Step 1</h3>
                                                    <section>
                                                    <h2 className="heading_a">
                                                    Entity Information
                                                    <span className="sub-heading">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                                    </h2>
                                                    <hr className="md-hr" />
                                                    <div className="row">
                                                    <div className="col-sm-5">
                                                    <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                    <label for="fullname">Name<span className="req">*</span></label>
                                                    <input type="text" name="fullname" required className="md-input" />
                                                    </div>
                                                    </div>
                                                    </div>
                                                    <div className="col-sm-7">
                                                    <div className="form-group mt-4">
                                                    <div className="uk-form-row parsley-row mt26">
                                                    <label for="gender" className="clabel">Entity Type<span className="req">*</span></label>
                                                    <div className="parsley-row icheck-inline">

                                                    <div className="btn-group" data-toggle="buttons-checkbox" id="AMLBtnGroup">
                                                    <button type="button" id="NotAML" className="btn btn-success" data-toggle="button">Fund Manager</button>
                                                    <button type="button" id="partialAML" className="btn ">Fund Accountant</button>
                                                    <button type="button" id="fullAML" className="btn ">Trustee</button>
                                                    </div>
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
                                                    </div>

                                                </div>
                                          </div>

                                        )
                                        }
                                        else {
                                          return <div></div>;
                                        }
                                      }
                                    }

                                    // const
                                    // mapStateToProps = (state, props) => {
                                    //   return {
                                    //     user: state.user
                                    //   }
                                    // };

                                    const
                                        mapStateToProps = (state, props) => {
                                            return {
                                                acdData: state.acdData,
                                            }
                                        };


                                    Acd.propTypes = {
                                      acdDataActions: PropTypes.object,
                                      acdData: PropTypes.array
                                    };

                                    const
                                    mapDispatchToProps = (dispatch) => ({
                                      acdDataActions: bindActionCreators(acdDataActions, dispatch)
                                    });


                                    export default connect(mapStateToProps,
                                      mapDispatchToProps)(Acd);

                                      //    export default TransactionsTable;
