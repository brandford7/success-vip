module.exports = {
  async up(db) {
    // Add 'customerCode' and 'customerId' fields to users who don't have them
    await db.collection("users").updateMany(
      {
        $or: [
          { customerCode: { $exists: false } }, // Users without 'customerCode'
          { customerId: { $exists: false } }, // Users without 'customerId'
        ],
      },
      {
        $set: {
          customerCode: null, // Initialize 'customerCode' as null
          customerId: null, // Initialize 'customerId' as null
        },
      }
    );
  },

  async down(db) {
    // Remove the 'customerCode' and 'customerId' fields from all users
    await db.collection("users").updateMany(
      {},
      {
        $unset: {
          customerCode: "", // Remove 'customerCode'
          customerId: "", // Remove 'customerId'
        },
      }
    );
  },
};
