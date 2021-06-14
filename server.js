const http = require("http");
const createHandler = require("git-webhook-handler");
const { spawn } = require("child_process");
const handler = createHandler({
  path: "/webhook",
  secret: "mqAlfPEWNlspflcmei15xiqwc98fxnWRG",
});

function run_cmd(cmd, args, callback) {
  const child = spawn(cmd, args);
  let resp = "";
  child.stdout.on("data", function(buffer) {
    resp += buffer.toString();
  });
  child.stdout.on("end", function() {
    callback(resp);
  });
}

http
  .createServer((req, res) => {
    handler(req, res, function(err) {
      res.statusCode = 404;
      res.end("no such location");
    });
  })
  .listen(7777);

handler.on("error", function(err) {
  console.error("Error:", err.message);
});

handler.on("push", function(event) {
  console.log(
    "Received a push event for %s to %s",
    event.payload.repository.name,
    event.payload.ref
  );

  if (
    event.payload.repository.name === "docker-ci" &&
    event.payload.ref === "refs/heads/main"
  ) {
    run_cmd("sh", ["./deploy.sh"], function(text) {
      console.log(text);
    });
  }
});
