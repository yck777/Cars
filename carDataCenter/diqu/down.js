const fs = require('fs')
const xlsx = require('node-xlsx');      
const request =require('request'); 
const https = require('https');  
const readline = require('readline');

const baseUrl = 'https://geo.datav.aliyun.com/areas_v3/bound/';

let dataLength = 0;
let curr = 0;
const codes = new Set();

const err404_Array = [];

start();

function nextReadText(){
	curr++;
	process.stdout.write(
		process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
	);
	readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0,0);
    process.stdout.write(`[ ${Math.floor(curr/5)} / ${dataLength} ]`);	
    if(curr >= dataLength - 1){
    	process.stdout.write(`${dataLength}个文件已下载完成]`);	
    	if(err404_Array.length){
    		err404_Array.forEach(item=>{
    			process.stdout.write(`[${item}]下载失败]`);	
    		})
    		
    	}
    }
}


function start(){
	
	try{
		const xlsxList = xlsx.parse("./zhejiang.xlsx");	
		const data = xlsxList[0].data;
		data.splice(0,1)
		dataLength = data.length;
		
		asyncForEach(xlsxList[0].data, async (array,index)=>{
			let code = array[1];
			if(!codes.has(code)){
				await downloadFileAsync(`${baseUrl}${code}.json`,`./json/${code}.json`);
				await downloadFileAsync(`${baseUrl}${code}_full.json`,`./full_json/${code}.json`);
				codes.add(code);
			}
			code = array[3]
			if(!codes.has(code)){
				await downloadFileAsync(`${baseUrl}${code}.json`,`./json/${code}.json`);
				await downloadFileAsync(`${baseUrl}${code}_full.json`,`./full_json/${code}.json`);
				codes.add(code);
			}
			code = array[5]
			if(!codes.has(code)){
				await downloadFileAsync(`${baseUrl}${code}.json`,`./json/${code}.json`);
				codes.add(code);
			}
				
		 	nextReadText();	
		})

	}catch(err){
		console.warn(err)
	}
}


function downloadFileAsync(url, path){
  return new Promise((resolve, reject)=>{
    const file = fs.createWriteStream(path);

    https.get(url, (res)=>{
      if(res.statusCode !== 200 && res.statusCode !== 404){
        reject(res.statusCode);
        return;
      }
      if(res.statusCode === 404){
      	err404_Array.push(url)
      	resolve()
      }

      res.on('end', ()=>{});

      file.on('finish', ()=>{
        file.close(resolve);
      }).on('error', (err)=>{
        fs.unlink(path);
        reject(err.message);
		
      })

      res.pipe(file);
	 		

    });
  });
}
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

