import { V0alpha2Api } from '@ory/kratos-client';

const whoami = async(kratos: V0alpha2Api, setFirstName, setLastName, setIsVerified, setEmail) => {
    kratos
        .toSession()
        .then(({data})=>{
            setFirstName(data.identity.traits.name.first);
            setLastName(data.identity.traits.name.last);
            setIsVerified(data.identity.verifiable_addresses[0].verified)
            setEmail(data.identity.traits.email)
            // console.log(data)
        })
        .catch((err) => {
            switch (err.response?.status) {
                // console.log(err)
                case 400:
                    window.location.href = process.env.REACT_APP_URL + "/profile"
                    return;
                case 401:
                    window.location.href = process.env.REACT_APP_URL + "/login"
                    return;
            }
            throw err
        })
}

export default {
    whoami
};