import { sqlConnection, ormInit } from './index';


const connect = () =>
    sqlConnection
        .authenticate()
        .then(err => (err ?
            Promise.reject(new Error('Could not connect to orm')) :
            console.log('Successful authentication')
        ))
        .then(() => ormInit())
        .then(() => {
            console.log('Configured orm');
            return true;
        });

export default connect;
