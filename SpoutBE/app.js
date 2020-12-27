const express = require("express");
const path = require("path");
const Proxy = require("http-proxy").createProxyServer();
const config = require(path.join(__dirname, "/config/global.json"));
const port = config.Server.settings.port;
const app = express();

const ProxyServer = "http://localhost:" + config.Proxy.settings.port;

/**
 * WebSocket Configuration
 */
const io = require("socket.io")(config.Server.settings.socket, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin,
      "Access-Control-Allow-Credentials": true,
      "Socket Powered By:": "Spout https://github.com/esogelola/spout.git",
    };
    res.writeHead(200, headers);
    res.end();
  },
  path: "/",
  serveClient: true,
  origins: "*:*",
  cookie: true,
  pingInterval: 1000,
  pingTimeout: 1000,
  upgradeTimeout: 1000,
  allowUpgrades: true,
  cookie: "spout",
  cookiePath: "/",
  cookieHttpOnly: true,
});

app.listen(port, () =>
  console.log(
    `\x1b[40m`,
    `\x1b[32m`,
    `
    
                                                                                                       
    :'######::'########:::'#######::'##::::'##:'########:
    '##... ##: ##.... ##:'##.... ##: ##:::: ##:... ##..::
     ##:::..:: ##:::: ##: ##:::: ##: ##:::: ##:::: ##::::
    . ######:: ########:: ##:::: ##: ##:::: ##:::: ##::::
    :..... ##: ##.....::: ##:::: ##: ##:::: ##:::: ##::::
    '##::: ##: ##:::::::: ##:::: ##: ##:::: ##:::: ##::::
    . ######:: ##::::::::. #######::. #######::::: ##::::
    :......:::..::::::::::.......::::.......::::::..:::::
                                      

    [+] Maintance      : https://github.com/esogelola/spout.git
    [+] Server         : http://localhost:${port}
    [+] Socket         : ws://localhost:${config.Server.settings.port}
    [~] Running Server...
`,
    `\x1b[0m`
  )
);
