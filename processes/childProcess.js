var count = 0;
setInterval( () => {
    count++;
    if(count > 10) {
        console.log(count);
        process.exit();
    }
}, 1000)

var spawn = require('child_process').spawn;
var child = spawn(process.exePath, [__filename, 'child'])
child.stdout.on('data', function(data) {
    console.log('from child' , data.toString);
})
