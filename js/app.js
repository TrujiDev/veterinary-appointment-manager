const petInput = document.querySelector('#pet');
const ownerInput = document.querySelector('#owner');
const phoneInput = document.querySelector('#phone');
const dateInput = document.querySelector('#date');
const hourInput = document.querySelector('#hour');
const symptomsInput = document.querySelector('#symptoms');
const form = document.querySelector('#new-date');
const containerCitations = document.querySelector('#appointments');

eventListeners();

function eventListeners() {
	petInput.addEventListener('input', dataDate);
	ownerInput.addEventListener('input', dataDate);
	phoneInput.addEventListener('input', dataDate);
	dateInput.addEventListener('input', dataDate);
	hourInput.addEventListener('input', dataDate);
	symptomsInput.addEventListener('input', dataDate);
}

const dateObj = {
	pet: '',
	owner: '',
	phone: '',
	date: '',
	hour: '',
	symptoms: '',
};

function dataDate(event) {
	dateObj[event.target.name] = event.target.value;
}
