import hirestime from 'hirestime'
export function measureExecutionTime<T>(run: () => T, callback: (time: number, ret?: T)=>void) {
    const getElapsed  = hirestime();
    const ret = run();
    callback(getElapsed(), ret);
}
