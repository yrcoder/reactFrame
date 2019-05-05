import co from 'co';
import path from 'path';
import request from 'superagent';
import ProgressBar from 'progress';
import fs from 'fs';
import pkg from '../package.json';

const releaseType = process.env.RELEASE;
let fileName = `${pkg.name}-${pkg.version}.zip`;

let file = path.join(process.cwd(), fileName);

co(function*() {
    let fileSize = fs.statSync(file).size;
    let fileStream = fs.createReadStream(file);
    let bar = new ProgressBar('上传部署包: :bar :percent :elapseds', {
        total: fileSize,
        width: 50,
        complete: '█',
        incomplete: '░'
    });

    fileStream.on('data', function(chunk) {
        bar.tick(chunk.length);
    });

    request
        .post('http://192.168.5.110:8080')
        .attach('stream', fileStream)
        .end(function(err, res) {
            if (!err && res.ok) {
                console.log(`部署包上传OSS完成: http://deploy.91gfb.com/${fileName}`);
                process.exit(0);
            } else if (err) {
                console.log('error: %s', err);
            } else {
                console.log('error: %s', res.text);
            }
            process.exit(1);
        });
}).catch(function(err) {
    console.log(err, '部署包上传OSS失败，请重试！');
});
