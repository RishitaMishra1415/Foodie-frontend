const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

/*  DATABASE CONNECTION */

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rishu", 
    database: "foodie_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err);
    } else {
        console.log("Database Connected");
    }
});

/*TEST ROUTE  */

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

/*  GET FOOD BY CATEGORY*/

app.get("/api/foods/:category", (req, res) => {

    const category = req.params.category;

    const sql = "SELECT * FROM food WHERE category = ?";

    db.query(sql, [category], (err, result) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }

    });

});

app.post("/api/signup",(req,res)=>{

    const {name,email,phone,password,address,city,pincode} = req.body;
    
    const sql = "INSERT INTO users (name,email,phone,password,address,city,pincode) VALUES (?,?,?,?,?,?,?)";
    
    db.query(sql,[name,email,phone,password,address,city,pincode],(err,result)=>{
    
    if(err){
    return res.json({success:false,message:"Email already registered"});
    }
    
    res.json({success:true});
    
    });
    
    });
    
    
    app.post("/api/login",(req,res)=>{
    
    const {email,password} = req.body;
    
    const sql = "SELECT * FROM users WHERE email=?";
    
    db.query(sql,[email],(err,result)=>{
    
    if(result.length === 0){
    return res.json({message:"Email not found"});
    }
    
    const user = result[0];
    
    if(user.password !== password){
    return res.json({message:"Wrong password"});
    }
    
    res.json({
    success:true,
    user:user
    });
    
    });
    
    });



    /*order API */
    app.post("/api/place-order",(req,res)=>{

        const {
        
        userId,
        foodId,
        foodName,
        size,
        quantity,
        price,
        total,
        payment
        
        } = req.body;
        
        /* SAVE ORDER */
        
        const orderSql =
        "INSERT INTO orders (user_id,total_amount,payment_method,status) VALUES (?,?,?,?)";
        
        db.query(orderSql,[userId,total,payment,"Preparing"],
        
        (err,result)=>{
        
        if(err){
        
        console.log(err);
        
        return res.status(500).json(err);
        
        }
        
        const orderId = result.insertId;
        
        /* SAVE ORDER ITEMS */
        
        const itemSql =
        "INSERT INTO order_items (order_id,food_id,food_name,size,quantity,price) VALUES (?,?,?,?,?,?)";
        
        db.query(itemSql,[
        
        orderId,
        foodId,
        foodName,
        size,
        quantity,
        price
        
        ],(err2)=>{
        
        if(err2){
        
        console.log(err2);
        
        return res.status(500).json(err2);
        
        }
        
        res.json({
        
        message:"Order saved successfully"
        
        });
        
        });
        
        });
        
        });

     /* my orders */

        app.get("/api/my-orders/:userId",(req,res)=>{

            const userId=req.params.userId;
            
            const sql=`
            SELECT 
            orders.id as order_id,
            orders.status,
            orders.payment_method,
            order_items.food_name,
            order_items.size,
            order_items.quantity,
            order_items.price,
            food.image
            
            FROM orders
            
            JOIN order_items
            ON orders.id = order_items.order_id
            
            JOIN food
            ON order_items.food_id = food.id
            
            WHERE orders.user_id = ?
            
            ORDER BY orders.id DESC
            `;
            
            db.query(sql,[userId],(err,result)=>{
            
            if(err){
            
            console.log(err);
            res.status(500).json(err);
            
            }else{
            
            res.json(result);
            
            }
            
            });
            
            });

            /* track api*/
            app.get("/api/orders/:id", (req, res) => {

                const orderId = req.params.id;
                
                const sql = `
                SELECT 
                orders.id AS order_id,
                orders.status,
                orders.payment_method,
                orders.total_amount,
                order_items.food_name,
                order_items.quantity,
                food.image
                FROM orders
                JOIN order_items 
                  ON orders.id = order_items.order_id
                JOIN food 
                  ON order_items.food_id = food.id
                WHERE orders.id = ?
                LIMIT 1
                `;
                
                db.query(sql, [orderId], (err, result) => {
                
                if (err) {
                console.log("DB ERROR:", err);
                return res.status(500).json({ error: "Database error" });
                }
                
                if (result.length === 0) {
                return res.status(404).json({ error: "Order not found" });
                }
                
                res.json(result[0]);
                
                });
                
                });


/*  SERVER START */

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});