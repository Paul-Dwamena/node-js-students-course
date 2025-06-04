const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err,data)=>{
    if(err) throw err;
    console.log(data);
})


fs.writeFile('file.txt', 'I am writing to you', (err) => {
    if(err) throw err;
    console.log("File written successfully");
})