import { saveAs } from 'file-saver';

const wait = async (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const getJobResult = async (jobId: string, waitingInterval: number = 0): Promise<any> => {
    await wait(waitingInterval);

    const status = await getJobStatus(jobId);

    if (status !== 'success') {
        return getJobResult(jobId, waitingInterval >= 10 ? waitingInterval : ++waitingInterval);
    }

    return fetch(`http://localhost:8080/api/excel/output/${jobId}`);
};

const getJobStatus = (id: string) => fetch(`http://localhost:8080/api/excel/status/${id}`)
    .then(response => response.json())
    .then(({ status }) => status);

const appApi = {
    downloadExcel: () => fetch(`http://localhost:8080/api/excel`)
        .then(response => response.json())
        .then(({ job }) => getJobResult(job))
        .then(response => response.blob())
        .then(response => saveAs(response, 'file.xlsx'))
};

export {
    appApi
};