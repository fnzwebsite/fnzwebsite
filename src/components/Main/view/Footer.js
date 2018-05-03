import {connect} from 'react-redux';
import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="main-footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <p>&copy; Copyright FNZ UK Ltd 2018.</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
