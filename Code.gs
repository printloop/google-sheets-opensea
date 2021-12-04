const OPENSEA_API_URL = "https://api.opensea.io/api/v1";
const SHEET_NAME = "Floors";
function onOpen() {
    var spreadsheet = SpreadsheetApp.getActive();
    var menuItems = [
      {name: 'Check floors', functionName: 'updateAllFloors'},
    ];
    spreadsheet.addMenu('Tracking', menuItems);  
}
function getSheet(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME);
}
function updateAllFloors() {
  const floors = getFloors(getProjects());
  writeFloors(floors);
}

function getFloors(projects){
  const collections = getCollections(projects);
  return collections.map(lookupFloor);
}
function lookupFloor(collection){
  return collection.collection?.stats.floor_price || '';
}

function writeFloors(floors) {
   const sheet = getSheet()
   const col = sheet.getLastColumn();
   const today = new Date();
   var shift;

  shift = shouldAddColumn(today)? 1: 0;
  sheet.getRange(1,col+shift,floors.length+1,1).setValues([[today]].concat(floors.map((f) => [f])));
   if (shift > 0){
      sheet.getRange(1, col, floors.length+1, 1).copyFormatToRange(sheet.getSheetId(), col+shift, col+shift, 1,floors.length+1);
   }

}

function shouldAddColumn(date){
  const sheet = getSheet();
  const col = sheet.getLastColumn();
  if (col == 1) {
     return true;
  }
  const lastDate = sheet.getRange(1, col,1,1).getValues().flat()[0];
  return !sameDay(date, lastDate);
}

function sameDay(first, second) {
  return first.getFullYear() === second.getFullYear() &&
         first.getMonth() === second.getMonth() &&
         first.getDate() === second.getDate();
}
function getCollections(collections){
  const requests = collections.map((c) => ({
    url: OPENSEA_API_URL + '/collection/' + c, 
    muteHttpExceptions: true})
    );
  const response = UrlFetchApp.fetchAll(requests);
  const data = response.map((r) => JSON.parse(r.getContentText()));
  return data;
};

function getProjects() {
  const projects = getSheet().getRange("A2:A").getValues().flat().filter((v) => v != '');
  return projects
}
