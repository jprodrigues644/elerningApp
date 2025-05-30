const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/elearning_stats')
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(e => {
        const msg = 'ERROR: Connection to MongoDB not possible';
        console.log('\x1b[41m%s\x1b[37m\x1b[0m', msg);
    });
