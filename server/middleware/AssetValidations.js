import checkItem from '../helpers/checkInput';

/**
 * Validate Request POST and GET req
 * @class Validation
 */
export default class AssetValidation {
  /**
     *  @description validate party inputs on create and update operations
     * @memberof AssetValidation
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} get error message
     */
  static createAssetValidation(req, res, next) {
    const dbase = req.url.split('/')[1];

    if (dbase === 'parties') {
      const {
        name, hqAddress, email, phonenumber, about, logoUrl,
      } = req.body;

      const check = checkItem({
        name, hqAddress, email, phonenumber, about, logoUrl,
      });

      if (Object.keys(check).length > 0) {
        return res.status(400).json({
          statusCode: 400,
          data: [check],
        });
      } return next();
    }
    const {
      name, type,
    } = req.body;

    const check = checkItem({
      name, type,
    });

    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        data: [check],
      });
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
        return res.status(400).json({
          statusCode: 400,
          data: [check],
        });
      }
    }
    return next();
  }

  /**
     *  @description validate vote and candidate creation
     * @memberof AssetValidation
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} get error message
     */
  static voteAssetValidation(req, res, next) {
    const url = req.url.split('/')[1];

    if (url === 'votes') {
      const {
        office, candidate,
      } = req.body;

      const check = checkItem({
        office, candidate,
      });

      if (Object.keys(check).length > 0) {
        return res.status(400).json({
          statusCode: 400,
          data: [check],
        });
      } return next();
    }
    const {
      office,
    } = req.body;

    const check = checkItem({
      office,
    });

    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        data: [check],
      });
    } return next();
  }
}
