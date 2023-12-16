import express from 'express'
import chalk from "chalk";
import figlet from 'figlet'
import {PackageAnalyzer} from '../packageAnalyzer/analyzer';
import portfinder from "portfinder"
import * as process from "process";
import open from 'open';

enum NPA_ENV {
    Production = 'production',
    Development = 'development'
}

process.env.NPA_ENV = NPA_ENV.Development

export function createDataServer(analyzer: PackageAnalyzer, ui: string) {
    const app = express();
    const port = 3000;

    // 跨域, 前端开发时调试使用

    if (process.env.NPA_ENV === NPA_ENV.Development) {
        app.all('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Content-Type', 'application/json;charset=utf-8');
            next();
        });
    } else {
        app.use(express.static(ui));
    }

    app.get('/api/nodes', (req: express.Request, res: express.Response) => {
        res.json(analyzer.dependencyGraph.exportPackages());
    });

    app.get('/api/edges', (req: express.Request, res: express.Response) => {
        res.json(analyzer.dependencyGraph.exportEdges());
    });

    app.get('/api/data', (req, res) => {
        res.json(analyzer.getGraphData());
    });

    app.get('/api/packageData', (req, res) => {
        if (req.query.id === undefined) {
            res.status(400).send('Invalid parameters');
        }
        const id: number = parseInt(req.query.id as string);
        try {
            const pth = analyzer.dependencyGraph.packages[id].path;
            const packageJson = analyzer.packages[pth];
            const packageData = {
                path: pth,
                packageJson: packageJson
            }
            res.json(packageData);
        } catch (e) {
            console.log(e);
            res.status(500).send("Error");
        }
    });

    app.get('/api/dependencies', (req, res) => {
        const packageId = parseInt(req.query.id as string);
        const depth = parseInt(req.query.depth as string);
        if (isNaN(packageId) || isNaN(depth)) {
            res.status(400).send('Invalid parameters');
            return;
        }

        try {
            res.json(analyzer.getPackageDependencies(packageId, depth));
        } catch (e) {
            console.log(e)
            res.status(500).send("Error")
        }
    })

    app.get('/api/directDependencyList', (req, res) => {
        const packageId = parseInt(req.query.id as string);
        if (isNaN(packageId)) {
            res.status(400).send('Invalid parameters');
            return;
        }
        try {
            res.json(analyzer.dependencyGraph.getDirectDependency(packageId));
        } catch (e) {
            console.log(e)
            res.status(500).send("Error")
        }
    });

    app.get('/api/whyInstalled', (req, res) => {
        const packageId = parseInt(req.query.id as string);
        if (isNaN(packageId)) {
            res.status(400).send('Invalid parameters');
            return;
        }
        try {
            res.json(analyzer.whyInstalledIt(packageId));
        } catch (e) {
            console.log(e)
            res.status(500).send("Error")
        }
    })

    app.get('/api/searchPackage', (req, res) => {
        const str = req.query.pattern;
        if (typeof str !== "string") {
            res.status(400).send('Invalid parameters');
            return;
        }
        try {
            res.json(analyzer.dependencyGraph.queryPackage(str));
        } catch (e) {
            console.log(e)
            res.status(500).send("Error")
        }
    });

    // 端口被占用时， 递增寻找可用端口
    portfinder.setBasePort(port);
    portfinder.getPortPromise()
        .then(port => {
            app.listen(port, () => {
                console.log(chalk.cyan(figlet.textSync('NPA-TOOL')));
                console.log(`  ${chalk.green('->')}  ${chalk.gray('Local: ')}   ${chalk.blue.underline(`http://localhost:${port}`)}`);
                console.log(`  ${chalk.red('->')}  press Ctrl+C to terminate the process`);
                if (process.env.NPA_ENV === NPA_ENV.Production) {
                    open(`http://localhost:${port}`)
                }
            });
        }).catch(err => {
            console.log(err);
        })
}
