import checkItem from '../helpers/checkinput';

/**
 * Validate Request POST and GET req
 * @class Validation
 */
export default class assetValidation {
  /**
     *  @description validate party inputs on create and update operations
     * @memberof assetValidation
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} get error message
     */
  static createAssetValidation(req, res, next) {
    const {
      name, hqAddress, email, phonenumber, about, logoUrl, userId, type,
    } = req.body;

    const check = checkItem({
      name, hqAddress, email, phonenumber, about, logoUrl, userId, type,
    });

    if (Object.keys(check).length > 0) {
      return res.status(400).json(check);
    } return next();
  }

  /**
     * @description validate details on update operations
     * @memberof assetValidation
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} get error message
     */
  static updateAssetValidation(req, res, next) {
    const { name } = req.body;
    const id = parseInt(req.params.id, 10);

    if (!Number.isNaN(id)) {
      const check = checkItem({ name });

      if (Object.keys(check).length > 0) {
        return res.status(400).json(check);
      }
    }
    return next();
  }
}
