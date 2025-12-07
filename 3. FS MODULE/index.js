const fs = require("fs");

/*---------------Write---------------*/

//Sync
fs.writeFileSync("./doc.txt","Hello World");

//Async yachya mage callback dyayve lagte aani nahi dile tr error yeto
fs.writeFile('./doc.txt', 'Hello Game',(err)=>{
    if(err){
        console.log(err);
    }
});

/*Append Previous file ko bhi rakhna hai and dusra text bhi print karana hai to appendFileSync use hota hai....*/

//Sync
fs.appendFileSync('./doc.txt',"\n Ohayuuuu");

// Async
fs.appendFile('./doc.txt', 'Hello Game',(err)=>{
    if(err){
        console.log(err);
    }
});

/* Read  koi file ko terminal me dekhne ke liye*/

//Sync
const result = fs.readFileSync('./doc.txt',"utf-8");
console.log(result)

// Async
fs.readFile('./doc.txt', 'utf-8',(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Async : ",result)
    }
});

/* Delete karne ke liye unlink */
fs.unlinkSync()//(Path dena rahega)

/*Copy karnya sathi eka file madhun dusri kade */
fs.copyFileSync()//(kis file me se kis file me jana hai uske liye)