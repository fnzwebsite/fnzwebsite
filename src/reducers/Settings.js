import {
    DARK_THEME,
    DRAWER_TYPE,
    FIXED_DRAWER,
    SWITCH_LANGUAGE,
    THEME_COLOR,
    TOGGLE_COLLAPSED_NAV,
    WINDOW_WIDTH,
    COLLAPSED_DRAWER
} from 'constants/ActionTypes';


const initialSettings = {
    navCollapsed: true,
    drawerType: COLLAPSED_DRAWER,
    darkTheme: false,
    width: $(window).width(),
    locale: {
        languageId: 'english',
        locale: 'en',
        name: 'English',
        icon: 'us',
    },
};

const settings = (state = initialSettings, action) => {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return {
                ...state,
                navCollapsed: false
            };
        case TOGGLE_COLLAPSED_NAV:
            return {
                ...state,
                navCollapsed: action.isNavCollapsed
            };
        case DRAWER_TYPE:
            return {
                ...state,
                drawerType: action.drawerType
            };
        case WINDOW_WIDTH:
            return {
                ...state,
                width: action.width
            };

        case DARK_THEME:
            return {
                ...state,
                darkTheme: !state.darkTheme
            };
        case SWITCH_LANGUAGE:
            return {
                ...state,
                locale: action.payload
            };
        default:
            return state;
    }
};

export default settings;
