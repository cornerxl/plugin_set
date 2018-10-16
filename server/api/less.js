const fs = require('fs');
const less = require('less');
const path = require('path');

function compileLess(srcPath, distPath) {
    fs.readFile(srcPath, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        less.render(data, (err, css) => {
            if (err) {
                throw err
            }
            fs.writeFile(distPath, css.css, (err) => {
                if (err) {
                    throw err
                }
                console.log('success')
            })
        })
    });
}
module.exports = compileLess;