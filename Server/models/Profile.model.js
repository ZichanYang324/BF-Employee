import mongoose from 'mongoose';
import constants from '../config/constants';

const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  middleName: {
    type: String
  },
  preferredName: {
    type: String
  },
  gender: {
    type: String,
    enum: constants.gender
  },
  profilePic: {
    type: refType,
    ref: 'Document'
  },
  cellPhone: {
    type: String,
    required: true
  },
  workPhone: {
    type: String
  },
  address: {
    street: {
      type: String,
      required: true
    },
    building: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      enum: constants.state,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    required: true
  },
  car: {
    make: {
      type: String
    },
    model: {
      type: String
    },
    color: {
      type: String
    }
  },
  SSN: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  immigrationStatus: {
    type: String,
    enum: constants.immigrationStatus,
    required: true
  },
  workAuth: {
    title: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    receipt: {
      type: refType,
      ref: 'Document'
    }
  },
  driversLicense: {
    number: {
      type: String,
      required: true
    },
    state: {
      type: String,
      enum: constants.state
    },
    expiration: {
      type: Date
    },
    document: {
      type: refType,
      ref: 'Document'
    }
  },
  reference: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    relationship: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  emergencyContacts: [{
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    relationship: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }]
});

export default mongoose.model('Profile', ProfileSchema);