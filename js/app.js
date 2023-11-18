const petInput = document.querySelector('#pet');
const ownerInput = document.querySelector('#owner');
const phoneInput = document.querySelector('#phone');
const dateInput = document.querySelector('#date');
const hourInput = document.querySelector('#hour');
const symptomsInput = document.querySelector('#symptoms');
const form = document.querySelector('#new-date');
const containerCitations = document.querySelector('#appointments');

class appointments {
	constructor() {
		this.appointments = [];
	}

	addAppointment(appointment) {
		this.appointments = [...this.appointments, appointment];
	}
}

class UI {
	showAlert(message, type) {
		const divMessage = document.createElement('DIV');
		divMessage.classList.add('text-center', 'alert', 'd-block', 'col-12');

		if (type === 'error') {
			divMessage.classList.add('alert-danger');
		} else {
			divMessage.classList.add('alert-success');
		}

		divMessage.textContent = message;

		document
			.querySelector('#content')
			.insertBefore(divMessage, document.querySelector('.add-date'));

		setTimeout(() => {
			divMessage.remove();
		}, 4000);
	}
}

const ui = new UI();
const manageAppointments = new appointments();

eventListeners();

function eventListeners() {
	petInput.addEventListener('input', dataDate);
	ownerInput.addEventListener('input', dataDate);
	phoneInput.addEventListener('input', dataDate);
	dateInput.addEventListener('input', dataDate);
	hourInput.addEventListener('input', dataDate);
	symptomsInput.addEventListener('input', dataDate);

	form.addEventListener('submit', newDate);
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

function newDate(event) {
    event.preventDefault();

	if (Object.values(dateObj).includes('')) {
		ui.showAlert('All fields are required', 'error');
		return;
    }
    
	dateObj.id = Date.now();
	
	manageAppointments.addAppointment({ ...dateObj });

	resetObj();

	form.reset();
}

function resetObj() {
	dateObj.pet = '';
	dateObj.owner = '';
	dateObj.phone = '';
	dateObj.date = '';
	dateObj.hour = '';
	dateObj.symptoms = '';
}