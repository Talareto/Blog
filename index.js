import express from "express";
const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


let posts = [];


app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("index.ejs", { posts });
});


app.post("/submit", (req, res) => {
    const { title, content } = req.body;
    posts.push({
        title: title,
        content: content
    });
    res.redirect("/");
});
//editing blog
app.post("/edit", (req, res) => {
  const index = req.body.index; 
  const { title, content } = req.body; 

  if (index >= 0 && index < posts.length) {
      posts[index] = { title, content }; // Zaktualizuj post
  }

  res.redirect("/"); 
});
// Deleting a post
app.post("/delete/:index", (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
