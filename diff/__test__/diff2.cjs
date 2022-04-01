const {diff2} = require('../index.cjs');
const {logJSON} = require('../../json/index.cjs');

const val = diff2(
    {
      name: {
        first: 'thanh',
        last: 'le',
      },
      roles: ['normal', [1, 2], 'aaaaa'],
      age: Math.floor(Math.random()),
      date: new Date(),
      address: 'Vietnam',
    },
    {
      name: {
        full: 'le van thanh',
        first: 'thanh', last: 'le',
      },
      roles: [{firebase: 'admin'}],
      age: Math.random(),
      date: new Date().valueOf(),
    },
    // ['roles'],
    // true,
);

logJSON(val);
