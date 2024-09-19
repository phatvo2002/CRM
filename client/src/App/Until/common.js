import { get } from "lodash";

export const getError = (errors, name) => {
    switch (true) {
      case !!errors[name]:
        return true;
      case Boolean(get(errors, name)):
        return true;
      default:
        return false;
    }
  };
export const getErrorMessage = (errors, name) => {
    switch (true) {
      case !!errors[name]:
        return errors[name]?.message;
      case !!get(errors, name)?.message:
        return get(errors, name)?.message;
      default:
        return "";
    }
  };