                                    import {connect} from 'react-redux';
                                    import React from 'react';
                                    import moment from 'moment'
                                    import {bindActionCreators} from 'redux';
                                    import PropTypes from 'prop-types';
                                    import { Redirect} from 'react-router-dom';
                                    import * as acdDataActions from '../../actions/acdDataActions'

                                    class Acd extends React.Component {

                                      constructor(props) {
                                        super(props);
                                      }

                                      componentWillMount(){
                                        //var data=0;

  this.props.acdDataActions.getAllAcdData();
                                      }
                                      componentWillReceiveProps()
                                      {
                                          this.props.acdDataActions.getAllAcdData();
                                        alert('data: '+JSON.stringify(this.props.acdDataActions.acdData));
                                      }
                                      render() {
                                        return (
                                          <div class="mt-6">
                                          <div class="row">
                                          <div class="col-md-12 wizard-list">
                                          <div class="row">
                                          <div class="md-card uk-margin-medium-bottom">

                                          <div class="md-card-toolbar">
                                          <h3 class="md-card-toolbar-heading-text"> Entities</h3>
                                          <a class="create md-btn md-btn-primary pull-right md-btn-wave-light waves-effect waves-button waves-light" data-uk-modal="{target:'#modal_header_footer'}" href="#"><i class="fa fa-plus"></i>Entity</a>
                                          </div>
                                          <div class="md-card-content">
                                          <table id="dt_default" class="uk-table" cellspacing="0" width="100%">
                                          <thead>
                                          <tr>
                                          <th rowspan="2">Name</th>
                                          </tr>
                                          <tr>
                                          <th>Entity Type</th>
                                          <th>City</th>
                                          <th>Country</th>
                                          <th>Postcode</th>
                                          <th>Email</th>
                                          <th>Telephone</th>
                                          <th>Fax</th>
                                          <th class="action uk-text-center">Action</th>
                                          </tr>
                                          </thead>
                                          <tbody>

                                          </tbody>
                                          </table>
                                          </div>
                                          </div>
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
                                        user: state.user
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
