import fs from "fs";
import path from "path";

const CommentPath = () => {
   return path.join(process.cwd(), "data", "comment-data.json");
};
const extractComment = (filePath) => {
   // first we read the data from the file
   const fileData = fs.readFileSync(filePath);

   // then we parse the json to be js object
   const commentData = JSON.parse(fileData);

   return commentData;
};

function eventHandler(req, res) {
   // this is how we get the id from the query
   const eventId = req.query.eventId;

   if (req.method === "POST") {
      const { email, name, text } = req.body;

      // check the validation
      if (!email.includes("@") || !name || name.trim() == "" || !text || text.trim() === "") {
         // return bad input
         res.status(422).json({ message: "Invalid input." });
         return;
      }

      const newComment = {
         id: eventId,
         email,
         name,
         text,
      };

      // ! Store that in a datebase or in a file
      // we get the file path
      const filePath = CommentPath();
      const commentData = extractComment(filePath);

      // then we push to that js object the new object that we recived
      commentData.push(newComment);

      // then we send the data (in JSon type) again after updating it
      fs.writeFileSync(filePath, JSON.stringify(commentData));

      // then we send response
      // 201 it means created and successfully
      res.status(201).json({ message: "This works", newComment });
   }

   if (req.method === "GET") {
      const filePath = CommentPath();
      const commentData = extractComment(filePath);

      const selectedComment = commentData.filter((el) => {
         return el.id === eventId;
      });

      res.status(200).json({ comment: selectedComment });
   }
}

export default eventHandler;
