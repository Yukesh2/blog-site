const express = require("express");
const app = express();
//for displaying the titles 
let titles = [];
//displaying the full content
let main = [];

//for using middleware to handle the data that is getting from the client
const bodyparser = require("body-parser");
//using the middleware
app.use(express.urlencoded({extended:true}));
//for the css 
app.use(express.static("public"));

//importing ejs to use it 
app.set('view engine', 'ejs');
//home route for customziing 
app.get('/',function(req,res){
    res.render('home')
})
//rendering a site at default port from view ejs 
app.get('/main' , function(req,res){
    res.render('main',{
        title:titles,
        blog:main
    });
})
//routing for each blog post to different site 
app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    if (postId < titles.length) {
        res.render('post', {
            title: titles[postId],
            blog: main[postId]
        });
    } else {
        res.status(404).send('Post not found');
    }
});





//creating a new route 
app.get('/post',function(req,res){
   res.render('blog');
})

//getting the data from the clients 
app.post('/post',function(req,res){
    let heading = req.body.title;
    let blog = req.body.newitem;
    titles.push(heading);
    main.push(blog);
    console.log(heading);
    console.log(titles);

    res.redirect('/main');//after entering the title redirect it to main page
})

//routing for the post site 






 

//running to the port 
app.listen(3000,function(req,res){
    console.log("the server started in port 3000");
})