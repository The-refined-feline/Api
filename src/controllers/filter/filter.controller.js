const catchAsync = require('../../helpers/asyncErrorHandler')
const ApiError = require('../../helpers/apiErrorConverter')
const Service = require('../../services/filter/filter.service')

// create filter
const createControllerFilter = catchAsync(async (req, res, next) => {
    const filter = await Service.createFilter(req.body)
    res.status(201).json({ message: "Filter Add Successfully", filter })
})

// get filter by id
const getControllerFilterById = catchAsync(async (req, res, next) => {
    const filter = await Service.getFilterById(req.params.id)
    if (!filter) throw new ApiError("Filter not found", 404)
    res.status(200).json({ message: "Get Filter Successfully", filter })
})

// get unique types name
const getControllerUnickTypes = catchAsync(async (req, res, next) => {
    const types = await Service.getUniqueTypes()
    res.status(200).json({ message: "Get Filter Types Successfully", types })
})


// get all name from type
const getDataByType = catchAsync(async (req, res, next) => {
    const names = await Service.getNamesByType(req.params.type)
    res.status(200).json({ message: "Get Filter Names Successfully", names })
})

// update filter
const updateControllerFilter = catchAsync(async (req, res, next) => {
    const filter = await Service.updateFilter(req.params.id, req.body)
    res.status(200).json({ message: "Filter Update Successfully", filter })
})

// delete filter
const deleteControllerFilter = catchAsync(async (req, res, next) => {
    await Service.deleteFilter(req.params.id)
    res.status(200).json({ message: "Filter Delete Successfully" })
})


module.exports = {
    createControllerFilter,
    getControllerUnickTypes,
    getDataByType,
    updateControllerFilter,
    deleteControllerFilter,
    getControllerFilterById,
}