CREATE DATABASE foodie_db;
USE foodie_db;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin (username, password)
VALUES ('foodieAdmin', 'Foodie@123');

CREATE TABLE food (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE orders MODIFY status VARCHAR(50) DEFAULT 'Confirmed';
ALTER TABLE orders ADD payment_method VARCHAR(50);

CREATE TABLE order_items (
id INT PRIMARY KEY AUTO_INCREMENT,
order_id INT,
food_id INT,
food_name VARCHAR(150),
size VARCHAR(50),
quantity INT DEFAULT 1,
price DECIMAL(10,2),

FOREIGN KEY (order_id) REFERENCES orders(id),
FOREIGN KEY (food_id) REFERENCES food(id)
);


-- cake category
INSERT INTO food (name, category, price, description, image) VALUES
('Chocolate Cake', 'cake', 300, 'Rich chocolate layered cake.', 'images/chocolate-cake.jpg'),
('Black Forest Cake', 'cake', 350, 'Classic black forest cake with cream', 'images/blackforest.jpg'),
('Red Velvet Cake', 'cake', 400, 'Soft red velvet with cream cheese frosting', 'images/redvelvet.jpg'),
('Pineapple Cake', 'cake', 280, 'Fresh pineapple flavored cake', 'images/pineapple.jpg'),
('Vanilla Cake', 'cake', 320, 'Fresh vanilla flavored cake', 'images/vanilla.jpg'),
('Fruit Cake Cake', 'cake', 370, 'Fresh Fruit cream cake', 'images/fruitcake.jpg');


-- pizza 
INSERT INTO food (name, category, price, description, image) VALUES
('Margherita Pizza', 'pizza', 250, 'Classic cheese and tomato pizza', 'images/margherita.jpg'),
('Farmhouse Pizza', 'pizza', 400, 'Loaded with fresh vegetables', 'images/farmhouse.jpg'),
('Peppy Paneer Pizza', 'pizza', 420, 'Paneer and capsicum special', 'images/peppy-paneer.jpg'),
('Chicken Dominator', 'pizza', 390, 'Spicy chicken dominator pizza', 'images/chicken-dominator.jpg'),
('Veg Extravaganza', 'pizza', 450, 'Fully loaded vegetable pizza', 'images/veg-extravaganza.jpg'),
('Cheese Burst Pizza', 'pizza', 480, 'Extra cheese stuffed pizza', 'images/cheese-burst.jpg');

-- shake
INSERT INTO food (name, category, price, description, image) VALUES
('Chocolate Shake', 'shake', 150, 'Creamy chocolate milkshake', 'images/chocolate-shake.jpg'),
('Strawberry Shake', 'shake', 140, 'Fresh strawberry shake', 'images/strawberry-shake.jpg'),
('Banana Shake', 'shake', 130, 'Classic banana milkshake', 'images/banana-shake.jpg'),
('Oreo Shake', 'shake', 170, 'Oreo cookies blended shake', 'images/oreo-shake.jpg'),
('Mango Shake', 'shake', 160, 'Fresh mango delight shake', 'images/mango-shake.jpg'),
('KitKat Shake', 'shake', 180, 'KitKat chocolate milkshake', 'images/kitkat-shake.jpg');

-- juice 

INSERT INTO food (name, category, price, description, image) VALUES
('Orange Juice', 'juice', 120, 'Freshly squeezed orange juice', 'images/orange-juice.jpg'),
('Apple Juice', 'juice', 130, 'Pure apple juice', 'images/apple-juice.jpg'),
('Watermelon Juice', 'juice', 140, 'Fresh watermelon juice', 'images/watermelon-juice.jpg'),
('Pomegranate Juice', 'juice', 125, 'Sweet Pomegranate juice', 'images/pomegranate.jpg'),
('Pineapple Juice', 'juice', 110, 'Refreshing Pineapple juice', 'images/pineapple-juice.jpg'),
('Mixed Fruit Juice', 'juice', 150, 'Healthy mixed fruit juice', 'images/mixed-fruit-juice.jpg');

-- breakfast

INSERT INTO food (name, category, price, description, image) VALUES
('Idli Sambar', 'breakfast', 90, 'Soft idli served with sambar', 'images/idli-sambar.jpg'),
('Poha', 'breakfast', 60, 'Light and healthy poha', 'images/poha.jpg'),
('Paratha', 'breakfast', 80, 'Stuffed paratha with butter', 'images/paratha.jpg'),
('Upma', 'breakfast', 70, 'Traditional south Indian upma', 'images/upma.jpg'),
('Sandwich', 'breakfast', 65, 'Fresh Vegitable Sandwich', 'images/sandwich.jpg'),
('Pancake', 'breakfast', 75, 'Delicious Pancake', 'images/pancake.jpg');

-- lunch

INSERT INTO food (name, category, price, description, image) VALUES
('Rajma Chawal', 'lunch', 180, 'Rajma curry with steamed rice', 'images/rajma-chawal.jpg'),
('Dal Roti', 'lunch', 150, 'Dal with fresh roti', 'images/dal-roti.jpg'),
('Paneer Thali', 'lunch', 250, 'Complete veg thali', 'images/paneer-thali.jpg'),
('Chicken Thali', 'lunch', 300, 'Non-veg thali with chicken curry', 'images/chicken-thali.jpg'),
('Veg Pulao', 'lunch', 170, 'Fragrant vegetable pulao', 'images/veg-pulao.jpg'),
('Fish Curry Rice', 'lunch', 290, 'Fish curry served with rice', 'images/fish-curry-rice.jpg');

-- dinner
INSERT INTO food (name, category, price, description, image) VALUES
('Veg Kadai', 'dinner', 240, 'Spicy veg kadai curry', 'images/veg-kadai.jpg'),
('Paneer Lababdar', 'dinner', 260, 'Creamy paneer lababdar', 'images/paneer-lababdar.jpg'),
('Chicken Curry', 'dinner', 320, 'Traditional chicken curry', 'images/chicken-curry.jpg'),
('Mutton Biryani', 'dinner', 380, 'Spicy mutton biryani', 'images/mutton-biryani.jpg'),
('Tandoori Roti', 'dinner', 40, 'Fresh tandoori roti', 'images/tandoori-roti.jpg'),
('Jeera Rice', 'dinner', 120, 'Jeera flavored basmati rice', 'images/jeera-rice.jpg');


-- veg
INSERT INTO food (name, category, price, description, image) VALUES
('Chole Bhature', 'veg', 220,'Yummy Chole bhature ' , 'images/chole-bhature.jpg'),
('Veg Biryani', 'veg', 150, 'Aromatic vegetable biryani', 'images/veg-biryani.jpg'),
('Mix Veg ', 'veg', 180, 'Mixed vegetable ', 'images/mix-veg.jpg'),
('Veg Thali', 'veg', 170, 'Spicy Veg Thali', 'images/veg-thali.jpg'),
('Palak Paneer', 'veg', 210, 'Spinach and paneer curry', 'images/palak-paneer.jpg'),
('Paneer Butter Masala', 'veg', 200, 'Creamy paneer curry', 'images/paneer-butter-masala.jpg');

-- non veg

INSERT INTO food (name, category, price, description, image) VALUES
('Chicken Biryani', 'nonveg', 280, 'Spicy chicken biryani', 'images/chicken-biryani.jpg'),
('Butter Chicken', 'nonveg', 300, 'Creamy butter chicken', 'images/butter-chicken.jpg'),
('Chicken Tikka', 'nonveg', 260, 'Traditional chicken Tikka', 'images/chicken-tikka.jpg'),
('Fish Fry', 'nonveg', 240, 'Crispy fried fish','images/fish-fry.jpg' ),
('Mutton Curry', 'nonveg', 350, 'Spicy mutton curry', 'images/mutton-curry.jpg'),
('Chicken Roll', 'nonveg', 320, 'spicy chicken roll', 'images/chicken-roll.jpg');

SELECT * FROM food;
SELECT * FROM users;
SELECT * FROM orders;
SELECT * FROM order_items;