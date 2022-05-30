import { createStore } from 'redux'

const initialState = {
    yearlySum: null,
    yearlyDetails: [],
    monthlySum: null,
    monthlyDetails: [],
    userToken: null,
    userName: '',
    userId: null
}

const getToken = () => {
    let userInfoParse = localStorage.getItem(("userInfo"))
    return JSON.parse(userInfoParse)

}

const tokenAndUserInfo = getToken()
if (tokenAndUserInfo) {

    initialState.userToken = tokenAndUserInfo.accessToken
    initialState.userName = tokenAndUserInfo.user.userName
    initialState.userId = tokenAndUserInfo.user._id

}


//TODO
//  check while in login view, if signed in, go staright to home. routeguard

const spendMeReducer = (state = initialState, action) => {

    switch (action.type) {
        case action.yearlySum:
            return ({ ...state, yearlySum: action.yearlySum })
        case action.yearlyDetials:
            return ({ ...state, yearlyDetails: action.yearlyDetails })
        case action.monthlySum:
            return ({ ...state, monthlySum: action.monthlySum })
        case action.monthlyDetails:
            return ({ ...state, monthlyDetails: action.monthlyDetails })
        case action.userToken:
            return ({ ...state, userToken: action.userToken })
        case action.userName:
            return ({ ...state, userName: action.userName })
        case action.userId:
            return ({ ...state, userId: action.userId })
        default:
            return state;
    }



}



const store = createStore(spendMeReducer)

export default store