import { StatusCodes } from "http-status-codes";

const HTTP = {
  SUCCESS: StatusCodes.OK,
  CREATED: StatusCodes.CREATED,
  BAD_REQUEST: StatusCodes.BAD_REQUEST,
  UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
  FORBIDDEN: StatusCodes.FORBIDDEN,
  NOT_FOUND: StatusCodes.NOT_FOUND,
  INTERNAL_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
};
export default HTTP;