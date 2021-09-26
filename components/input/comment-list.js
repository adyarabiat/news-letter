import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import classes from "./comment-list.module.css";

function CommentList({ eventId }) {
   const [comment, setComment] = useState([]);

   useEffect(() => {
      fetch(`/api/comments/${eventId}`)
         .then((response) => response.json())
         .then((data) => setComment(data.comment));
   }, []);

   return (
      <ul className={classes.comments}>
         {comment.map((el) => (
            <li key={uuidv4()}>
               <p>{el.text}</p>
               <div>
                  By <address>{el.name}</address>
               </div>
            </li>
         ))}
      </ul>
   );
}

export default CommentList;
