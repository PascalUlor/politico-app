import checkItem from '../helpers/checkinput';

/**
 * Validate Request POST and GET req
 * @class Validation
 */
export default class partyValidation {
  /**
     *  @description validate party inputs on create and update operations
     * @memberof partyValidation
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} get error message
     */
  static createPartyValidation(req, res, next) {
    const {
      name, hqAddress, email, phonenumber, about, logoUrl, userId,
    } = req.body;

    const check = checkItem({
      name, hqAddress, email, phonenumber, about, logoUrl, userId,
    });

    if (Object.keys(check).length > 0) {
      return res.status(400).json(check);
    } return next();
  }
}
