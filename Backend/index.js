const express = require('express');
const cors = require('cors')
const app = express();
const Excel = require('exceljs');

app.use(cors());

const jobs = {};

const getRandomId = () => Math.random().toString(36).substr(2, 5);

const iterateAsync = (executor, finializer, iterations, step = 1000) => {
    if (iterations <= 0) {
        finializer();
        return;
    }

    const cycles = iterations <= step ? iterations : step;

    for (let i = 0; i < cycles; i += 1) {
        executor();
    }

    setTimeout(() => iterateAsync(executor, finializer, iterations - step, step));
};

const addSheet = async (workbook, numberOfRows, sheetName) => {
    return new Promise(resolve => {
        const sheet = workbook.addWorksheet(sheetName);
        sheet.columns = [
            { key: 'id', header: 'ID' },
            { key: 'name', header: 'Name' },
            { key: 'name1', header: 'Name1' },
            { key: 'name2', header: 'Name2' },
            { key: 'name3', header: 'Name3' },
            { key: 'name4', header: 'Name4' },
            { key: 'name5', header: 'Name5' },
            { key: 'name6', header: 'Name6' },
            { key: 'name7', header: 'Name7' },
            { key: 'name8', header: 'Name8' },
            { key: 'name9', header: 'Name9' },
            { key: 'name10', header: 'Name10' },
            { key: 'name11', header: 'Name11' }
        ];

        iterateAsync(
            () => sheet
                .addRow({
                    id: 'id',
                    name: `Ayman`,
                    name1: `Ayman`,
                    name2: `Ayman`,
                    name3: `Ayman`,
                    name4: `Ayman`,
                    name5: `Ayman`,
                    name6: `Ayman`,
                    name7: `Ayman`,
                    name8: `Ayman`,
                    name9: `Ayman`,
                    name10: `Ayman`,
                    name11: `Ayman`,
                })
                .commit(),
            () => { sheet.commit(); resolve(); },
            numberOfRows
        );
    });
};

const createWorkbook = async () => {
    const workbook = new Excel.stream.xlsx.WorkbookWriter({});

    await Promise.all([
        addSheet(workbook, 2000, 'Sheet 1'),
        addSheet(workbook, 100, 'Sheet 2')
    ]);

    await workbook.commit();
    return workbook;
}

app.get('/api/excel', async (req, res) => {
    const jobId = getRandomId();

    jobs[jobId] = {
        id: jobId,
        status: 'pending'
    };

    res.json({ job: jobId });

    const workbook = await createWorkbook();

    jobs[jobId] = {
        ...jobs[jobId],
        status: 'success',
        data: workbook.stream.read()
    };
});

app.get('/api/excel/status/:jobId', (req, res) =>
    res.json({ status: jobs[req.params.jobId].status })
);

app.get('/api/excel/output/:jobId', (req, res) => {
    const { data } = jobs[req.params.jobId];
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=file.xlsx`);
    res.setHeader('Content-Length', data.length);
    res.send(data);
    delete jobs[req.params.jobId];
});

app.get('/health', (_, res) => res.sendStatus(200));

app.listen(8080);