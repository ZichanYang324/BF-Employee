const mongoose = require('mongoose');


const housingSchema = new mongoose.Schema({
    houseID: mongoose.Schema.Types.ObjectId,
    address: String,
    landlordInfo: {
      name: String,
      contact: String,
    },
    facilityDetails: {
      beds: Number,
      mattresses: Number,
      tables: Number,
      chairs: Number,
    },
    reports: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FacilityReport'
    }],
    assignedEmployees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmployeeProfile'
    }]
  });

  export default mongoose.model('Housing', housingSchema);