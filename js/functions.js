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
let DB;

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

		const transaction = DB.transaction(['VAM'], 'readwrite');
		const objectStore = transaction.objectStore('VAM');

		objectStore.add(dateObj);

		transaction.oncomplete = function () {
			ui.showAlert('The appointment was successfully added');
		};
	}

	ui.showAppointments(manageAppointments);

	resetObj();

	form.reset();
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

export function createDatabase() {
	const createDB = window.indexedDB.open('VAM-DB', 1);

	createDB.onerror = function () {
		console.log('Something went wrong');
	};

	createDB.onsuccess = function () {
		DB = createDB.result;
	};

	createDB.onupgradeneeded = function (event) {
		const db = event.target.result;

		const objectStore = db.createObjectStore('VAM', {
			keyPath: 'id',
			autoIncrement: true,
		});

		objectStore.createIndex('pet', 'pet', { unique: false });
		objectStore.createIndex('owner', 'owner', { unique: false });
		objectStore.createIndex('phone', 'phone', { unique: false });
		objectStore.createIndex('date', 'date', { unique: false });
		objectStore.createIndex('hour', 'hour', { unique: false });
		objectStore.createIndex('symptoms', 'symptoms', { unique: false });
		objectStore.createIndex('id', 'id', { unique: true });
	};
}
