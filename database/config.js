const mongoose = require('mongoose')

const dcConnection = async () => {

    try {
       await mongoose.connect(process.env.DB_CNN);
        console.log('DB online')
    }catch (error) {
        console.log(error)
        throw new Error('Error al ingresar a la DB')
    }

}

module.exports = {
    dcConnection
}