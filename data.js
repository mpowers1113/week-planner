/* exported data */
var data = {
  sunday: [],
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: []
};

var previousEntryJSON = localStorage.getItem('orm');
if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', updateStorage);

function updateStorage(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('form', entriesJSON);
}
