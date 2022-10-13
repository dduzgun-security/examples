import { V0alpha2Api } from '@ory/kratos-client';

const init = async(kratos: V0alpha2Api, setFlowId, setCsrfToken) => {
    kratos
        .initializeSelfServiceLoginFlowForBrowsers(true)
        .then(({ data }) => {
            setFlowId(data.id)
            setCsrfToken(data.ui.nodes[0].attributes.value)
        })
        .catch((err) => {
            switch (err.response?.status) {
                case 400:
                    window.location.href = process.env.REACT_APP_URL + "/profile"
                    return;
            }
            throw err
        })
}

const get = async(kratos: V0alpha2Api, flowId, csrfToken, setCsrfToken) => {
    if (flowId) {
        kratos
            .getSelfServiceLoginFlow(flowId, csrfToken, {withCredentials: true})
            .then(({ data }) => {
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
                        return;
                }
                throw err
            })
    }
}

const submit = async(kratos: V0alpha2Api, flowId, setErrorMessage, csrfToken, password, email) => {
    kratos
        .submitSelfServiceLoginFlow(flowId, {
            "csrf_token": csrfToken,
            "method": "password",
            "password": password || "",
            "password_identifier": email || ""
        }, {withCredentials: true})
        .then(()=> {
            window.location.href = process.env.REACT_APP_URL + "/profile"
            return;
        })
        .catch((err) => {
            switch (err.response?.status) {
                case 400:
                    if (err.response?.data.ui.nodes[1].messages.length !== 0) {
                        setErrorMessage(err.response?.data.ui.nodes[1].messages[0].text)
                    } else if (err.response?.data.ui.nodes[2].messages.length !== 0) {
                        setErrorMessage(err.response?.data.ui.nodes[2].messages[0].text)
                    } else {
                        setErrorMessage(err.response?.data.ui.messages[0].text)
                    }
                    setTimeout(() => setErrorMessage(""), 3000)
                case 403:
                    // window.location.href = process.env.REACT_APP_URL + "/login"
                    return;
            }
            throw err
        })
}

export default {
    init,
    get,
    submit
};