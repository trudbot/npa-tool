import configs from './rollup.config.default.js'
import replace from '@rollup/plugin-replace';

export default configs.map(config => {
    config.external = ['chalk', 'figlet', 'npa-core', 'express', 'open', 'express', 'commander', 'glob', 'hirestime', 'portfinder'];
    config.plugins.push(replace({
        values: {
            'process.env.NPA_ENV': JSON.stringify('development')
        },
        preventAssignment: true
    }))
    return config
})
