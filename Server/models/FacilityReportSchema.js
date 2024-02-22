const mongoose = require('mongoose');

const facilityReportSchema = new mongoose.Schema({
    reportID: mongoose.Schema.Types.ObjectId,
    houseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Housing',
      required: true
    },
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'],
      required: true
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  });

  export default mongoose.model('FacilityReport', facilityReportSchema);