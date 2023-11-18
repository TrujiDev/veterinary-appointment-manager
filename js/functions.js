import Appointments from './classes/Appointments.js';
import UI from './classes/UI.js';
import {
	form,
	petInput,
	ownerInput,
	phoneInput,
	dateInput,
	hourInput,
	symptomsInput,
} from './selectors.js';

const ui = new UI();
const manageAppointments = new Appointments();

let edit;

const dateObj = {
	pet: '',
	owner: '',
	phone: '',
	date: '',
	hour: '',
	symptoms: '',
};

export function dataDate(event) {
	dateObj[event.target.name] = event.target.value;
}

export function newDate(event) {
	event.preventDefault();

	if (Object.values(dateObj).includes('')) {
		ui.showAlert('All fields are required', 'error');
		return;
	}

	if (edit) {
		manageAppointments.editAppointment({ ...dateObj });

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

export function resetObj() {
	dateObj.pet = '';
	dateObj.owner = '';
	dateObj.phone = '';
	dateObj.date = '';
	dateObj.hour = '';
	dateObj.symptoms = '';
}

export function deleteAppointment(id) {
	manageAppointments.deleteAppointment(id);

	ui.showAlert('The appointment was successfully deleted');

	ui.showAppointments(manageAppointments);
}

export function loadAppointment(appointment) {
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
