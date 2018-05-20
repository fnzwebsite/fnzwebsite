import React from 'react';
import Dashboard from 'components/fnzdashboard/view/Dashboard'
class DashboardRoute extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                <Dashboard/>
            </div>
        );
    }
}

export default DashboardRoute;