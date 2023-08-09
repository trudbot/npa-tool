
function getOriginalObjectOfProxy(data: any) {
    return JSON.parse(JSON.stringify(data));
}
export {getOriginalObjectOfProxy}
