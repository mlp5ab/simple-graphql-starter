import * as accountModel from '../user/account.model';

export const ormInit = () => {
    const models = [
        accountModel.options
    ];

    return Promise.all(
        models.map(model => model.sync())
    );
};

export default ormInit;
