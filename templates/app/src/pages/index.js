"use strict";
exports.__esModule = true;
var yay_jpg_1 = require("../assets/yay.jpg");
function HomePage() {
    return (<div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yay_jpg_1["default"]} width="388"/>
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>);
}
exports["default"] = HomePage;
