import { dataDate, newDate, database } from '../functions.js';
import {
	petInput,
	ownerInput,
	phoneInput,
	dateInput,
	hourInput,
	consultReasonInput,
	findingsInput,
	diagnosisInput,
	treatmentInput,
	form,
} from '../selectors.js';

class App {
	constructor() {
		// Call the initApp() method when the class is instantiated
		this.initApp();
	}

	initApp() {
		database();

		petInput.addEventListener('input', dataDate);
		ownerInput.addEventListener('input', dataDate);
		phoneInput.addEventListener('input', dataDate);
		dateInput.addEventListener('input', dataDate);
		hourInput.addEventListener('input', dataDate);
		consultReasonInput.addEventListener('input', dataDate);
		findingsInput.addEventListener('input', dataDate);
		diagnosisInput.addEventListener('input', dataDate);
		treatmentInput.addEventListener('input', dataDate);

		form.addEventListener('submit', newDate);
	}
}

export default App;
