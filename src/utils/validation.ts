import { EMAIL_REGEX } from '../constants/constant';
import { FORM_FIELD } from '../constants/formConstant';

export const getErrorMessage = (
	fieldName: string,
	fieldValue: string | undefined
): string => {
	const errorMsg: string[] = [];

	switch (fieldName) {
		case FORM_FIELD['EMAIL']:
			if (fieldValue?.trim() === '' || !EMAIL_REGEX.test(fieldValue || ''))
				errorMsg.push('Please enter a valid email');
			break;

		case FORM_FIELD['PASSWORD']:
			if (fieldValue?.trim() === '')
				errorMsg.push('Please enter a valid password');

			if ((fieldValue?.length || 0) <= 8) {
				errorMsg.push('Password must be more than 8 characters long, ');
			}

			if (
				!/[A-Z]/.test(fieldValue || '') ||
				!/[a-z]/.test(fieldValue || '')
			) {
				errorMsg.push('Password must contain 1 uppercase & 1 lowercase character, ');
			}

			if (!/\d/.test(fieldValue || '')) {
				errorMsg.push('Password must contain at least 1 digit, ');
			}

			if (!/[^A-Za-z0-9]/.test(fieldValue || '')) {
				errorMsg.push('Password must contain at least 1 special character');
			}
			break;

		case FORM_FIELD['NAME']:
			if (fieldValue?.trim() === '')
				errorMsg.push('Name cannot be empty');
			break;
	}

	return errorMsg.join(',');
};

export const getDisplayErrorMessage = (errorMessage: string): string =>
	errorMessage?.slice(errorMessage?.indexOf("(") + 1, errorMessage?.indexOf(")"));