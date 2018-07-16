export default {
  mongoose: {
    uri: "mongodb://localhost/number-p",
    options: {
      server: {
        socketOption: {
          keepAlive: 1,
        },
        pollSize: 5,
      },
      timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      },
    },
  },
};
