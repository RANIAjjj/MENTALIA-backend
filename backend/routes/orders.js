const { Order } = require("../models/order");
const { auth, isUser, isAdmin } = require("../middleware/auth");

const router = require("express").Router();

//CREATE

// createOrder is fired by stripe webhook
// example endpoint

router.post("/", auth, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    console.log('order saved')
    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", isUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ALL ORDERS

router.get("/", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
    // console.log(orders)
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET MONTHLY INCOME
router.get("/income", isAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err);
  }
});


// Route to calculate total monthly sales
router.get("/total-monthly-sales", async (req, res) => {
  try {
    // Get the current date and the date of the previous month
    const currentDate = new Date();
    const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    
    // Calculate the total monthly sales using aggregation
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonthDate, $lt: currentDate } // Filter orders from the previous month
        }
      },
      {
        $group: {
          _id: null, // Group all orders
          totalSales: { $sum: "$total" } // Calculate the sum of total sales
        }
      }
    ]);

    // Send the total monthly sales as a response
    res.status(200).json({ totalMonthlySales: result.length > 0 ? result[0].totalSales : 0 });
  } catch (error) {
    // Handle errors
    console.error("Error calculating total monthly sales:", error);
    res.status(500).json({ error: "An error occurred while calculating total monthly sales." });
  }
});


// Route to calculate total yearly sales
router.get("/total-yearly-sales", async (req, res) => {
  try {
    // Get the current date and the date of the previous year
    const currentDate = new Date();
    const previousYearDate = new Date(currentDate.getFullYear() - 1, 0, 1);

    // Calculate the total yearly sales using aggregation
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousYearDate, $lt: currentDate } // Filter orders from the previous year
        }
      },
      {
        $group: {
          _id: null, // Group all orders
          totalSales: { $sum: "$total" } // Calculate the sum of total sales
        }
      }
    ]);

    // Send the total yearly sales as a response
    res.status(200).json({ totalYearlySales: result.length > 0 ? result[0].totalSales : 0 });
  } catch (error) {
    // Handle errors
    console.error("Error calculating total yearly sales:", error);
    res.status(500).json({ error: "An error occurred while calculating total yearly sales." });
  }
});


router.get("/total-daily-sales", async (req, res) => {
  try {
    // Get the current date and the start of the day
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Get the end of the day
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    // Calculate the total daily sales using aggregation
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lt: endOfDay } // Filter orders for the current day
        }
      },
      {
        $group: {
          _id: null, // Group all orders
          totalSales: { $sum: "$total" } // Calculate the sum of total sales
        }
      }
    ]);

    // Send the total daily sales as a response
    res.status(200).json({ totalDailySales: result.length > 0 ? result[0].totalSales : 0 });
  } catch (error) {
    // Handle errors
    console.error("Error calculating total daily sales:", error);
    res.status(500).json({ error: "An error occurred while calculating total daily sales." });
  }
});

module.exports = router;
