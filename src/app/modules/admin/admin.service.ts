import { Cart } from "../sell-product/sell.model"


const profitReport = async () => {
  const result = await Cart.aggregate([
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "productInfo"
      }
    },
    { $unwind: "$productInfo" },
    {
      $addFields: {
        orderDay: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        },
        itemProfit: {
          $multiply: [
            { $subtract: ["$items.price", "$productInfo.purchasePrice"] },
            "$items.quantity"
          ]
        }
      }
    },
    {
      $project: {
        _id: 0,
        orderDay: 1,
        productName: "$productInfo.name",
        purchasePrice: "$productInfo.purchasePrice",
        soldPrice: "$items.price",
        quantity: "$items.quantity",
        profit: "$itemProfit",
        loss: {
          $cond: [{ $lt: ["$itemProfit", 0] }, { $abs: "$itemProfit" }, 0]
        }
      }
    },
    {
      $group: {
        _id: "$orderDay",
        totalProfit: {
          $sum: {
            $cond: [{ $gt: ["$profit", 0] }, "$profit", 0]
          }
        },
        totalLoss: {
          $sum: {
            $cond: [{ $lt: ["$profit", 0] }, { $abs: "$profit" }, 0]
          }
        },
        items: {
          $push: {
            productName: "$productName",
            purchasePrice: "$purchasePrice",
            soldPrice: "$soldPrice",
            quantity: "$quantity",
            profit: "$profit",
            loss: "$loss"
          }
        }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  console.log(result, "dayWiseProfitAndLoss");
  return result;
};


const getMonthlySales = async() => {
  const result = await Cart.aggregate([
    {
        $group: {
          _id: {
            year: { $year: "$createdAt"},
            month: {$month: "$createdAt"}
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