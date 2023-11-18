const petInput = document.querySelector('#pet');
const ownerInput = document.querySelector('#owner');
const phoneInput = document.querySelector('#phone');
const dateInput = document.querySelector('#date');
const hourInput = document.querySelector('#hour');
const symptomsInput = document.querySelector('#symptoms');
const form = document.querySelector('#new-date');
const containerCitations = document.querySelector('#appointments');

let edit;

class appointments {
	constructor() {
		this.appointments = [];
	}

	addAppointment(appointment) {
		this.appointments = [...this.appointments, appointment];
	}

	deleteAppointment(id) {
		this.appointments = this.appointments.filter(
			appointment => appointment.id !== id
		);
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

			const btnDelete = document.createElement('BUTTON');
			btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
			btnDelete.innerHTML =
				'Delete <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';
			btnDelete.onclick = () => deleteAppointment(id);

			const btnEdit = document.createElement('BUTTON');
			btnEdit.classList.add('btn', 'btn-info');
			btnEdit.innerHTML = `Edit <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
				</svg>`;
			btnEdit.onclick = () => editAppointment(appointment);

			divAppointment.appendChild(petParagraph);
			divAppointment.appendChild(ownerParagraph);
			divAppointment.appendChild(phoneParagraph);
			divAppointment.appendChild(dateParagraph);
			divAppointment.appendChild(hourParagraph);
			divAppointment.appendChild(symptomsParagraph);
			divAppointment.appendChild(btnDelete);
			divAppointment.appendChild(btnEdit);

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

	if (edit) {
		form.querySelector('button[type="submit"]').textContent = 'Save changes';

		edit = false;

		ui.showAlert('The appointment was successfully edited');
	} else {
		dateObj.id = Date.now();

		manageAppointments.addAppointment({ ...dateObj });

		ui.showAlert('The appointment was successfully added');
	}

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

function deleteAppointment(id) {
	manageAppointments.deleteAppointment(id);

	ui.showAlert('The appointment was successfully deleted');

	ui.showAppointments(manageAppointments);
}

function editAppointment(appointment) {
	const { pet, owner, phone, date, hour, symptoms, id } = appointment;

	petInput.value = pet;
	ownerInput.value = owner;
	phoneInput.value = phone;
	dateInput.value = date;
	hourInput.value = hour;
	symptomsInput.value = symptoms;

	dateObj.pet = pet;
	dateObj.owner = owner;
	dateObj.phone = phone;
	dateObj.date = date;
	dateObj.hour = hour;
	dateObj.symptoms = symptoms;
	dateObj.id = id;

	form.querySelector('button[type="submit"]').textContent = 'Save changes';

	edit = true;
}
