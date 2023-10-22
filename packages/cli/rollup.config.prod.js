import configs from './rollup.config.default.js'
import replace from '@rollup/plugin-replace';

export default configs.map(config => {
    config.plugins.push(replace({
        values: {
            'process.env.NPA_ENV': JSON.stringify('production')
        }
    }))
    return config
})
