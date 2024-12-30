const ApiError = require('../helpers/apiErrorConverter');
const Report = require('../models/report.model');
const addReport = async (data) => {
  const reportData = await Report.create(data);
  return reportData;
};

module.exports = {
  addReport,
};
