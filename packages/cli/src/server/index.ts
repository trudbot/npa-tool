import path from "path";
import { exec } from "child_process";
import express from 'express'
import chalk from "chalk";
import figlet from 'figlet'

export function createMyServer(data: object) {
    const app = express();
    const port = 3000;

    app.get('/', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname, "../../html/index.html"));
    });

    app.get('/data', (req: express.Request, res: express.Response) => {
        res.json(data);
    });

    const server = app.listen(port, () => {
        console.log(chalk.cyan(figlet.textSync('NPA-TOOL')));
        console.log(`  ${chalk.green('->')}  ${chalk.gray('Local: ')}   ${chalk.blue.underline(`http://localhost:${port}`)}`);
        console.log(`  ${chalk.red('->')}  press Ctrl+C to terminate the process`);
        exec(`start http://localhost:${port}`);
    });
}
