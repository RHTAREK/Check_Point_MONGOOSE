const mongoose=require ("mongoose");
require ("dotenv").config();

//connect server to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//create mongose Schema
const personSchema=new mongoose.Schema({
    name:{type:String,
    required:true,},
    age:Number,
    favoritefoods:[String],
});
//create Model 
const Person =mongoose.model("Person",personSchema)

//create fist model Person
const firstPerson=new Person ({
    name:"Tarek",
    age:18,
    favoritefoods:["nwasser","ma9rouna","kafteji"],
}) 
firstPerson.save((err,data)=>{
    err?console.log(err):console.log(`${firstPerson.name} is saved :D`);
})

//Creating Many model 
Person.create([{name:"hajer",age:90,favoritefoods:["rouz","sushi"]},
{name:"lebron",age:36,favoritefoods:["lablebi","m7amsa"]},

{name:"ahmed",age:30,favoritefoods:["food"],},
],
(err)=>err?console.log(err):console.log("jawek behi")
)

//searching for a given name
Person.find({ name: 'hajer' }, (err, data) => {
    err ? console.error(err) : console.log(`There are ${data.length} person having name = hajer`)
})

//find one person by favorite food
Person.findOne({favoritefoods:"sushi"},(err,data)=>{
    err?console.log(err): console.log(` ${data.name}'s favorite food is sushi`)})

//searching for someone by id 
Person.findById("600c1352a09c8a0bd08a0fc7",(err,data)=>{
    err?console.error(err): console.log(`${data.name} have this  id :"${data.id}"`)
})    

//find person and update 
Person.findByIdAndUpdate("600c1352a09c8a0bd08a0fc7", { $push: { favoritefoods: "hamburger" } }, (err, data) => {
    if (err) { console.error(err); }
    else {
        data.save((err, doc) => {
            err ? console.error(err) : console.log(`heres the new favoritefood of ${doc.name} : ${doc.favoritefoods}`);
        })
    }
})
// FindOne and Update 

Person.findOneAndUpdate({ name: "hajer" }, { age: '91' }, { new: true }, (err, data) => {
    err ? console.error(err) : console.log(`Your data updated, the age of  ${data.name} is  ${data.age} ans`)
})
//findOne and remove
Person.findByIdAndRemove("600c1352a09c8a0bd08a0fc7", (err, data) => {
    err ? console.error(err) : console.log(`${data._id}  ' is removed`)

})

//Delete Many persons with model.remove()

Person.remove({ name: "Ahmed" }, (err) => {
    err ? console.log(err) : console.log('All document with name Ahmed are removed')
})

//Find people who like sushi

Person.find({ favoriteFoods: "sushi" }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
    err ? console.error(err) : console.log(data)
});