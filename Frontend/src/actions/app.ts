import actionCreatorFactory from 'typescript-fsa';

import { appApi } from '../api/app';
import { async } from '../helpers';
import actionIds from './action-ids';

const actionCreator = actionCreatorFactory();

const downloadExcel = actionCreator.async<undefined, void, any>(actionIds.APP_DOWNLOAD_EXCEL);

const downloadExcelAsync = async(
    downloadExcel,
    appApi.downloadExcel
);

export {
    downloadExcelAsync,
    downloadExcel
};