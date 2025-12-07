const fs = require('fs')

console.log("1"); //1st request

//Syncronous Ek time pr ek hi request handle karta hai
const result = fs.readFileSync('./doc.txt',"utf-8");
console.log(result)

// Asyncronous ek sath sab request ko handle karta hai
fs.readFile('./doc.txt', 'utf-8',(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Async : ",result)
    }
});
console.log("2");