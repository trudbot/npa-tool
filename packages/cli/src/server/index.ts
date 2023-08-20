import path from "path";
import { exec } from "child_process";
import express from 'express'
import chalk from "chalk";
import figlet from 'figlet'
import {PackageAnalyzer} from "../packageAnalyzer";

export function createMyServer(analyzer: PackageAnalyzer) {
    const app = express();
    const port = 3000;

    // 跨域, 前端开发时调试使用
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Content-Type', 'application/json;charset=utf-8');
        next();
    });

    app.use(express.static(path.join(__dirname, '../../html')));

    app.get('/nodes', (req: express.Request, res: express.Response) => {
        res.json(analyzer.dependencyGraph.exportPackages());
    });

    app.get('/edges', (req: express.Request, res: express.Response) => {
        res.json(analyzer.dependencyGraph.exportEdges());
    });

    app.get('/data', (req, res) => {
        res.json(analyzer.getGraphData());
    })

    app.get('/packageJson', (req, res) => {
        if (req.query.id === undefined) {
            res.status(400).send('Invalid parameters');
        }
        const id: number = parseInt(req.query.id as string);
        try {
            const pth = analyzer.dependencyGraph.packages[id].path;
            const packageJson = analyzer.packages[pth];
            res.json(analyzer.packages[pth]);
        } catch (e) {
            console.log(e);
            res.status(500).send("Error");
        }
    });

    app.get('/dependencies', (req, res) => {
        const packageId = parseInt(req.query.id as string);
        const depth = parseInt(req.query.depth as string);
        if (isNaN(packageId) || isNaN(depth)) {
            res.status(400).send('Invalid parameters');
            return;
        }

        try {
            res.json(analyzer.dependencyGraph.getSpecifiedPackageDependencies(packageId, depth));
        } catch (e) {
            console.log(e)
            res.status(500).send("Error")
        }
    })

    const server = app.listen(port, () => {
        console.log(chalk.cyan(figlet.textSync('NPA-TOOL')));
        console.log(`  ${chalk.green('->')}  ${chalk.gray('Local: ')}   ${chalk.blue.underline(`http://localhost:${port}`)}`);
        console.log(`  ${chalk.red('->')}  press Ctrl+C to terminate the process`);
        exec(`start http://localhost:${port}`);
    });
}
