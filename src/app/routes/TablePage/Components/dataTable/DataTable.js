import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import keycode from "keycode";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "material-ui/Table";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import DeleteIcon from "material-ui-icons/Delete";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import IsinTransTable from "./IsinTransTable";
import dealingActions from 'actions/Dashboard/dealingActions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from "moment";

let counter = 0;

function createData(
  isin,
  subscriptions,
  redemptions,
  netflow,
  price,
  priceDate,
  nav
) {
  counter += 1;
  return {
    id: counter,
    isin,
    subscriptions,
    redemptions,
    netflow,
    price,
    priceDate,
    nav
  };
}

const columnData = [
  {
    id: "isin",
    numeric: false,
    disablePadding: false,
    className: "isin",
    label: "ISIN"
  },
  {
    id: "subscriptions",
    numeric: true,
    disablePadding: false,
    className: "tran t-right",
    label: "Subscriptions"
  },
  {
    id: "redemptions",
    numeric: true,
    disablePadding: false,
    className: "tran t-right",
    label: "Redemptions"
  },
  {
    id: "netflow",
    numeric: true,
    disablePadding: false,
    className: "netflow",
    label: "Net Flow"
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    className: "tran t-right",
    label: "Price"
  },
  {
    id: "pricedate",
    numeric: true,
    disablePadding: false,
    className: "tran t-right",
    label: "Price Date"
  },
  {
    id: "nav",
    numeric: true,
    disablePadding: false,
    className: "pnav",
    label: "%Nav"
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    className: "tran t-center",
    label: "Actions"
  }
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
                className=""
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}

                className={column.className}
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

let DataTableToolbar = props => {
  const { numSelected } = props;

  return (
    <Toolbar
      className={classNames("table-header", {
        ["highlight-light"]: numSelected > 0
      })}
    >
      <div className="title">
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">Nutrition</Typography>
        )}
      </div>
      <div className="spacer" />
      <div className="actions">
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

DataTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

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
      orderBy: "isin",
      selected: [],
      data: [
      ].sort((a, b) => (a.isin < b.isin ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      open: false
    };
    this.handleActionClick=this.handleActionClick.bind(this);
  }

  componentWillReceiveProps(){
    var self=this;
    self.setState({data: this.props.tableData });
    //alert(this.state)
  }

  handleActionClick(selectedIsin){
    console.log('isin in action: '+selectedIsin);
    console.log('calendar date in action: '+this.props.calendarSelectedDate);
this.props.dealingActions.getDealingsByISIN(selectedIsin,moment(this.props.calendarSelectedDate).format('YYYY-MM-DD'));

    this.setState({open:true})
  }

  render() {
    //alert(JSON.stringify(this.props));
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      open
    } = this.state;
    const { fullScreen, Transition } = this.props;
    return (
      <Paper>
        {/* <DataTableToolbar numSelected={selected.length} /> */}
        <div>
          <Dialog
            className="cus-dialog tran-tab"
            open={this.state.open}
            onClose={this.handleRequestClose}
          >
            <DialogTitle className="cus-head"><i
                  className={`zmdi zmdi-hc-lg pull-left zmdi-filter-list`}
                />{"ISIN Data"}</DialogTitle>
            <DialogContent>
              <IsinTransTable dealsByIsin={this.props.data.dealsByIsin} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleRequestClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className="flex-auto">
          <div className="table-responsive-material isin-details">
            <Table className="">
              <DataTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={(data)?data.length:0}
              />
              <TableBody>
                {(data)?data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const navStyle =
                      n.nav > 1
                        ? `text-primary zmdi-hc-rotate-270`
                        : ` text-warning zmdi-hc-rotate-90`;

                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        // onClick={event => this.handleClick(event, n.id)}
                        onKeyDown={event => this.handleKeyDown(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell className="tran t-center" >{n.isin}</TableCell>

                        <TableCell numeric className="text-primary"><span>£</span>{n.subscriptions}<span>mn</span></TableCell>
                        <TableCell numeric className="text-warning"><span>£</span>{n.redemptions}<span>mn</span></TableCell>
                        <TableCell numeric className="text-primary"><span>£</span>{n.netflow}<span>mn</span></TableCell>
                        <TableCell numeric><span>£</span>{n.price}</TableCell>
                        <TableCell numeric>{n.priceDate}</TableCell>
                        <TableCell numeric>
                          {n.nav}{" "}
                          <i
                            className={`zmdi zmdi-play zmdi-hc-lg zmdi-hc-rotate-90  ${navStyle}`}
                          />
                        </TableCell>
                        <TableCell className="tran t-center">
                          <IconButton
                            className="size-20"
                             onClick={() =>this.handleActionClick(n.isin)}
                          //  onClick={() => this.setState({ open: true })}
                          >
                            <i className="zmdi zmdi-eye text-primary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }):' '}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={data?data.length:0}
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
        }
    };

const
    mapDispatchToProps = (dispatch) => ({
        dealingActions: bindActionCreators(dealingActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)(DataTable);

//export default DataTable;
