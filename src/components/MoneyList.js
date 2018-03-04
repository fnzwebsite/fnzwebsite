import React from 'react';

class MoneyList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var changeClass = 'change-positive',
            iconClass = 'glyphicon glyphicon-triangle-top',
            lastClass = this.props.data.stocks[this.props.item.short] <= this.props.data.last[this.props.item.short] ? 'last-negative' : 'last-positive';

        if (this.props.data && this.props.data.stocks[this.props.item.short] <= this.props.data.last[this.props.item.short]) {
            changeClass = 'change-negative';
            iconClass = 'glyphicon glyphicon-triangle-bottom';
        }
        console.log(this.props.data);
        return (
            <tr>
                <td>{this.props.item.long}</td>
                <td className={changeClass}>{this.props.data.stocks[this.props.item.short] ? (this.props.data.stocks[this.props.item.short]).toFixed(2) : (this.props.item.price).toFixed(2)}</td>
                <td>{this.props.item.volume}</td>
            </tr>

        );

    }
}


export default MoneyList;