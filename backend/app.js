const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const User = require("./models/User");
const Bill = require("./models/Bill");

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

/* HOME */
app.get("/", (req, res) => {
  res.render("index");
});

/* LOGIN PAGE */
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // In a real app, we'd pass an error variable to the view
      return res.send(`
                <script>
                    alert('User already exists');
                    window.location.href = '/signup';
                </script>
            `);
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      role: role || "user",
    });

    await newUser.save();

    res.send(`
            <script>
                alert('Account created successfully. Please login.');
                window.location.href = '/login';
            </script>
        `);
  } catch (error) {
    console.error(error);
    res.send("Error creating account");
  }
});

/* LOGIN HANDLER */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send(`
                <script>
                    alert('User not found');
                    window.location.href = '/login';
                </script>
            `);
    }

    // Check password (plain for now)
    if (user.password !== password) {
      return res.send(`
                <script>
                    alert('Incorrect password');
                    window.location.href = '/login';
                </script>
            `);
    }

    // Role-based redirect
    if (user.role === "admin") {
      return res.redirect("/admin"); // Ideally use session/token
    } else {
      return res.redirect(`/user?email=${user.email}`);
    }
  } catch (error) {
    console.error(error);
    res.send("Login error");
  }
});

/* ADMIN PAGE */
app.get("/admin", (req, res) => {
  // In a real app, we check if logged in as admin
  res.render("admin", {
    user: { name: 'Admin', role: 'admin' }
  });
});

/* USER PAGE – VIEW & PAY BILLS */
app.get("/user", async (req, res) => {
  const userEmail = req.query.email;

  if (!userEmail) return res.redirect('/login');

  try {
    const user = await User.findOne({ email: userEmail });
    const bills = await Bill.find({ customerEmail: userEmail });

    res.render("dashboard", {
      user: user || { name: 'User', email: userEmail },
      bills: bills
    });

  } catch (error) {
    console.error(error);
    res.send("Error fetching bills");
  }
});

// USER PAY BILL
app.post("/user/pay", async (req, res) => {
  const { billId, email } = req.body;

  try {
    await Bill.findByIdAndUpdate(billId, {
      status: "Paid",
    });

    res.redirect(`/user?email=${email}`);
  } catch (error) {
    console.error(error);
    res.send("Error updating payment status");
  }
});

/* LOGOUT */
app.get("/logout", (req, res) => {
  res.redirect("/login");
});

// Admin bill creation
app.post("/admin/bill", async (req, res) => {
  const { customerEmail, billingMonth, unitsConsumed, ratePerUnit } = req.body;

  try {
    const totalAmount = unitsConsumed * ratePerUnit;

    const newBill = new Bill({
      customerEmail,
      billingMonth,
      unitsConsumed,
      ratePerUnit,
      totalAmount,
    });

    await newBill.save();

    res.send(`
            <script>
                alert('Bill generated successfully');
                window.location.href = '/admin';
            </script>
        `);
  } catch (error) {
    console.error(error);
    res.send("Error generating bill");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
