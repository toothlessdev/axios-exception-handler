import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import peerDepsExternalPlugin from "rollup-plugin-peer-deps-external";

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/cjs/index.js",
                format: "cjs",
            },
            {
                file: "dist/esm/index.js",
                format: "esm",
            },
        ],
        plugins: [
            nodeResolve(),
            commonjs(),
            json(), // json 플러그인 추가
            typescript({
                tsconfig: "tsconfig.json",
            }),
            peerDepsExternalPlugin(),
        ],
    },
    {
        input: "dist/esm/index.d.ts",
        output: {
            file: "dist/index.d.ts",
            format: "esm",
        },
        plugins: [dts()],
    },
];
