import {V0alpha2Api } from '@ory/kratos-client';

const init = async(kratos: V0alpha2Api, setLogoutToken) => {
    kratos
        .createSelfServiceLogoutFlowUrlForBrowsers(undefined, {credentials: 'include', withCredentials: true})
        .then(({ data }) => {
            const lo = new URL(String(data.logout_url))
            setLogoutToken(String(lo.searchParams.get('token')))
        })
        .catch((err) => {
            switch (err.response?.status) {
                case 401:
                    return
            }
            return Promise.reject(err)
        })
}

const submit = async(kratos: V0alpha2Api, logoutToken) => {
    if (logoutToken) {
        kratos.submitSelfServiceLogoutFlow(logoutToken)
        .then(() => {
            window.location.href = process.env.REACT_APP_URL + "/login"
            return;
        })
        .catch((err) => {
            switch (err.response?.status) {
                case 401:
                    // Token related error
                    return
            }
            throw err
        })
    }
}

export default {
    init,
    submit
};