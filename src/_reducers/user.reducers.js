import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialLoginState = user ? { loggedIn: true, user } :
                            {user: {},
                            loggedIn: false,
                            loggingIn: false,
                            loginFailed: false
                            };

const initialRegisterState = {
                                registering: false,
                                registered: false,
                                registerFailed: false
                            };


export function authentication(state = initialLoginState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                loggedIn: false,
                loginFailed: false,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            //console.log(action);
            return {
                loggingIn: false,
                loggedIn: true,
                loginFailed: false,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggingIn: false,
                loggedIn: false,
                loginFailed: true,
                user: {}
            };
        case userConstants.LOGOUT:
            return {
                user: {},
                loggedIn: false,
                loggingIn: false,
                loginFailed: false
            };
        default:
            return state;
    }
}

export function userRegister(state = initialRegisterState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true,
                registered: false,
                registerFailed: false
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                registering: false,
                registered: true,
                registerFailed: false
            };
        case userConstants.REGISTER_FAILURE:
            return {
                registering: false,
                registered: false,
                registerFailed: true
            };
        default:
            return state;
    }
}

export function userAddToFavorite(state = {}, action) {
    switch (action.type) {
        case userConstants.ADD_FAVORITE_REQUEST:
            return {
                adding: true,
            };
        case userConstants.ADD_FAVORITE_SUCCESS:
            return {
                adding: false,
            };
        case userConstants.ADD_FAVORITE_FAILURE:
            return {
                adding: false,
            };
        default:
            return state;
    }
}

const initialLibraryState = {
    querying: false,
    results: [],
    resultsOptions: [],
};


export function userLibrary(state = initialLibraryState, action) {
    switch (action.type) {
        case userConstants.QUERY_LIBRARY_REQUEST:
            return {
                ...state,
                querying: true,
            };

        case userConstants.QUERY_LIBRARY_SUCCESS:
            console.log(action.data);
            return {
                ...state,
                querying: false,
                results: action.data.results.map(a => new Float32Array(a)),
                resultsOptions: action.data.resultsOptions
            };

        case userConstants.QUERY_LIBRARY_FAILURE:
            return {
                ...state,
                querying: false,
            };

        default:
            return state;
    }
}