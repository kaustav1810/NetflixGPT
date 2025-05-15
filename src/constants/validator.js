import { FORM_FIELD } from './formConstant';

const getRegex = (fieldName) => {
	switch (fieldName) {
		case FORM_FIELD['EMAIL']:
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		case FORM_FIELD['PASSWORD']:
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/; //(8+ chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char)
	}
};
export { getRegex };
