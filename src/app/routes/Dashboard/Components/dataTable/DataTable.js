import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import keycode from "keycode";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import dealingActions from 'actions/Dashboard/dealingActions';
import userActions from 'actions/login/user.actions';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";
import Tooltip from "material-ui/Tooltip";
import DeleteIcon from "material-ui-icons/Delete";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import io from "socket.io-client";
import {authHeader, getConfig} from 'helpers/index';
import moment from 'moment';

let counter = 0;

function createData(
  trade,
  invAcc,
  isin,
  tradeType,
  units,
  amount,
  status

) {
  counter += 1;
  return {
    id: counter,
    trade,
    invAcc,
    isin,
    tradeType,
    units,
    amount,
    status

  };
}



const columnData = [
  { id: "trade", numeric: false, disablePadding: true,className:'tran t-center colwidth124', label: "Trade Date" },
  {
    id: "invAcc",
    numeric: false,
    disablePadding: false,
    className:'tran t-center',
    label: "Investment Account"
  },
  { id: "isin", numeric: false, disablePadding: false, className:'tran t-center',

   label: "ISIN" },
  {
    id: "tradeType",
    numeric: false,
    disablePadding: false,
    className:'tran t-center colwidth180',
    label: "Trade Type"
  },
  { id: "units", numeric: true, disablePadding: false, className:'tran t-right', label: "Units" },
  { id: "amount", numeric: true, disablePadding: false, className:'tran t-right',   label: "Amount" },
  { id: "status", numeric: false, disablePadding: false, className:' stat tran t-center', label: "Status" },

];

class DataTableHead extends React.Component {

  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    let LoadRows = null;
        let self = this;

    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;
    return (
      <TableHead>
        <TableRow>

          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
                className={column.className}

                //className={ column.className ? "tran t-right" : "default"}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

class DataTable extends React.Component {

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };
  handleKeyDown = (event, id) => {
    if (keycode(event) === "space") {
      this.handleClick(event, id);
    }
  };
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: "asc",
      orderBy: "trade",
      selected: [],
      data: [
      ].sort((a, b) => (a.trade < b.trade ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      open: false
    };

  }


  componentDidMount(prevProps, prevState) {
        var self = this;
        //var socket = io('http://localhost:3700', {query: "auth=" + authHeader()['Authorization']});
        var socket = io(getConfig('socketurl'), {query: "auth=" + authHeader()['Authorization']});
        socket.on('dealingbyday', function (dealingbydate) {
        
          if(dealingbydate){
                           var dealData = [];
                
                Object.keys(dealingbydate).forEach((itm, i) => {
                  
                   var dealDataObj= createData(dealingbydate[itm].tradeTime
                      ,dealingbydate[itm].account?dealingbydate[itm].account:" "
                      ,dealingbydate[itm].instrumentPrimaryIdentifier?dealingbydate[itm].instrumentPrimaryIdentifier:" "
                      ,dealingbydate[itm].dealType
                      ,dealingbydate[itm].units
                    ,dealingbydate[itm].amount
                  ,dealingbydate[itm].dealingStatus);
                  console.log(dealDataObj);
                dealData.push(dealDataObj);
                });
                //console.log("Data from socket: "+JSON.stringify(dealData));
                self.setState({ data: dealData });
               // this.state.data= dealData;
           // }
          }
        })
        // var today = moment().format("YYYY-MM-DD");
        // var dealing = this.state.dealing || this.props.data.dealing;
        // //alert(JSON.stringify(dealing))
        // if(dealing ){
        //         //if (self.props.loadThisDay == 'today') {
        //             Object.keys(dealing).map(function (keyName, keyIndex) {
        //                 if (moment(dealing[keyName].boxDate).isSame(today, 'd')) {

        //                         //alert(dealing[keyName].tradeTime);
        //                       }
        //           });
        //       //}
        //     }
    }



  componentWillMount(prevProps, prevState) {
    this.props.dealingActions.getDealings();
  }
  render() {
    //alert('hi'+JSON.stringify(dealing))

    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    //alert('render'+JSON.stringify(data));
    return (
      <Paper>
        <div className="flex-auto">


          <div className="table-responsive-material">
            <Table className="">
              <DataTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
              if(data && data.length)
                {

                  data

                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n =>{

                    // const statusStyle = n.status.includes("Accepted")
                    // ? "text-white bg-success"
                    // : n.status.includes("On Hold")
                    //   ? "bg-amber"
                    //   : n.status.includes("Rejected")
                    //     ? "text-white bg-danger"
                    //     : "text-white bg-grey";

                    const statusStyle = n.status.includes("Accepted")
                    ? "text-white bg-success"
                    : n.status.includes("On Hold")
                      ? "bg-amber"
                      : n.status.includes("Rejected")
                        ? "text-white bg-danger"
                        : n.status.includes("Priced")
                        ?"text-white bg-success"
                        : "text-white bg-grey";
                        
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        onKeyDown={event => this.handleKeyDown(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >

                        <TableCell padding="none" className="tran t-center">{n.trade}</TableCell>
                        <TableCell className="tran t-center">{n.invAcc}</TableCell>
                        <TableCell className="tran t-center">{n.isin}</TableCell>
                        <TableCell className="tran t-center">{n.tradeType}</TableCell>
                        <TableCell numeric>{n.units}</TableCell>
                        <TableCell numeric>{n.amount}</TableCell>



                        <TableCell  className="tran t-center">
                        <div className={` badge text-uppercase ${statusStyle}`}>
                         {n.status}
                        </div></TableCell>

                      </TableRow>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </Paper>
    );
  }
}

const
    mapStateToProps = (state, props) => {
        return {
            data: state,
            user: state.user,
            price: state.price,
            dealing: state.dealing
        }
    };

DataTable.propTypes = {
    userActions: PropTypes.object,
    user: PropTypes.array,
      dealing: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        dealingActions: bindActionCreators(dealingActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    });

    export default connect(mapStateToProps,
        mapDispatchToProps)(DataTable);

//export default DataTable;
