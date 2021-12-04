const USER_INFO = "user_info";

const initialState = {
    userInfo_data: {
        type_user: '',
        username: ''
    }
}

export const setUserInfo = (data) => {
    console.log('setUserInfo', data);
    return {
        type: USER_INFO, 
        data,
    }
}

export const userInfo = (state = initialState, action) => {
    switch(action.type) {
        case USER_INFO:
            return { ...state, userInfo_data: action.data };
        default:
            return state;
    }
};
