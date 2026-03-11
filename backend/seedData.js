const mongoose = require("mongoose");

const Customer = require("./src/models/Customer");
const Registration = require("./src/models/Registration");
const ProductLead = require("./src/models/ProductLead");
const ClassLead = require("./src/models/ClassLead");
const Product = require("./src/models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/salonease")
.then(() => console.log("MongoDB Connected for Seeding"))
.catch(err => console.log(err));

const firstNames = [
"Riya","Neha","Ayesha","Sneha","Kavya","Muskaan","Tanvi","Poonam","Aarti","Meera",
"Shreya","Roshni","Priya","Nikita","Komal","Pooja","Bhakti","Aarya","Sakshi","Aditi",
"Sana","Tanisha","Rutuja","Anjali","Payal","Isha","Simran","Zoya","Fatima","Heena",
"Riddhi","Shraddha","Mitali","Swati","Kiran","Vaishnavi","Gauri","Asmita","Rashmi","Divya"
];

const lastNames = [
"Sharma","Patil","Khan","More","Iyer","Shaikh","Desai","Jadhav","Singh","Nair",
"Kulkarni","Gupta","Menon","Sawant","Yadav","Chavan","Joshi","Naidu","Pillai","Shetty"
];

const makeupProducts = [
"Lipstick","Foundation","Compact","Concealer","Kajal","Eyeliner","Blush"
];

const hairProducts = [
"Shampoo","Conditioner","Hair Serum","Hair Mask","Hair Oil"
];

const courses = [
"Basic Makeup","Advanced Makeup","Hair Styling","Nail Art","Skin Treatment"
];

function randomPhone() {
return "9" + Math.floor(100000000 + Math.random()*900000000);
}

function randomDate() {
const now = new Date();
const past = new Date();
past.setMonth(now.getMonth() - 6);
return new Date(past.getTime() + Math.random()*(now.getTime()-past.getTime()));
}

async function seed() {

await Customer.deleteMany({});
await Registration.deleteMany({});
await ProductLead.deleteMany({});
await ClassLead.deleteMany({});
await Product.deleteMany({});

let customers = [];

for(let i=0;i<60;i++){
const name = firstNames[i%firstNames.length] + " " + lastNames[i%lastNames.length];
const phone = randomPhone();

customers.push({
name,
phone,
email: name.toLowerCase().replace(" ","")+"@gmail.com",
createdAt: randomDate()
});
}

await Customer.insertMany(customers);

// repeat 20 customers
for(let i=0;i<20;i++){
const c = customers[i];
await Customer.create({
name:c.name,
phone:c.phone,
email:c.email,
createdAt: randomDate()
});
}

console.log("80 Customers Added");

let students=[];

for(let i=0;i<35;i++){
const c = customers[i];
students.push({
name:c.name,
phone:c.phone,
email:c.email,
category:["Makeup","Hair","Nails","Skin"][i%4],
course:courses[i%courses.length],
createdAt:randomDate()
});
}

await Registration.insertMany(students);

// repeat 15 students
for(let i=0;i<15;i++){
const s = students[i];
await Registration.create({
...s,
course:courses[(i+2)%courses.length],
createdAt:randomDate()
});
}

console.log("50 Students Added");

// products
let products=[];

makeupProducts.forEach(p=>{
products.push({name:p,brand:"Insight",price:299+Math.floor(Math.random()*300),category:"Makeup",quantity:20+Math.floor(Math.random()*50)});
});

hairProducts.forEach(p=>{
products.push({name:p,brand:"Matrix",price:399+Math.floor(Math.random()*500),category:"Hair Care",quantity:20+Math.floor(Math.random()*50)});
});

await Product.insertMany(products);
console.log("Products Added");

// product leads
for(let i=0;i<60;i++){
const c = customers[Math.floor(Math.random()*customers.length)];
await ProductLead.create({
name:c.name,
phone:c.phone,
product:[...makeupProducts,...hairProducts][Math.floor(Math.random()*12)],
category: Math.random()>0.5?"💄 Makeup":"💇 Hair Care",
status:["Interested","Ordered","Delivered"][Math.floor(Math.random()*3)],
date:randomDate()
});
}

console.log("Product Leads Added");

// class leads
for(let i=0;i<45;i++){
const c = customers[Math.floor(Math.random()*customers.length)];
await ClassLead.create({
name:c.name,
phone:c.phone,
course:courses[Math.floor(Math.random()*courses.length)],
category:["💄 Makeup","💇 Hair","💅 Nail","🧴 Skin"][Math.floor(Math.random()*4)],
status:["Interested","Registered","Completed"][Math.floor(Math.random()*3)],
date:randomDate()
});
}

console.log("Class Leads Added");

console.log("DONE");
process.exit();
}

seed();
