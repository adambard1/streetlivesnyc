import {  LOCATION_SELECTED,
         SEARCH_RESULT_SELECTED, WELCOME_CLICKED, LOCATION_DISMISSED } from '../actions/mapActions'

function getInitialWelcomeDialog() {
    if (typeof(Storage) !== "undefined" &&
        sessionStorage.welcomeDialog) {
        return sessionStorage.welcomeDialog === "false" ? false : true;
    } else {
        return true;
    }
}

function isMobile() {
    if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ){
        return true;
      }
     else {
        return false;
      }
}

const initialState = {
    showWelcome: getInitialWelcomeDialog(),
    isMobile: isMobile(),
    detailLocation: null,
    locationData: {} 
}

const map = (state=initialState, action) => {
    switch (action.type) {
        case WELCOME_CLICKED:
            if (typeof(Storage) !== "undefined") {
                sessionStorage.welcomeDialog = false;
            }
            return Object.assign({}, state, { showWelcome: false })
        case LOCATION_SELECTED:
            return Object.assign({}, state, { showLocationDetail: true,
                                              locationData: action.locationData })
        case LOCATION_DISMISSED:
            return Object.assign({}, state, { showLocationDetail: false, locationData: {}})
        case SEARCH_RESULT_SELECTED:
        default:
            return state
    }
}

export default map
