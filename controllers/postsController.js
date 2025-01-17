// # db connection
const connection = require("../db/conn.js");

// # index

function index(req, res) {
  const sql = "SELECT * FROM `posts`";

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "database query failed" });
    }
    res.json(results);
  });
}

// # show
function show(req, res) {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM posts WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to load post" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    let post = results[0];

    const sqlTags = `
    SELECT tags.label 
    FROM tags
    INNER JOIN post_tag
    ON tags.id = tag_id
    WHERE post_tag.post_id = ?;
    `;

    connection.query(sqlTags, [id], (err, resultsTags) => {
      console.log(resultsTags);

      post.tags = resultsTags.map((tag) => tag.label);

      res.json(post);
    });
  });
}

// # store

function store(req, res) {
  // const newId = postsList[postsList.length - 1].id + 1;
  // const { title, description, image, tags } = req.body;
  // // validation
  // if (!title || typeof title !== "string") {
  //   return res
  //     .status(400)
  //     .json({ error: "Title is required and must be a string" });
  // }
  // if (!description || typeof description !== "string") {
  //   return res
  //     .status(400)
  //     .json({ error: "Description is required and must be a string" });
  // }
  // if (!image) {
  //   return res.status(400).json({ error: "Image is required" });
  // }
  // if (!tags?.length) {
  //   return res
  //     .status(400)
  //     .json({ error: "Tags is required and must be an array" });
  // }
  // // new post
  // const newPost = {
  //   id: newId,
  //   title,
  //   description,
  //   image,
  //   tags,
  // };
  // postsList.push(newPost);
  // console.log(newPost);
  // res.json(newPost);
}

// # update

function update(req, res) {
  // const id = parseInt(req.params.id);
  // const postId = postsList.find((post) => post.id === id);
  // const postIndex = postsList.indexOf(postId);
  // const { title, description, image, tags } = req.body;
  // // id error
  // if (!postId) {
  //   return res.status(404).json({ error: "not found" });
  // }
  // // validation
  // if (!title || typeof title !== "string") {
  //   return res
  //     .status(400)
  //     .json({ error: "Title is required and must be a string" });
  // }
  // if (!description || typeof description !== "string") {
  //   return res
  //     .status(400)
  //     .json({ error: "Description is required and must be a string" });
  // }
  // if (!image) {
  //   return res.status(400).json({ error: "Image is required" });
  // }
  // if (!tags?.length) {
  //   return res
  //     .status(400)
  //     .json({ error: "Tags is required and must be an array" });
  // }
  // const updatedPost = {
  //   id,
  //   title,
  //   description,
  //   image,
  //   tags,
  // };
  // postsList.splice(postIndex, 1, updatedPost);
  // res.json(updatedPost);
}

// # modify

function modify(req, res) {
  // const postId = parseInt(req.params.id);
  // res.send(`Modify post ${postId}`);
}

// # destroy

function destroy(req, res) {
  const id = parseInt(req.params.id);

  const sql = "DELETE FROM posts WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (isNaN(id)) {
      const err = new Error("Id not found");
      err.status = 400;
      throw err;
    }

    if (err) {
      console.log(err);
      return res.status(400).json({ error: "Failed to delete post" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.sendStatus(204);
  });
}

module.exports = { index, show, store, update, modify, destroy };
