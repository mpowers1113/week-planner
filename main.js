/* global data */
/* exported data */
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
    description: $description.value
  };
  data[$day.value].push(userSubmission);
  var entryValues = renderEntry(userSubmission);
  $tbody.appendChild(entryValues);
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
  $tdDescription.textContent = entries.description;
  $tr.appendChild($tdDescription);
  return $tr;
}
