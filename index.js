const fs = require('fs');
const { Parser } = require("htmlparser2");
const render = require('dom-serializer').default;
const { DomHandler } = require("domhandler"); 
const cheerio = require('cheerio');


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
     return key;
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


        let pos = fullUrl.lastIndexOf('/');
        if ( pos === (fullUrl.length -1) ) {         
           pos = fullUrl.lastIndexOf('/', pos -1);
        }
        let prefix = fullUrl.substring(fullUrl.indexOf(':')+3,pos );

        let bookMarkText = [$(b).text()];

        let bookMarkSpecArrFrmMap = myMap.get(prefix);
        
        let bookMarkSpec = new BookmarkSpec(bookMarkText, fullUrl, addDate, lastModified, icon);
        if(!bookMarkSpecArrFrmMap) {
           bookMarkSpecArrFrmMap = [bookMarkSpec];
           myMap.set(prefix,bookMarkSpecArrFrmMap);
           bookMarkPrefixCount++;
          
        } else {
            //console.log(" Before "+bookMarkSpecArrFrmMap +"= " +myMap.get(prefix));
            bookMarkSpecArrFrmMap.push(bookMarkSpec);
            //console.log(" After "+bookMarkSpecArrFrmMap +"= " +myMap.get(prefix));
        }

         count++;
     }
    console.log (" bookamrk folder count "+bookMarkPrefixCount);
    
    console.log(" bookamrk count ", count);
    for (let [key, value] of myMap) {
        //console.log(" key "+key);
        for ( a of value) {
           //console.log( "json ", JSON.stringify(a));
           
           const { bookMarkName, fullUrl, addDate, lastModified, icon } = a;
           //console.log( " assign ", bookMarkName, fullUrl, addDate, lastModified, icon);
           
        }
        //console.log("_____________");
    }
let headSection = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="1632265777" LAST_MODIFIED="1692715889" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks Bar</H3>
    <DL><p>
`;
    let NAME = "";
    let lastEndTag =`    </DL><p>`;
    let startOfBMFldr = `        <DL><p>`;
    let endOfBMFldr   = `        </DL><p>`;
    let bookMarks = headSection;
    for (let [key, value] of myMap) {  
        newKey = getUpdatedKey(key);
        NAME = newKey;
        let topLevelFolderTemplate = `        <DT><H3 ADD_DATE="1687803074" LAST_MODIFIED="1695673212">${NAME}</H3>`;
        
        bookMarks += topLevelFolderTemplate;
        bookMarks += '\n';
        bookMarks += startOfBMFldr;
        bookMarks += '\n';

        for ( bookmarkSpec of value) {
            //console.log(" why ", JSON.stringify(bookmarkSpec));
            const { bookMarkName, fullUrl, addDate, lastModified, icon } = bookmarkSpec;
            let oneBookMark = `            <DT><A HREF="${fullUrl}" ADD_DATE="${addDate}" ICON="${icon}">${bookMarkName}</A>`;
            bookMarks += oneBookMark;
            bookMarks += '\n';
        }
        bookMarks += endOfBMFldr;
        bookMarks += '\n';
        //console.log(topLevelFolderTemplate);
          //NAME += i;
    }
    bookMarks += lastEndTag;
    console.log(bookMarks);
    
});
