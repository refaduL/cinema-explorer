const { check } = require("express-validator");

const validateMovieInput = [
  check("title").notEmpty().withMessage("Title is required."),
  check("release_date").isDate().withMessage("Invalid release date format."),
  check("duration")
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive integer."),
  check("genres")
    .optional()
    .isString()
    .withMessage("Genres must be a comma-separated string."),
  check("actors")
    .optional()
    .isString()
    .withMessage("Actors must be a comma-separated string."),
  check("directors")
    .optional()
    .isString()
    .withMessage("Directors must be a comma-separated string."),
];

module.exports = validateMovieInput;
