const catchAsync = require('../../helpers/asyncErrorHandler');
const service = require('../../services/search/search.service');

const search = catchAsync(async (req, res) => {
  const limit = req.params.limit ? Number(req.params.limit) : 10;
  const page = req.params.page ? Number(req.params.page) : 1;
  const search = req.body.search ? req.body.search : '';
  const filters = req.body.filters ? req.body.filters : '';
  const sortOption = req.body.sort ? req.body.sort : '';
  const searchData = await service.searchWithFilters(
    req.user._id,
    filters,
    sortOption,
    limit,
    page,
    search,
  );
  res.status(200).send({ searchData });
});

module.exports = {
  search,
};
