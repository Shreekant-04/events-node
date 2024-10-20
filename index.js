const http = require("http");
const event = require("events");
const fs = require("fs");
const { URL } = require("url");
const path = require("path");

const myEvent = new event();

function makePath(filename) {
  const pathname = path.join(__dirname, filename);
  console.log(pathname);
  return pathname;
}

//homepage and not-found page
myEvent.on("load", (res, filename) => {
  fs.readFile(filename, "utf-8", (err, data) => {
    if (err) {
      console.log(`Error: ${err}`);
      res.writeHead(500, { "content-type": "text/html" });
      return res.end("<h1>Server Error</h1>");
    }
    res.writeHead(200, { "content-type": "text/html" });
    res.end(data);
  });
});

//explore Page
const createData = (element) => {
  const data = fs.readFileSync(makePath("exploreItem.txt"), "utf-8");
  let finalData = data
    .replace("{%title%}", element.title)
    .replace("{%description%}", element.description)
    .replace("{%link_href%}", element.link_href)
    .replace("{%link_text%}", element.link_text);
  return finalData;
};
myEvent.on("explore", (res, name) => {
  fs.readFile(makePath("explore.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(`Error: ${err}`);
      res.writeHead(500, { "content-type": "text/html" });
      return res.end("<h1>Server Error</h1>");
    }
    const items = JSON.parse(
      fs.readFileSync(makePath("exploreData.json"), "utf-8")
    );
    const output = items.map((el) => createData(el)).join("");
    let finalOutput = data
      .replace("{%data%}", output)
      .replace("{%name%}", name);
    res.writeHead(200, { "content-type": "text/html" });
    res.end(finalOutput);
  });
});

//items page
function makeItem(el) {
  const data = fs.readFileSync(makePath("items.html"), "utf-8");
  let finalOutput = data
    .replace("{%title%}", el.title)
    .replace("{%description%}", el.description);
  return finalOutput;
}
myEvent.on("item", (res, id) => {
  const item = JSON.parse(fs.readFileSync(makePath("items.json"), "utf-8"));
  const page = item.filter((el) => el.id == id);
  if (!page.length) return myEvent.emit("load", res, makePath("notfound.html"));
  const output = page.map((el) => makeItem(el)).join("");
  res.end(output);
});

const server = http.createServer((req, res) => {
  const myUrl = new URL(req.url, `http://${req.headers.host}`);

  if (myUrl.pathname === "/") {
    return myEvent.emit("load", res, makePath("index.html"));
  }

  if (myUrl.pathname === "/explore") {
    const name = myUrl.searchParams.get("name") || "guest";
    return myEvent.emit("explore", res, name);
  }
  if (myUrl.pathname === "/explore/item") {
    const id = myUrl.searchParams.get("id");
    return myEvent.emit("item", res, id);
  }

  return myEvent.emit("load", res, makePath("notfound.html"));
});

const port = 5000;
server.listen(port, () => {
  console.log("Listening on port", port);
});
