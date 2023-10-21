import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function getDirname(importMetaUrl: string): string {
    const __filename = fileURLToPath(importMetaUrl);
    return dirname(__filename);
}
