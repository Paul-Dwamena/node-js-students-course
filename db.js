const fs = require("fs/promises")
const path = require('path');

const DB_FILE = path.join(__dirname, "db.json");

//read the database file asynchronously

async function readDb(){
    try {
        const data = await fs.readFile(DB_FILE, 'utf-8');
        if(!data) return [];
        return JSON.parse(data)
    } catch (error) {
        console.log(error)
        if(error.code === "ENOENT") return [];
        throw error;
    }
}


// write to the database asynchronously
async function writeDb(data){
    try {
        await fs.writeFile(DB_FILE, JSON.stringify(data,null,2))
    } catch (error) {
        throw error
    }
}

module.exports = {
    readDb,
    writeDb
}