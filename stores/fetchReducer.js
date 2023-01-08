export const INITIAL_STATE = {
    pageLoading: true,
    apiLoading: false,
    fetchResponse: {},
    error: false,
    errorMessage: ""
}

export const fetchReducer = (state, action) => {
    switch(action.type){
        case "PAGE_LOAD_DONE":
            return{
                ...state,
                pageLoading: false
            }
        case "API_FETCH_START":
            return{
                ...state,
                apiLoading: true
            }
        case "API_FETCH_SUCCESS":
            return{
                pageLoading: false,
                apiLoading: false,
                errorMessage: "",
                fetchResponse: action.payload
            }
        case "API_FETCH_ERROR":
            return{
                pageLoading: false,
                apiLoading: false,
                error: true,
                errorMessage: action.payload,
                fetchResponse: {}
            }
        case "RESET":
            return{
                pageLoading: false,
                apiLoading: false,
                fetchResponse: {},
                error: false,
                errorMessage: ""
            }
        default:
            return state
    }
}