import { Cart } from "../sell-product/sell.model"


const profitReport = async() =>{
    const result = await Cart.aggregate([{$unwind: "$items"},
        {$lookup: {
            from: "products",
            localField:"items.product",
            foreignField: "_id",
            as: "productInfo"
        }},
        {$unwind: "$productInfo"},
        {
            $group: {
                _id:null,
                totalProfit: {
                    $sum: {
                        $multiply: [
                            {$subtract: [  "$items.price", "$productInfo.purchasePrice",]},
                            "$items.quantity"
                        ]
                    }
                }
            }
        }
    ])
 console.log(result, "profit1");
    return result [0]?.totalProfit || 0

}

const getMonthlySales = async() => {
  const result = await Cart.aggregate([
    {
        $group: {
          _id: {
            year: { $year: "$createdAt"},
            month: {$month: "$createdAT"}
          },
          totalSales : {$sum: "$totalAmount"},
          orders: {$sum: 1}
        }
    },
    {
        $sort: {"_id.year": -1, "_id.month":-1}
    }
  ])
    return result.map((r: any) => ({
    year: r._id.year,
    month: r._id.month,
    totalSales: r.totalSales,
    orders: r.orders,
  }));
}

const getDailySales = async() =>{
    const result = await Cart.aggregate([
        {
            $group: {
                _id: {
                    year:{$year: "$createdAt"},
                    month: { $month: "$createdAt"},
                    day: {$dayOfMonth : "$createdAt"}
                },
                totalSales: {$sum: "$totalAmount"},
                orders: {$sum : 1}
            }
        } ,
        {
            $sort: {"_id.year" : -1, "_id.month": -1, "_id.day": -1}
        },
       
    ])
    // Format into readable date
  return result.map((r: any) => ({
    date: `${r._id.year}-${r._id.month}-${r._id.day}`,
    totalSales: r.totalSales,
    orders: r.orders
  }));
}
export const AdminService ={
    profitReport,
    getMonthlySales,
    getDailySales
}