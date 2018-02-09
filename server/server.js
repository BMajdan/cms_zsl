/* Import modules */
const app = require('./config/app');
const apiRoutes = require('./config/routes');
const port = 300; // used to create, sign, and verify tokens

require('./config/data_public');
require('./config/data_private');

app.use('/api', apiRoutes);
app.listen(port);
console.log('Server run on: http://localhost:' + port);
