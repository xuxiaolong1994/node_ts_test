import { Result } from "../entity/result.js";
import fs from 'fs';
import path from 'path';
import { acorn_js } from "./impl/acorn-js-service-impl.js";
import { acorn_jsx } from "./impl/acorn-jsx-service-impl.js";
import { acorn_ts } from "./impl/acorn-ts-service-impl.js";
export interface acorn_service {

    run: (path: string) => Result
}

export function acorn_run(dirPath: string): Result[] {

    const paths = getFilePaths(dirPath);

    return paths.map(filePath => {

        const fileName = path.basename(filePath);
        const extname = fileName.substring(fileName.indexOf(".") + 1)



        console.log("extname", extname)
        let result;
        switch (extname) {
            case 'js':
                result = acorn_js.run(filePath);
                break;
            case 'jsx':
                result = acorn_jsx.run(filePath);
                break;
            case 'ts':
                result = acorn_ts.run(filePath);
                break;
            case 'tsx':
                result = acorn_ts.run(filePath);
                break;
            case 'mjs':
                result = acorn_js.run(filePath);
                break;
            default:
                result = new Result([], []);
        }
        return result;
    });
}



function getFilePaths(dirPath: string): string[] {
    const paths: string[] = [];
    if (!fs.existsSync(dirPath)) {
        return [];
    }
    if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                const subPaths = getFilePaths(filePath);
                paths.push(...subPaths);
            } else if (stats.isFile()) {
                paths.push(path.resolve(filePath));
            }
        });
    } else {
        paths.push(path.resolve(dirPath));
    }
    return paths;
}


