
var data = {
  sunday: [],
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  entryId: 0
};

var previousEntryJSON = localStorage.getItem('form');
if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', updateStorage);

function updateStorage(event) {
  $tbody.innerHTML = '';
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('form', entriesJSON);
}

var $tbody = document.querySelector('tbody');
var $addEntry = document.querySelector('.add-entry');
var $overlay = document.querySelector('.overlay');
var $submitButton = document.querySelector('.submit-button');
var $form = document.querySelector('form');
var $day = document.querySelector('.day');
var $time = document.querySelector('.time');
var $description = document.querySelector('.description');

function submitDataHandler(event) {
  event.preventDefault();
  var userSubmission = {
    time: $time.value,
    description: $description.value,
    id: data.entryId
  };
  data.entryId++;

  data[$day.value].push(userSubmission);
  var entryValues = renderEntry(userSubmission);
  $tbody.appendChild(entryValues);
  $form.reset();
}
$form.addEventListener('submit', submitDataHandler);
$submitButton.addEventListener('click', showModal);
$addEntry.addEventListener('click', showModal);

function showModal(event) {
  $overlay.classList.toggle('hidden');

}

function renderEntry(entries) {

  var $tr = document.createElement('tr');
  var $tdTime = document.createElement('td');

  $tdTime.textContent = entries.time;
  $tr.appendChild($tdTime);
  var $tdDescription = document.createElement('td');
  $tdDescription.setAttribute('id', entries.id);

  $tdDescription.textContent = entries.description;
  $tr.appendChild($tdDescription);

  var $deleteButton = document.createElement('button');
  $deleteButton.setAttribute('class', 'delete-button');
  $deleteButton.textContent = 'Delete';
  $tdDescription.appendChild($deleteButton);
  return $tr;
}

var $monday = document.querySelector('.monday');
var $tuesday = document.querySelector('.tuesday');
var $wednesday = document.querySelector('.wednesday');
var $thursday = document.querySelector('.thursday');
var $friday = document.querySelector('.friday');
var $saturday = document.querySelector('.saturday');
var $sunday = document.querySelector('.sunday');

$monday.addEventListener('click', renderDay);
$tuesday.addEventListener('click', renderDay);
$wednesday.addEventListener('click', renderDay);
$thursday.addEventListener('click', renderDay);
$friday.addEventListener('click', renderDay);
$saturday.addEventListener('click', renderDay);
$sunday.addEventListener('click', renderDay);
var $scheduledDays = document.querySelector('.scheduled-events-for');

function renderDay(event) {
  $tbody.innerHTML = '';
  var dataDay = event.target.getAttribute('data-day');
  targetDay = dataDay;
  if (data[dataDay] === []) {
    return;
  }
  $scheduledDays.textContent = dataDay.toUpperCase();
  for (var i = 0; i < data[dataDay].length; i++) {
    var eachEntry = data[dataDay][i];
    $tbody.appendChild(renderEntry(eachEntry));
  }

}

var $deleteOverlay = document.querySelector('.delete-overlay');
var $table = document.querySelector('table');
$table.addEventListener('click', deleteModal);
var targetId;
var targetTr;
function deleteModal(event) {
  if (event.target.matches('.delete-button')) {
    var target = event.target.closest('td');
    targetTr = target.closest('tr');
    $deleteOverlay.classList.remove('hidden');
  }
  targetId = target.getAttribute('id');

}

var $yesButton = document.querySelector('.yes');
$yesButton.addEventListener('click', deleteEntry);
var $noButton = document.querySelector('.no');
$noButton.addEventListener('click', deleteEntry);

var targetDay;

function deleteEntry(event) {
  if (event.target.matches('.no')) {
    $deleteOverlay.classList.add('hidden');

  }
  if (event.target.matches('.yes')) {
    for (var i = 0; i < data[targetDay].length; i++) {
      if (data[targetDay][i].id === Number(targetId)) {
        data[targetDay].splice(i, 1);
        targetTr.remove();
        $deleteOverlay.classList.add('hidden');
      }
    }
  }
}
