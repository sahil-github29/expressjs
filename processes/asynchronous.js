function async(data, cb) {
    var err = (data.indexOf("Mango") > -1) ? 'Mango found' : null

    setTimeout(function() {
        cb(err, data)
    } , 1000)
}
var fruits = ['Mango', 'banana' , 'apple']
async(fruits, function(err, data) {
    if (err === null) {
        console.log(data);
    } else {
        console.log(err);    
    }
})
