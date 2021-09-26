import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { eventsPath, extractEvent } from "../../helpers/api-util";

function EmailHandler(req, res) {
   if (req.method === "POST") {
      const emailText = req.body.email;

      if (!emailText || !emailText.includes("@")) {
         res.status(422).json({ message: "Invalid email address" });
         return;
      }

      const newEmail = {
         id: uuidv4(),
         email: emailText,
      };

      // ! Store that in a datebase or in a file
      // we get the file path
      const filePath = eventsPath();
      const data = extractEvent(filePath);

      // then we push to that js object the new object that we recived
      data.push(newEmail);

      // then we send the data (in JSon type) again after updating it
      fs.writeFileSync(filePath, JSON.stringify(data));

      // then we send response
      // 201 it means created and successfully
      res.status(201).json({ message: "This works", newEmail });
   } else {
      const filePath = eventsPath();
      const data = extractEvent(filePath);
      res.status(200).json({ emails: data });
   }
}

export default EmailHandler;
