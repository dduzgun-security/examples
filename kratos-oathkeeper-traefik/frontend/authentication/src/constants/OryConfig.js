import { Configuration, V0alpha2Api } from '@ory/kratos-client';

const kratos = new V0alpha2Api(new Configuration({
    basePath: process.env.REACT_APP_KRATOS_PUBLIC_URL,
    // baseOptions: {
    //   withCredentials: false,
    //   credentials: 'include'
    // }
}))

export default {
    kratos
}