module.exports = {
  async up(db) {
    // Add a 'role' field to all existing users with a default value
    await db.collection("users").updateMany({}, { $set: { role: "user" } });
  },

  async down(db) {
    // Remove the 'role' field from all users
    await db.collection("users").updateMany({}, { $unset: { role: "" } });
  },
};
