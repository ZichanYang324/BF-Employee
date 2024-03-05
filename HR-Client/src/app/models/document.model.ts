export interface Document {
    _id: string;
    URL: string;
    S3Bucket: string;
    S3Name: string;
    type: string;
    status: string;
    owner: {
        _id: string;
        name: string; // Legal full name
        workAuthorization: {
          title: string;
          startDate: Date;
          endDate: Date;
          // Additional fields as necessary
        };
      };    feedback: string;
    __v: number;
  }