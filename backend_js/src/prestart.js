let fs = require('fs')

fs.readFile('./src//app.js', 'utf8', (err,data) =>{
  if (err) {
    return console.log(err);
  }

  let result = data.replace('const pg = require(\'./pg_knex\')' , "const pg = require(\'./pg_knex_deploy\')");

  fs.writeFile('./src/app.js', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});