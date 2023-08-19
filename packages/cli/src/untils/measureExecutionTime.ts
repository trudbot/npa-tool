import hirestime from 'hirestime'
export function measureExecutionTime(run: ()=>any, callback: (time: number, ret?: any)=>void) {
    const getElapsed  = hirestime();
    const ret = run();
    callback(getElapsed(), ret);
}
