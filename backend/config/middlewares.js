const bodyParser = require( 'body-parser');
const cors = require( "cors");


module.exports = app => {
     console.log("middlewares working")
     app.use(bodyParser.json());
     app.use(cors());
};
 