const fs = require('fs');
const { Parser } = require("htmlparser2");
//const render = require('dom-serializer').default;
const { DomHandler } = require("domhandler"); 
const cheerio = require('cheerio');
const {HEAD_SECTION,LAST_END_TAG,START_OF_BMFLDR,END_OF_BMFLDR, EOL, SINGLE_ITEM_FLDR} = require('./constants');

class BookmarkSpec {
    constructor(bookMarkName, fullUrl, addDate, lastModified, icon) {
       this.bookMarkName = bookMarkName;
       this.fullUrl = fullUrl;
       this.addDate = addDate;
       this.lastModified = lastModified;
       this.icon = icon;
    }
}

function getUpdatedKey(key) {
    const tempArr = key.split('.');
    let a = tempArr[0] +' '+ tempArr[1];
    if(!tempArr[1]) { 
        return key;
    } 
    return a;
}

if (!process.argv[2]){
    console.log(" no file name given ");
     process.exit(1);
}

if (!fs.existsSync(process.argv[2])){
    console.log(" file does not exist");
    process.exit(1);
}

let myMap = new Map();
let bookMarkPrefixCount = 0;
fs.readFile(process.argv[2], 'utf8', (err, inputData) => {
    if (err) throw err;
    const fileStr = inputData.toString();
    const $ = cheerio.load(fileStr);
    const $a = $('A');
    let count = 0;
    for (b of $a){
        let fullUrl = b.attribs.href;
        let addDate = b.attribs.add_date;
        let lastModified = b.attribs.last_modified;
        let icon = b.attribs.icon;

        let urlPrefixArr = fullUrl.split('/');
        //let urlPrefix 
        //let secondPos = fullUrl.indexOf('/',pos+1);
        // if ( pos === (fullUrl.length -1) ) {       
        //      pos = fullUrl.lastIndexOf('/', pos -1);
        // }
        //let urlPrefix = fullUrl.substring(pos,secondPos );

        let urlPrefix = urlPrefixArr[2];
        if(!urlPrefix && urlPrefixArr[3]){
            urlPrefix = urlPrefixArr[3];
        }

        let bookMarkText = [$(b).text()];

        let bookMarkSpecArrFrmMap = myMap.get(urlPrefix);
        
        let bookMarkSpec = new BookmarkSpec(bookMarkText, fullUrl, addDate, lastModified, icon);
        if(!bookMarkSpecArrFrmMap) {
           bookMarkSpecArrFrmMap = [bookMarkSpec];
           myMap.set(urlPrefix,bookMarkSpecArrFrmMap);
           bookMarkPrefixCount++;
          
        } else {
            bookMarkSpecArrFrmMap.push(bookMarkSpec);
        }
         count++;
     }
    //console.log(" bookamrk folder count "+bookMarkPrefixCount);
    //console.log(" bookamrk count ", count);
    
    //combine the single folder items into one
    let newMap = new Map();
    const newKey = SINGLE_ITEM_FLDR;
    for (let [key, value] of myMap) {
        if (value.length == 1) {          
           let valueInMap = newMap.get(SINGLE_ITEM_FLDR); 
           if(!valueInMap){
              valueInMap = [];

           }
           valueInMap.push(value[0]);
           
           newMap.set(newKey, valueInMap);
           
        } else {
            newMap.set(key,value);
        }

    }
    let NAME = "";
    let bookMarks = HEAD_SECTION;
    let updatedKey = "";
    const sortedMap = new Map([...newMap].sort(function(a, b) {
        if ( a > b) {
            return 1
        } else if ( a < b) {
                return -1
        }
        return 0;
    }));
    for (let [key, value] of sortedMap) {  
        updatedKey = getUpdatedKey(key);
        updatedKey = key;
        NAME = updatedKey;
        let topLevelFolderTemplate = `        <DT><H3 ADD_DATE="1687803074" LAST_MODIFIED="1695673212">${NAME}</H3>`;
        
        bookMarks += topLevelFolderTemplate;
        bookMarks += EOL;
        bookMarks += START_OF_BMFLDR;
        bookMarks += EOL;
        const sortedValue = value.sort(function(a, b) {
            if ( a.bookMarkName > b.bookMarkName) {
                return 1
            } else if ( a.bookMarkName < b.bookMarkName) {
                    return -1
            }
            return 0;
        });

        for ( bookmarkSpec of sortedValue) {            
            const { bookMarkName, fullUrl, addDate, lastModified, icon } = bookmarkSpec;
            let oneBookMark = `            <DT><A HREF="${fullUrl}" ADD_DATE="${addDate}" ICON="${icon}">${bookMarkName}</A>`;
            bookMarks += oneBookMark;
            bookMarks += EOL;
        }
        bookMarks += END_OF_BMFLDR;
        bookMarks += EOL;   
    }
    bookMarks += LAST_END_TAG;
    bookMarks += EOL; 
    
    console.log(bookMarks);
    console.log(" bookamrk folder count "+bookMarkPrefixCount);
    console.log(" bookamrk count ", count);
    console.log (" new bookamrk folder count "+ newMap.size);
    console.log (" sinlge folder "+ newMap.get(SINGLE_ITEM_FLDR).length);
});
