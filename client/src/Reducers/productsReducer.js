export const initState = {
    products: [],
    error: '',
    loading: false
}

export const productReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_PRODUCTS':
            return {
                loading: false,
                error: '',
                products: action.payload
            }
        case 'SET_ERROR':
            return {
                loading: false,
                products: [],
                error: 'ERROR FETECHING PRODUCTS'
            }
        case 'SET_LOADING':
            return {...state, loading: action.payload}
        default:
            return state
    }
}