import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Drawer from "material-ui/Drawer";
import SidenavContent from "./SidenavContent";
import { COLLAPSED_DRAWER, FIXED_DRAWER } from "constants/ActionTypes";
import { updateWindowWidth } from "actions/Setting";


const drawerWidth = 240;
const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: '100%',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        padding: 24,
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});


class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.props.updateWindowWidth($(window).width());
    });
  }

  render() {
    
    const { navCollapsed, drawerType, width } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-xl-flex"
      : drawerType.includes(COLLAPSED_DRAWER) ? "" : "d-flex";
    let type = "permanent";
    if (
      drawerType.includes(COLLAPSED_DRAWER) ||
      (drawerType.includes(FIXED_DRAWER) && width < 1200)
    ) {
      type = "temporary";
    }

    return (
      <div>
        <div className={`app-sidebar d-none ${drawerStyle}`}>
          <Drawer
            className="app-sidebar-content"
            variant={type}
            open={type.includes("temporary") ? navCollapsed : true}
            onClose={this.props.onToggleCollapsedNav}
            classes={{
              paper: "side-nav"
            }}
          >
            {/* <UserInfoButton /> */}
            <SidenavContent />
          </Drawer>
        </div>
    
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { navCollapsed, drawerType, width } = settings;
  return { navCollapsed, drawerType, width };
};

export default withRouter(
  connect(mapStateToProps, { updateWindowWidth })(SideNav)
);

