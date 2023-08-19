
import path from "path";
import fs from "fs";

function saveJsonData(pth: string, data: JsonData) {
    fs.writeFileSync(pth, JSON.stringify(data));
}

export {saveJsonData}
