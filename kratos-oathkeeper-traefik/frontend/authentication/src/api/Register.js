import {V0alpha2Api } from '@ory/kratos-client';

const init = async(kratos: V0alpha2Api, setFlowId, setCsrfToken) => {
    kratos
        .initializeSelfServiceRegistrationFlowForBrowsers()
            .then(({data})=> {
                setFlowId(data.id)
                setCsrfToken(data.ui.nodes[0].attributes.value)
            })
            .catch((err) => {
                switch (err.response?.status) {
                    case 400:
                        window.location.href = process.env.REACT_APP_URL + "/profile"
                        return    
                }
                throw err
            })
}

const get = async(kratos: V0alpha2Api, flowId, csrfToken, setCsrfToken) => {
    if (flowId) {
        kratos
            .getSelfServiceRegistrationFlow(flowId, csrfToken, {withCredentials: true, credentials: 'include'})
                .then(({data})=> {
                    setCsrfToken(data.ui.nodes[0].attributes.value)
                })
                .catch((err) => {
                    switch (err.response?.status) {
                        case 410:
                        case 403:
                            window.location.href = process.env.REACT_APP_URL + "/login"
                            return;
                        case 400:
                            window.location.href = process.env.REACT_APP_URL + "/profile"
                            return
                    }
                    throw err
                })
    }

}

const submit = async(kratos: V0alpha2Api, flowId, setErrorMessage, firstName, lastName, csrfToken, password, email) => {
    kratos
        .submitSelfServiceRegistrationFlow(flowId, {
            "csrf_token": csrfToken,
            "method": "password",
            "password": password || "",
            "traits": {
                "email": email || "",
                "name": {
                    "first": firstName || "",
                    "last": lastName || ""
                }
            }
        }, {withCredentials: true, credentials: 'include'})
        .then(({data}) => {
            window.location.href = process.env.REACT_APP_URL + "/login";
        })
        .catch((err) => {
            switch (err.response?.status) {
                case 400:
                    if (firstName.length <= 0) {
                        setErrorMessage("First name can't be empty.")
                    } else if (lastName.length <= 0) {
                        setErrorMessage("Last name can't be empty.")
                    } else if (err.response?.data.error) {
                        setErrorMessage(err.response?.data.error.reason)
                        // return process.env.REACT_APP_URL + "/login";
                    } else if (err.response?.data.ui.nodes[1].messages.length !== 0) {
                        setErrorMessage(err.response?.data.ui.nodes[1].messages[0].text)
                    } else if (err.response?.data.ui.nodes[2].messages.length !== 0) {
                        setErrorMessage(err.response?.data.ui.nodes[2].messages[0].text)
                    } else {
                        setErrorMessage(err.response?.data.ui.nodes[2].messages[0].text)
                    }
                    setTimeout(() => setErrorMessage(undefined), 3000)
                    return
                case 403:
                    window.location.href = process.env.REACT_APP_URL + "/login"
                    return
            }
            throw err
        })
}

export default {
    init,
    get,
    submit
};