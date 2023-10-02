const headSection = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
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

const lastEndTag =`    </DL><p>`;
const startOfBMFldr = `        <DL><p>`;
const endOfBMFldr   = `        </DL><p>`;
const eol = '\n';
const singleItemFldr = "Single Item Folder";

exports.HEAD_SECTION = headSection;
exports.LAST_END_TAG = lastEndTag;
exports.START_OF_BMFLDR = startOfBMFldr;
exports.END_OF_BMFLDR = endOfBMFldr;
exports.EOL = eol;
exports.SINGLE_ITEM_FLDR = singleItemFldr;
//export {headSection, lastEndTag, startOfBMFldr, endOfBMFldr};