const express = require('express');
const app = express();

const PORT = 8000;
app.set("view engine" , "ejs");
app.use(express.urlencoded());

let alltask =[];

let tasknum = 1;

app.get("/",(request,response)=>{
    response.render("table",{
    task : alltask
});
});

//form to task
app.get("/addtask",(request,response)=>{
    response.render("form");
});

app.post("/addtask", (request, response) => {
    const task = request.body;
    console.log(request.body);
    task.tasknum = tasknum;
    tasknum++;
    alltask.push(task);
    response.redirect("/");
});

app.get("/editPage", (request, response) => {
    console.log(request.query);
const task = alltask.find((task) => task.tasknum == request.query.taskid);

    if (!task) {
        return response.redirect('/notfound');
    }

    return response.render('edit', {
        task
    });
});

app.post("/updatetask", (request, response) => {
    console.log(request.body);

    alltask = alltask.map((task) => {
        if (task.tasknum == request.body.tasknum) {
            return request.body;
        } else {
            return task;
        }
    })

    return response.redirect('/');
});



// For delete
app.get("/deletetask",(request, response)=>{
    console.log(request.query);
    const taskid = request.query.taskid;

    alltask = alltask.filter((task)=>task.tasknum != taskid);
     console.log(alltask);
     response.redirect("/");

});

app.get('/notfound', (request, response) => {
    response.render('notfound');
})

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not Started......",err);
        return;
    }
    console.log("Server is Started.......")
});