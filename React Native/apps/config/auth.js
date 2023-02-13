import ApiManager from './ApiManager';

export const authLogin = async data => {
    try {
        const result = await ApiManager('/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: data,
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};


export const authRegister = async data => {
    try {
        const result = await ApiManager('/auth/regist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: data,
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};

export const authForgotPassword = async data => {
    try {
        const result = await ApiManager('/auth/forgot-password', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: data,
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};