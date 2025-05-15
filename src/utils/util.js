import { FORM_FIELD } from "../constants/formConstant";
import { getRegex } from "../constants/validator";

const validateFormFields = ( fieldName, fieldValue )=>{


    switch (fieldName) {
        
        case FORM_FIELD["EMAIL"]:
            return getRegex(fieldName).test(fieldValue)
        
        case FORM_FIELD["PASSWORD"]:
            return getRegex(fieldName).test(fieldValue)
    }
};

export {
    validateFormFields
}