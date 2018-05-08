import {FIXED_DRAWER,MINI_DRAWER,COLLAPSED_DRAWER, SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH} from 'constants/ActionTypes';

const initialSettings = {
    navCollapsed: false,
    drawerType:COLLAPSED_DRAWER,
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
        case WINDOW_WIDTH:
            return {
                ...state,
                width: action.width
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
