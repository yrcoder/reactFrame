import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import process from 'process';
import pkg from '../package.json';

const releaseType = process.env.RELEASE;
let outputPath = `${__dirname}/../${pkg.name}-${pkg.version}.zip`;

let output = fs.createWriteStream(outputPath);
let archive = archiver('zip');

let startTime = new Date().getTime();
console.log('正在打包部署包...');

output.on('close', function() {
    let endTime = new Date().getTime();
    let elaspedTime = (endTime - startTime) / 1000;
    let filesize = (archive.pointer() / 1000 / 1000).toFixed(2); //MB
    console.log(`打包部署包完成，包大小为：${filesize}MB，耗时：${elaspedTime}s`);
});

archive.on('error', function(err) {
    throw err;
});

archive.on('entry', function(entry) {
    if (!entry.name.match(/^node_modules/g) && entry.type === 'file') {
        console.log(`添加文件：${entry.name}`);
    }
});

let timestamp = new Date();

archive.pipe(output);

archive.directory('build', '.', { date: timestamp });

archive.finalize();
