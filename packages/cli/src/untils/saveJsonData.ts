import fs from "fs";
import {JsonData} from "npa-core";

function saveJsonData(pth: string, data: JsonData) {
    fs.writeFileSync(pth, JSON.stringify(data, null, 2));
}

export {saveJsonData}
