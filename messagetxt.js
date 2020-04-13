const fs = require("fs");

const form = `<html>
                <head><title>Please enter a name</title></head>
                <body><form action="/message" method="POST"><input type="text"
                name="message"><button type="submit">Send<button></form></body>
                </html>`;

const requesthandler = (req, res) => {

  const url = req.url;

  const method = req.method;
  if(url === "/")  {
    res.write(form);

    return res.end();
    }

  if(url === "/message" && method === "POST"){

    const body = [];

    req.on("data", (chunk) => {
        body.push(chunk);


    })

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      const formattedMessage = message.split("+").join(" ");
      fs.writeFile("message.txt", formattedMessage, (err) => {
        res.writeHead(302, {
          Location: "/",
        });
        return res.end();
      });
    });
  }
};

module.exports = requesthandler;
