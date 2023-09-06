const User = require('../database/schemas/User')
const Product = require('../database/schemas/Product')
const Cart = require('../database/schemas/Cart')
const Order = require('../database/schemas/Order')
const SelledOrder = require('../database/schemas/SelledOrder')
const ProductRating = require('../database/schemas/ProductRating')
const ProductCatagoryRating = require('../database/schemas/ProductCatagoryRating')


const currentDate = new Date();
const currentDay = currentDate.getDay();
const startOfWeek = new Date(currentDate);
startOfWeek.setDate(currentDate.getDate() - currentDay); // Set the date to the start of the week (Sunday)
startOfWeek.setHours(0, 0, 0, 0); // Set the time to midnight
const endOfWeek = new Date(currentDate);
endOfWeek.setDate(startOfWeek.getDate() + 6); // Set the date to the end of the week (Saturday)
endOfWeek.setHours(23, 59, 59, 999); // Set the time to the end of the day

const getUserAggregate = async() => {
    try {
        const UserSignupPerWeekRawData = await User.aggregate([{
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$created_at' },
                    },
                    count: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $gte: ['$created_at', startOfWeek] },
                                        { $lte: ['$created_at', endOfWeek] },
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
            {
                $sort: {
                    '_id': 1, // Sort by ascending order of the _id field (created_at)
                },
            },
        ]);
        const users_signedup_perweek = {
            labels: [],
            data: []
        }
        UserSignupPerWeekRawData.forEach(signup => {
            users_signedup_perweek.labels.push(signup._id)
            users_signedup_perweek.data.push(signup.count)
        });
        return users_signedup_perweek
    } catch (error) {
        console.log("Agreegate error:" + error)
        return null
    }
}

const getOrderAggregate = async() => {
    try {
        const OrderAggregateRowData = await Order.aggregate([{
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$created_at' },
                    },
                    count: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $gte: ['$created_at', startOfWeek] },
                                        { $lte: ['$created_at', endOfWeek] },
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
            {
                $sort: {
                    '_id': 1, // Sort by ascending order of the _id field (created_at)
                },
            },
        ]);
        const orders_per_week = {
            labels: [],
            data: []
        }
        OrderAggregateRowData.forEach(el => {
            orders_per_week.labels.push(el._id)
            orders_per_week.data.push(el.count)
        });
        return orders_per_week

    } catch (error) {
        console.log("Agreegate error:" + error)
        return null
    }
}

const getCartUsage = async() => {
    try {
        const CartUsage = await Cart.aggregate([{
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m-%d', date: '$created_at' },
                },
                count: { $sum: 1 },
            },
        }, {
            $sort: {
                '_id': 1, // Sort by ascending order of the _id field (created_at)
            },
        }])
        const cart_usage = {
            labels: [],
            data: []
        }
        CartUsage.forEach(usage => {
            cart_usage.labels.push(usage._id)
            cart_usage.data.push(usage.count)
        });
        return cart_usage
    } catch (error) {
        console.log("Agreegate error:" + error)
        return null
    }
}

const getProductRatingRate = async() => {
    try {
        const ProductRtingRawData = await ProductRating.aggregate([{
            $group: {
                _id: {
                    date: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
                    product: '$product_id',
                },
                averageRating: { $avg: '$rating_value' },
            },
        }, {
            $sort: {
                '_id': 1
            }
        }])
        const product_rating_rate = {
            labels: [],
            datasets: [],
        }
        ProductRtingRawData.forEach(entry => {
            const { date, product } = entry._id;
            const existingDataset = product_rating_rate.datasets.find(d => d.label == product)
            if (existingDataset) {
                existingDataset.data.push(entry.averageRating)
            } else {
                product_rating_rate.labels.push(date)
                product_rating_rate.datasets.push({
                    label: product,
                    data: [entry.averageRating]
                })
            }
        });
        return product_rating_rate
    } catch (error) {
        console.log("Agreegate error:" + error)
        console.log(error)
        return null
    }
}

const getProductCatagoryRatingRate = async() => {
    try {
        const ProductCatagoryRatingRateRawData = await ProductCatagoryRating.aggregate([{
            $group: {
                _id: {
                    date: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
                    product: '$product_catagory_id',
                },
                averageRating: { $avg: '$rating_value' },
            },
        }, {
            $sort: {
                '_id': 1
            }
        }])
        const product_catagory_rating_rate = {
            labels: [],
            datasets: [],
        }
        ProductCatagoryRatingRateRawData.forEach(entry => {
            const { date, product } = entry._id;
            const existingDataset = product_catagory_rating_rate.datasets.find(d => d.label == product)
            if (existingDataset) {
                existingDataset.data.push(entry.averageRating)
            } else {
                product_catagory_rating_rate.labels.push(date)
                product_catagory_rating_rate.datasets.push({
                    label: product,
                    data: [entry.averageRating]
                })
            }
        });
        return product_catagory_rating_rate
    } catch (error) {
        console.log("Agreegate error:" + error)
        console.log(error)
        return null
    }
}

const getSelledOrderData = async() => {
    try {
        const dailySalesData = await SelledOrder.aggregate([{
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m-%d', date: '$created_at' },
                },
                totalSales: { $sum: '$total_price' },
            },
        }, {
            $sort: {
                '_id': 1
            }
        }])
        const selled_order_report = {
            labels: [],
            data: []
        }
        dailySalesData.forEach(entry => {
            selled_order_report.labels.push(entry._id)
            selled_order_report.data.push(entry.totalSales)
        });
        return selled_order_report
    } catch (error) {
        console.log("Agreegate error:" + error)
        console.log(error)
        return null
    }
}

const productUploadRate = async() => {
    try {
        const ProductPostRatePerDay = await Product.aggregate([{
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$created_at' },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    '_id': 1
                }
            }
        ])
        const product_post_per_day = {
            labels: [],
            data: []
        }
        ProductPostRatePerDay.forEach(entry => {
            product_post_per_day.labels.push(entry._id)
            product_post_per_day.data.push(entry.count)
        });
        return product_post_per_day
    } catch (error) {
        console.log("Agreegate error:" + error)
        console.log(error)
        return null
    }
}

module.exports = {
    getUserAggregate,
    getOrderAggregate,
    getProductRatingRate,
    getCartUsage,
    getProductCatagoryRatingRate,
    getSelledOrderData,
    productUploadRate
}