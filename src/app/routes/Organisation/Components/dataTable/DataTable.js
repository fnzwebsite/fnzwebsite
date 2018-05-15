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
import FilterListIcon from "material-ui-icons/FilterList";
import { Add, ModeEdit, Delete } from "material-ui-icons";
import HorizontalLabelPositionBelowStepper from "../linear/HorizontalLabelPositionBelowStepper";
import CardBox from "components/CardBox";
import CloseIcon from "material-ui-icons/Close";
import AppBar from "material-ui/AppBar";
import { List } from "material-ui-icons";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import organisationActions from 'actions/admin/organisationActions';

let counter = 0;

function createData(
  name,
  organisationType,
  city,
  country,
  postCode,
  email,
  telephone,
  fax,
  action
) {
  counter += 1;
  return {
    id: counter,
    name,
    organisationType,
    city,
    country,
    postCode,
    email,
    telephone,
    fax,
    action
  };
}

const columnData = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    className: "tran t-center",
    label: "Name"
  },
  {
    id: "organisationType",
    numeric: false,
    disablePadding: false,
    className: "tran t-center",
    label: "Organisation Type"
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    className: "tran t-center",
    label: "City"
  },
  {
    id: "country",
    numeric: false,
    disablePadding: false,
    className: "tran t-center",
    label: "Country"
  },
  {
    id: "postCode",
    numeric: false,
    disablePadding: false,
    className: "tran t-right",
    label: "Post Code"
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    className: "tran t-center",
    label: "Email"
  },
  {
    id: "telephone",
    numeric: true,
    disablePadding: false,
    className: " stat tran t-right",
    label: "Telephone"
  },
  {
    id: "fax",
    numeric: true,
    disablePadding: false,
    className: " stat tran t-center",
    label: "Fax"
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    className: " stat tran t-center",
    label: "Action"
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

class EnhancedTableToolbar extends React.Component {
  state = {
    open: false
  };
  handleRequestClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        <Dialog
          className="cus-dialog tran-tab"
          open={this.state.open}
          onClose={this.handleRequestClose}
        >

          <div className="position-relative stepperHeader">
            <Toolbar>
              <Typography
                type="title"

                className="stepperTitle"
                style={{
                  flex: 1
                }}

              ><i className="zmdi zmdi-file-plus zmdi-hc-fw mr-2" />
                Create Organisation
              </Typography>

              <IconButton onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </div>


          <CardBox
            styleName="col-lg-12 stepperBody"
            childrenStyle="d-flex justify-content-center"

            headerOutside
          >
            <HorizontalLabelPositionBelowStepper />
          </CardBox>

        </Dialog>

        <Toolbar className={classNames("table-header")}>
          <div className="title">
            <Typography type="title" > <List className="orglist_icon"/>Organisation List</Typography>
          </div>
          <div className="spacer" />
          <div className="actions">
            <Button
              variant="raised"
              className="jr-btn bg-primary text-white mr-2"
              size="small"
              onClick={() => this.setState({ open: true })}
            >
              <i className="zmdi zmdi-plus zmdi-hc-fw" />
              <span>Organisation</span>
            </Button>
          </div>
        </Toolbar>
      </div>
    );
  }
}

EnhancedTableToolbar.propTypes = {
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
      orderBy: "name",
      selected: [],
      data: [].sort((a, b) => (a.name < b.name ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      open: false
    };
  }

  // componentDidMount(){
  //   this.props.organisationActions.getOrganisationData();
  //   console.log(JSON.stringify(this.props.organisationData));
  //   alert(JSON.stringify(this.props.organisationData));
  // }

  componentWillMount() {
    this.props.organisationActions.getOrganisationData();
      var self=this;
    var companyData = [];
    if(self.props.organisationData)
    {
      Object.keys(self.props.organisationData).forEach((itm, i) => {
        var companyDataObj= createData(self.props.organisationData[itm].name
                        ,self.props.organisationData[itm].companyType
                        ,self.props.organisationData[itm].registeredAddress.city
                        ,self.props.organisationData[itm].registeredAddress.country
                        ,self.props.organisationData[itm].registeredAddress.postcode
                      ,self.props.organisationData[itm].email
                    ,self.props.organisationData[itm].telephone
                  ,self.props.organisationData[itm].fax);
                   // console.log(dealDataObj);
                  companyData.push(companyDataObj);
      });
    }
    self.setState({data: companyData });
  }

  componentWillReceiveProps(nextProps)
  {
    var self=this;
    const {organisationData}=nextProps;
  var companyData = [];
  if(organisationData)
  {
    Object.keys(organisationData).forEach((itm, i) => {
      var companyDataObj= createData(organisationData[itm].name
                      ,organisationData[itm].companyType
                      ,organisationData[itm].registeredAddress.city
                      ,organisationData[itm].registeredAddress.country
                      ,organisationData[itm].registeredAddress.postcode
                    ,organisationData[itm].email
                  ,organisationData[itm].telephone
                ,organisationData[itm].fax);
                 // console.log(dealDataObj);
                companyData.push(companyDataObj);
    });
  }
  self.setState({data: companyData });
  }
   //
  render() {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

    return (
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div>
          <Dialog
            className="cus-dialog tran-tab"
            open={this.state.open}
            onClose={this.handleRequestClose}
          >
            {/* <DialogTitle>{"Create Investor"}</DialogTitle>

          <DialogActions>
            <IconButton onClick={this.handleRequestClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </DialogActions> */}
            <div className="position-relative stepperHeader">
              <Toolbar>
                <Typography
                  type="title"
                  // color="text"
                  className="stepperTitle"
                  style={{
                    flex: 1
                  }}
                  // variant="display1"
                ><i className="zmdi zmdi-file-plus zmdi-hc-fw mr-2" />
                  Create Organisation
                </Typography>

                <IconButton
                  onClick={this.handleRequestClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </div>

            {/* <DialogContent> */}
            <CardBox
              styleName="col-lg-12 stepperBody"
              childrenStyle="d-flex justify-content-center"
              // heading={"Create Company"}
              headerOutside
            >
              <HorizontalLabelPositionBelowStepper />
            </CardBox>
            {/* </DialogContent> */}
          </Dialog>
        </div>

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
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
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
                        <TableCell padding="none" className="tran t-center">
                          {n.name}
                        </TableCell>
                        <TableCell className="tran t-center">
                          {n.organisationType}
                        </TableCell>
                        <TableCell className="tran t-center">
                          {n.city}
                        </TableCell>
                        <TableCell className="tran t-center">
                          {n.country}
                        </TableCell>
                        <TableCell className="tran t-center">
                          {n.postCode}
                        </TableCell>
                        <TableCell className="tran t-center">
                          {n.email}
                        </TableCell>
                        <TableCell numeric>{n.telephone}</TableCell>
                        <TableCell numeric>{n.fax}</TableCell>

                        <TableCell className="tran t-center">
                          <IconButton
                            aria-label="edit"
                            onClick={() => this.setState({ open: true })}
                          >
                            <ModeEdit />
                          </IconButton>
                          <IconButton aria-label="delete"  className="delete_icon">
                            <Delete />

                          </IconButton>
                        </TableCell>
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
            organisationData: state.organisationData
        }
    };


DataTable.propTypes = {
    organisationActions: PropTypes.object,
    organisationData: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        organisationActions: bindActionCreators(organisationActions, dispatch)
    });

export default connect(mapStateToProps,
    mapDispatchToProps)(DataTable);

//export default DataTable;
