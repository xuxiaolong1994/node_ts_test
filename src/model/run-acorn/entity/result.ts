export class Call {
    packageName: string;
    functionName: string;
    line: number;
    column: number;
    constructor(
        packageName: string,
        functionName: string,
        line: number,
        column: number,) {

        this.packageName = packageName;
        this.functionName = functionName;
        this.column = line;
        this.line = column;
    }
}


export class Module {
    moduleName: string;
    line: number;
    column: number;
    constructor(
        moduleName: string,
        line: number,
        column: number,) {

        this.moduleName = moduleName;
        this.column = line;
        this.line = column;
    }
}

export class Result {
    calls: Call[];
    modules: Module[];
    constructor(
        calls: Call[],
        modules: Module[]) {

        this.calls = calls;
        this.modules = modules;
    }
}