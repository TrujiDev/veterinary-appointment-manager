import Appointments from './classes/Appointments.js';
import UI from './classes/UI.js';
import {
	form,
	petInput,
	ownerInput,
	phoneInput,
	dateInput,
	hourInput,
	consultReasonInput,
	findingsInput,
	diagnosisInput,
	treatmentInput,
} from './selectors.js';

const ui = new UI();
const manageAppointments = new Appointments();

// Declare variables for editing and the database
let edit;
export let DB;

// Function to initialize the database when the window loads
export function database() {
	window.onload = () => {
		createDatabase();
	};
}

// Function to create and manage the database
function createDatabase() {
	// Open or create the database 'VAM' with version 1
	const createDB = window.indexedDB.open('VAM', 1);

	// Handle errors during database creation
	createDB.onerror = function () {
		console.log('There was an error');
	};

	// Handle successful database creation
	createDB.onsuccess = function () {
		// Set the global DB variable to the created database result
		DB = createDB.result;

		// Display existing appointments
		ui.showAppointments();
	};

	// Handle database upgrade (if version changes)
	createDB.onupgradeneeded = function (event) {
		const db = event.target.result;

		// Create an object store named 'VAM' with auto-incrementing key and specific indexes
		const objectStore = db.createObjectStore('VAM', {
			keyPath: 'id',
			autoIncrement: true,
		});

		objectStore.createIndex('PET', 'pet', { unique: false });
		objectStore.createIndex('OWNER', 'owner', { unique: false });
		objectStore.createIndex('PHONE', 'phone', { unique: false });
		objectStore.createIndex('DATE', 'date', { unique: false });
		objectStore.createIndex('HOUR', 'hour', { unique: false });
		objectStore.createIndex('CONSULT_REASON', 'consultReason', { unique: false });
		objectStore.createIndex('FINDINGS', 'findings', { unique: false });
		objectStore.createIndex('DIAGNOSIS', 'diagnosis', { unique: false });
		objectStore.createIndex('TREATMENT', 'treatment', { unique: false });
		objectStore.createIndex('ID', 'id', { unique: true });
	};
}

// Object to store date-related information
const dateObj = {
	pet: '',
	owner: '',
	phone: '',
	date: '',
	hour: '',
	consultReason: '',
	findings: '',
	diagnosis: '',
	treatment: '',
};

// Function to update dateObj based on input events
export function dataDate(event) {
	dateObj[event.target.name] = event.target.value;
}

// Function to handle the creation or editing of appointments
export function newDate(event) {
	event.preventDefault();

	// Check if any required fields are empty
	if (Object.values(dateObj).includes('')) {
		ui.showAlert('Es necesario completar todos los campos', 'error');
		return;
	}

	// If editing an existing appointment
	if (edit) {
		// Update the appointment in the Appointments class
		manageAppointments.editAppointment({ ...dateObj });

		// Update the appointment in the database
		const transaction = DB.transaction(['VAM'], 'readwrite');
		const objectStore = transaction.objectStore('VAM');
		objectStore.put(dateObj);

		// Handle completion of the transaction
		transaction.oncomplete = () => {
			ui.showAlert('Editado con éxito');

			// Reset the form button text and editing flag
			form.querySelector('button[type="submit"]').textContent = 'Crear cita';
			edit = false;
		};
	} else {
		// If creating a new appointment
		dateObj.id = Date.now();

		// Add the appointment to the Appointments class
		manageAppointments.addAppointment({ ...dateObj });

		// Add the appointment to the database
		const transaction = DB.transaction(['VAM'], 'readwrite');
		const objectStore = transaction.objectStore('VAM');
		objectStore.add(dateObj);

		// Handle completion of the transaction
		transaction.oncomplete = function () {
			ui.showAlert('Añadido con éxito');
		};
	}

	// Display updated appointments
	ui.showAppointments();

	// Reset the dateObj and form
	resetObj();
	form.reset();
}

// Function to reset the dateObj values
export function resetObj() {
	dateObj.pet = '';
	dateObj.owner = '';
	dateObj.phone = '';
	dateObj.date = '';
	dateObj.hour = '';
	dateObj.symptoms = '';
	dateObj.consultReason = '';
	dateObj.findings = '';
	dateObj.diagnosis = '';
	dateObj.treatment = '';
}

// Function to delete an appointment by ID
export function deleteAppointment(id) {
	const transaction = DB.transaction(['VAM'], 'readwrite');
	const objectStore = transaction.objectStore('VAM');
	objectStore.delete(id);

	// Handle completion of the transaction
	transaction.oncomplete = () => {
		ui.showAppointments();
		ui.showAlert('Eliminado con éxito');
	};

	// Handle errors during the transaction
	transaction.onerror = () => {
		ui.showAlert('Ha ocurrido un error al intentar eliminar la cita', 'error');
	};
}

// Function to load appointment data into the form for editing
export function loadAppointment(appointment) {
	const { pet, owner, phone, date, hour, id, consultReason, treatment, findings, diagnosis } = appointment;

	petInput.value = pet;
	ownerInput.value = owner;
	phoneInput.value = phone;
	dateInput.value = date;
	hourInput.value = hour;
	consultReasonInput.value = consultReason;
	findingsInput.value = findings;
	diagnosisInput.value = diagnosis;
	treatmentInput.value = treatment;

	// Update dateObj with the loaded appointment data
	dateObj.pet = pet;
	dateObj.owner = owner;
	dateObj.phone = phone;
	dateObj.date = date;
	dateObj.hour = hour;
	dateObj.consultReason = consultReason;
	dateObj.findings = findings;
	dateObj.diagnosis = diagnosis;
	dateObj.treatment = treatment;
	dateObj.id = id;

	// Change the form button text and set the editing flag
	form.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
	edit = true;
}
