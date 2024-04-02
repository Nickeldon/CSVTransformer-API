var fs = require('fs'); 
const csv = require('csv-parser');

function Transformer(PATH, targets, init, final){
var finalData = [];
var initData=[];
try {
    fs.createReadStream(path)
    .pipe(csv({delimiter: ':'}))
    .on('data', function(csvrow) {
        initData.push(csvrow);        
    })
    .on('end',() => {
      initData.forEach(function(row){
        //console.log(row);
        if(targets !== 'ALL'){
        targets.forEach(function(target){
          if(row[target]){
            row[target] = row[target].replace(init, final);
          }
        })}
        else{
            row.forEach(function(cell){
                cell = cell.replace(init, final);
            })
        }
        finalData.push(row);
      });
      try {
      fs.writeFileSync(PATH, JSON.stringify(finalData, null, 2));
      } catch (e) {
        console.log('something went wrong')
        console.log(e)
      }
    });
} catch (e) {
    console.log('something went wrong')
    console.log(e)
}
}

// Example
Transformer('./Data/secondsample.csv', ['resp.rt', 'form.rt'] /*REPLACE ARRAY WITH 'ALL' TO TARGET EVERY VALUES*/, '.' /*TARGETTED ELEMENT*/, ',' /*ELEMENT TO REPLACE WITH*/)