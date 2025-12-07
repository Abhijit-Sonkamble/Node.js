const http = require('http')
const fs = require('fs')

const server = http.createServer((request,response)=>{

   const url = req.url;

    if (url === "/favicon.ico") {
        return;
    }

    let fileName = "";

    switch (request.url) {

        case "/":
            fileName="home.html";
            break;

        case "/about":
            fileName="about.html";
            break;

        case "/contact":
            fileName="contact.html";
            break;

        case "/product":
            fileName="product.html";
            break;
    
       default:
            fileName = "404.html";
    }

    //For Read the file

    fs.readFile(fileName,(err,result)=>{
        response.end(result);
    })
    
});

//server code
server.listen(8000, ()=>console.log("Server Started......"));
