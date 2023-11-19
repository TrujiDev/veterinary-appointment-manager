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
export let DB;

export function database() {
	window.onload = () => {
		createDatabase();
	};
}

function createDatabase() {
	const createDB = window.indexedDB.open('VAM', 1);

	createDB.onerror = function () {
		console.log('There was an error');
	};

	createDB.onsuccess = function () {
		DB = createDB.result;

		ui.showAppointments();
	};

	createDB.onupgradeneeded = function (event) {
		const db = event.target.result;

		const objectStore = db.createObjectStore('VAM', {
			keyPath: 'id',
			autoIncrement: true,
		});

		objectStore.createIndex('PET', 'pet', { unique: false });
		objectStore.createIndex('OWNER', 'owner', { unique: false });
		objectStore.createIndex('PHONE', 'phone', { unique: false });
		objectStore.createIndex('DATE', 'date', { unique: false });
		objectStore.createIndex('HOUR', 'hour', { unique: false });
		objectStore.createIndex('SYMPTOMS', 'symptoms', { unique: false });
		objectStore.createIndex('ID', 'id', { unique: true });
	};
}

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

		const transaction = DB.transaction(['VAM'], 'readwrite');
		const objectStore = transaction.objectStore('VAM');
		objectStore.put(dateObj);

		transaction.oncomplete = () => {
			ui.showAlert('Successfully edited');

			form.querySelector('button[type="submit"]').textContent = 'Create date';

			edit = false;
		};
	} else {
		dateObj.id = Date.now();

		manageAppointments.addAppointment({ ...dateObj });

		const transaction = DB.transaction(['VAM'], 'readwrite');

		const objectStore = transaction.objectStore('VAM');

		objectStore.add(dateObj);

		transaction.oncomplete = function () {
			ui.showAlert('Successfully added');
		};
	}

	ui.showAppointments();

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
	const transaction = DB.transaction(['VAM'], 'readwrite');
	const objectStore = transaction.objectStore('VAM');
	objectStore.delete(id);

	transaction.oncomplete = () => {
		ui.showAppointments();
		ui.showAlert('Successfully deleted');
	};

	transaction.onerror = () => {
		ui.showAlert('There was an error deleting the appointment', 'error');
	};
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
