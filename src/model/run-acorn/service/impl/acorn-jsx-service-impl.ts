import * as acorn from "acorn";
import  jsx from "acorn-jsx";
import { Call, Module, Result } from "../../entity/result.js";
import { acorn_service } from "../acorn-service.js";
import fs from "fs";
import * as walk from "acorn-walk";
// const { extend } = require('acorn-jsx-walk')

// extend(walk.base)


export const acorn_jsx: acorn_service = {
    run: (path: string) => {


        // 解析代码并获取AST
        
        const ast = acorn.Parser.extend(jsx({allowNamespacedObjects: true,allowNamespaces: false})).parse(fs.readFileSync(path, 'utf8'), {
            ecmaVersion: 'latest',
            sourceType: 'module',
            allowReturnOutsideFunction: true,
            allowSuperOutsideMethod: true,
            allowHashBang: true,
            locations: true
        });
        // 遍历AST并查找方法调用点
        const calls: Call[] = [];
        const modules: Module[] = [];

        walk.simple(ast, {
            CallExpression: (node: any) => {

                if (node.type === 'CallExpression' &&
                    node.callee.type === 'Identifier' &&
                    node.callee.name === 'require') {
                    // console.log(JSON.stringify(node));
                    const moduleName = node.arguments[0].value;
                    modules.push(new Module(moduleName, node.loc.start.line, node.loc.start.column));
                } else {
                    // console.log(JSON.stringify(node));
                    const functionName = node.callee.name || node.callee.property.name

                    // const args = node.arguments.map((arg: { value: any; }) => typeof arg.value).filter((type: any) => !!type) as string[];

                    // 判断方法调用是否属于第三方包
                    let packageName;
                    if (node.callee.type === 'MemberExpression' && node.callee.object.name !== 'console') {
                        packageName = node.callee.object.name;
                    }

                    calls.push(new Call(packageName, functionName, node.loc.start.line, node.loc.start.column));
                }
            },

            ImportDeclaration(node: any) {
                // console.log(JSON.stringify(node));
                modules.push(new Module(node.source.value, node.loc.start.line, node.loc.start.column));
            },
        });

        const result = new Result(calls, modules);
        console.log('result:', result);
        return new Result(calls, modules);
    }
}