const mongoose = require('mongoose');
try{
    mongoose.connect('mongodb+srv://tejasparmar3401:tejas3401@chocolate.ipwnrp8.mongodb.net/?retryWrites=true&w=majority&appName=chocolate');
}catch(error){   
    console.log(error.massage);
}

