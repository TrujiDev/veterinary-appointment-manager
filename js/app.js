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

	showAppointments({ appointments }) {
		this.clearHTML();

		appointments.forEach(appointment => {
			const { pet, owner, phone, date, hour, symptoms, id } = appointment;

			const divAppointment = document.createElement('DIV');
			divAppointment.classList.add('date', 'p-3');
			divAppointment.dataset.id = id;

			const petParagraph = document.createElement('H2');
			petParagraph.classList.add('card-title', 'font-weight-bolder');
			petParagraph.textContent = pet;

			const ownerParagraph = document.createElement('P');
			ownerParagraph.innerHTML = `
				<span class="font-weight-bolder">Owner: </span> ${owner}
			`;

			const phoneParagraph = document.createElement('P');
			phoneParagraph.innerHTML = `
				<span class="font-weight-bolder">Phone: </span> ${phone}
			`;

			const dateParagraph = document.createElement('P');
			dateParagraph.innerHTML = `
				<span class="font-weight-bolder">Date: </span> ${date}
			`;

			const hourParagraph = document.createElement('P');
			hourParagraph.innerHTML = `
				<span class="font-weight-bolder">Hour: </span> ${hour}
			`;

			const symptomsParagraph = document.createElement('P');
			symptomsParagraph.innerHTML = `
				<span class="font-weight-bolder">Symptoms: </span> ${symptoms}
			`;

			divAppointment.appendChild(petParagraph);
			divAppointment.appendChild(ownerParagraph);
			divAppointment.appendChild(phoneParagraph);
			divAppointment.appendChild(dateParagraph);
			divAppointment.appendChild(hourParagraph);
			divAppointment.appendChild(symptomsParagraph);

			containerCitations.appendChild(divAppointment);
		});
	}

	clearHTML() {
		while (containerCitations.firstChild) {
			containerCitations.removeChild(containerCitations.firstChild);
		}
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

	ui.showAppointments(manageAppointments);
}

function resetObj() {
	dateObj.pet = '';
	dateObj.owner = '';
	dateObj.phone = '';
	dateObj.date = '';
	dateObj.hour = '';
	dateObj.symptoms = '';
}
