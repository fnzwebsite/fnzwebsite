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
import { Button } from "material-ui";
import AlertDialog from "../alerts/AlertDialog";
import CardBox from "components/CardBox";
import Menu, { MenuItem } from "material-ui/Menu";
import SearchBox from "components/SearchBox/index";
import { connect } from "react-redux";
import { searchTable, filterTable, fetchTableData } from "actions";

let counter = 0;

function createData(
  name,
  iaccount,
  isin,
  tradetype,
  units,
  amount,
  status,
  actions
) {
  counter += 1;
  return {
    id: counter,
    name,
    iaccount,
    isin,
    tradetype,
    units,
    amount,
    status,
    actions
  };
}

const columnData = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Trade Date"
  },
  {
    id: "iaccount",
    numeric: false,
    disablePadding: true,
    label: "Investment Account"
  },
  { id: "isin", numeric: false, disablePadding: false, label: "ISIN" },
  {
    id: "tradetype",
    numeric: false,
    disablePadding: false,
    label: "Trade Type"
  },
  { id: "units", numeric: false, disablePadding: false, label: "Units" },
  { id: "amount", numeric: false, disablePadding: false, label: "Amount" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" }
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
          // <TableCell padding="checkbox">
          //   <Checkbox
          //     color="primary"
          //     indeterminate={numSelected > 0 && numSelected < rowCount}
          //     checked={numSelected === rowCount}
          //     onChange={onSelectAllClick}
          //   />
          // </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
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
          <Typography type="title" component="h3">
            ACD List
          </Typography>
        )}
      </div>
      <div className="spacer" />
      <div className="actions">
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <div>
            <AlertDialog />
          </div>
        )}
      </div>
    </Toolbar>
  );
};

DataTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

class DataTable extends React.Component {
  onContactOptionSelect = event => {
    this.setState({ menuState: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ menuState: false });
    
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.props.tableData.sort(
            (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
          )
        : this.props.tableData.sort(
            (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
          );

    this.setState({ data, order, orderBy });
  };
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n._id) });
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

  constructor(props, context) {
    super(props, context);

    this.state = {
      anchorEl: undefined,
      menuState: false,
      addContactState: false,
      order: "asc",
      orderBy: "iamount",
      selected: [],
      data: this.props.tableData.sort((a, b) => (a.amount < b.amount ? -1 : 1)),
      // [
      // createData("01/02/2018","ACC001" , "GBX00241", "Buy",  1000 ,999 , "Accepted" , "yes"),
      // createData("01/02/2017","ACC001" , "GBX00241", "Sell", 100 ,939 ,  "On Hold" , "yes"),
      // createData("01/02/2017","ACC001" , "GBX00241", "Buy",  1500 ,999 , "On Hold" , "yes"),
      // createData("01/02/2016","ACC001" , "GBX00241", "Sell", 1000, 979 , "Accepted" , "yes"),
      // createData("01/02/2016","ACC001" , "GBX00241", "Buy",  1080, 995 , "Rejected" , "yes"),
      // createData("01/02/2019","ACC001" , "GBX00241", "Sell", 1002, 909 , "Accepted" , "yes"),
      // ]
      // .sort((a, b) => (a.amount < b.amount ? -1 : 1)),
      page: 0,
      rowsPerPage: 5
    };
  }

  componentDidMount() {
    this.props.fetchTableData();
  }

  updateTable(evt) {
    this.props.searchTable(evt.target.value);
    this.props.filterTable(evt.target.value);
  }

  render() {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const { menuState, anchorEl } = this.state;
    const ITEM_HEIGHT = 40;
    const options = ["Edit", "Delete"];

    return (
      <div>
        <Paper>
          <DataTableToolbar numSelected={selected.length} />
          <SearchBox
            placeholder="search"
            onChange={this.updateTable.bind(this)}
            value={this.props.searchValue}
          />
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
                {this.props.tableData ? (
                  <TableBody>
                    {this.props.tableData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(n => {
                        const statusStyle = n.status.includes("Accepted")
                          ? "text-white bg-success"
                          : n.status.includes("On Hold")
                            ? "bg-amber"
                            : n.status.includes("Rejected")
                              ? "text-white bg-danger"
                              : "text-white bg-grey";

                        const isSelected = this.isSelected(n._id);
                        return (
                          
                         
                            <TableCell padding="none">{n.name}</TableCell>
                            <TableCell>{n.iaccount}</TableCell>
                            <TableCell padding="none">{n.isin}</TableCell>
                            <TableCell>{n.tradetype}</TableCell>
                            <TableCell>{n.units}</TableCell>
                            <TableCell>{n.amount}</TableCell>
                            <TableCell className="status-cell text-left">
                              <div
                                className={` badge text-uppercase ${statusStyle}`}
                              >
                                {n.status}
                              </div>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                className="size-30"
                                onClick={this.onContactOptionSelect}
                              >
                                <i className="zmdi zmdi-more-vert" />
                              </IconButton>

                              <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                open={menuState}
                                onClose={this.handleRequestClose}
                                style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
                                MenuListProps={{
                                  style: {
                                    width: 100
                                  }
                                }}
                              >
                                {options.map(option => (
                                  <MenuItem
                                    key={option}
                                    onClick={() => {
                                      this.handleRequestClose();
                                    }}
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </Menu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell>Loading...</TableCell>
                    </TableRow>
                  </TableBody>
                )}

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
      </div>
    );
  }
}

const mapStateToProps = ({ table }) => {
  // console.log(table, "stateSeearch");
  if (table.tableData) {
    return {
      searchValue: table.searchValue,
      tableData: table.tableData.sort((a, b) => (a.amount < b.amount ? -1 : 1))
    };
  } else
    return {
      searchValue: table.searchValue,
      tableData: false
    };
};

export default connect(mapStateToProps, {
  searchTable,
  filterTable,
  fetchTableData
})(DataTable);
