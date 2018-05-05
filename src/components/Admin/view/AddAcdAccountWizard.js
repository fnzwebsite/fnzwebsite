import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom'
import Acd from './Acd'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import acdAccountActions from '../actions/acdAccountActions';

class AddAcdAccountWizard extends React.Component {
    componentWillReceiveProps(prevProps, prevState){
        if(prevProps.postAcdAccountData.status=="SUCCESS"){
            this.props.updateAccount();
            window.toastr.success('You have Successfully Created Account');
        }
    }
    componentDidMount() {
        let self = this;
        window.$("#wizard_add").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true
        });

        $(document).on('click', '.button_finish', function () {
            //alert(getFormData($('#wizard_advanced_form')));
            var unindexed_array = $('#wizard_advanced_form').serializeArray();
            var indexed_array = {};
            $.map(unindexed_array, function (n, i) {
                indexed_array[n['name']] = n['value'];
            });

            var reqData = {
                "accountType": $('#accountCombo').val(),
                "name": indexed_array["account"],
                "wallet": {
                    "address": "",
                    "owner": [
                        null
                    ],
                    "balance": {}
                }
            }

            console.log(JSON.stringify(reqData))
            //alert(localStorage.getItem('token'));
            var mode = $('#iisin').val();
            if (mode == "add") {
                $('.button_finish').hide();
                self.props.acdAccountActions.postAccountsData(reqData);
//                 $.ajax({
//                     type: "POST",
//                     url: 'http://35.178.56.52:8081/api/v1/account',
//                     headers: {authorization: JSON.parse(localStorage.getItem('token'))}
//                     , data: JSON.stringify(reqData),
//                     success: function (res) {
// //    alert(JSON.stringify(res));
//                         if (res[0].status === "SUCCESS") {
//                             window.toastr.options.onHidden = function () {
//                                 window.location.href = "/acdaccount";
//                                 $('.button_finish').show();
//                             }
//                             window.toastr.success('You have Successfully Created Account');
//                         }
//                         else {
//                             window.toastr.options.onHidden = function () {
//                                 $('.button_finish').show();
//                             } //window.location.href = "/acd"; }
//                             window.toastr.error('Unable to create account, Error Message: ' + res[0].info);
//                         }
//                     },
//                     error: function (err) {
//                         window.toastr.error(err.responseText);
//                         $('.button_finish').show();
//                     },
//                     dataType: 'json',
//                     contentType: 'application/json'
//                 });
            }
        });

        $('body').on('click', '#AMLBtnGroup .btn', function (event) {
            event.stopPropagation(); // prevent default bootstrap behavior
            if ($(this).attr('data-toggle') != 'button') { // don't toggle if data-toggle="button"
                var idval = $(this).attr('id');
                if ($(this).attr('id') == 'NotAML') {
                    $('#partialAML,#fullAML').removeAttr('data-toggle');
                    $(this).addClass('btn btn-success');
                    $('#partialAML,#fullAML').removeClass('btn-success');
                    $(this).attr('data-toggle', 'button');
                    $("#companyType").val("FundManager");
                }
                ;
                if ($(this).attr('id') == 'partialAML') {
                    $('#NotAML,#fullAML').removeAttr('data-toggle');
                    $(this).addClass('btn btn-success');
                    $('#NotAML,#fullAML').removeClass('btn-success');
                    $(this).attr('data-toggle', 'button');
                    $("#companyType").val("FundAccountant");
                }
                ;
                if ($(this).attr('id') == 'fullAML') {
                    $('#NotAML,#partialAML').removeAttr('data-toggle');
                    $(this).addClass('btn btn-success');
                    $('#NotAML,#partialAML').removeClass('btn-success');

                    $(this).attr('data-toggle', 'button');
                    $("#companyType").val("Trustee");
                }
                ;
            }

        });
    }


    render() {
        return (
            <div className="uk-modal-dialog" id="acdmodalDialog">
                <button type="button" className="uk-modal-close uk-close"></button>
                <div className="uk-modal-header">
                    <h3 className="uk-modal-title">Create Account</h3>
                </div>
                <div className="col-sm-12 create-sec">
                    <div className="md-card uk-margin-large-bottom">
                        <div className="md-card-content">
                            <form className="uk-form-stacked" id="wizard_advanced_form">
                                <div id="wizard_add" data-uk-observe>
                                    <h3>Step 1</h3>
                                    <section>
                                        <h2 className="heading_a">
                                            Account Details
                                        </h2>
                                        <hr className="md-hr"/>
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <div className="form-group ">
                                                    <div className="parsley-row uk-margin-top">
                                                        <label for="account">Account<span
                                                            className="req">*</span></label>
                                                        <input type="text" name="account" required
                                                               className="md-input"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-7">
                                                <div class="form-group mt-4">
                                                    <div class="parsley-row uk-margin-top">
                                                        <div class="select-option2">
                                                            <select id="accountCombo" name="accountCombo"
                                                                    class="form-control">
                                                                <option value="">Account Type</option>
                                                                <option value="Nominee">Nominee</option>
                                                                <option value="GIA">GIA</option>
                                                                <option value="ISA">ISA</option>
                                                                <option value="JISA">JISA</option>
                                                                <option value="Joint Account">Joint Account</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <input type="hidden" name="companyType" id="companyType"/>
                                                    <input type="hidden" value="add" name="iisin" id="iisin"/>

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


AddAcdAccountWizard.propTypes = {
    acdAccountActions: PropTypes.object,
    postAcdAccountData: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        acdAccountActions: bindActionCreators(acdAccountActions, dispatch)
    });

export default connect(mapStateToProps,
    mapDispatchToProps)(AddAcdAccountWizard);