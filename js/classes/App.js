import { dataDate, newDate, database } from '../functions.js';
import {
	petInput,
	ownerInput,
	phoneInput,
	dateInput,
	hourInput,
	symptomsInput,
	form,
} from '../selectors.js';

class App {
	constructor() {
		this.initApp();
	}

	initApp() {
		database();

		petInput.addEventListener('input', dataDate);
		ownerInput.addEventListener('input', dataDate);
		phoneInput.addEventListener('input', dataDate);
		dateInput.addEventListener('input', dataDate);
		hourInput.addEventListener('input', dataDate);
		symptomsInput.addEventListener('input', dataDate);

		form.addEventListener('submit', newDate);
	}
}

export default App;
