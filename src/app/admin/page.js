// pages/admin.js

const AdminPage = () => {
 

  return (
    <div>
      <h1>Admin Page</h1>
      <form >
        <div>
          <label htmlFor="teamA">Team A:</label>
          <input
            type="text"
            id="teamA"
            name="teamA"
         
          />
        </div>
        <div>
          <label htmlFor="teamB">Team B:</label>
          <input
            type="text"
            id="teamB"
            name="teamB"
          
          />
        </div>
        {/* Add more form fields for match details */}
        <button type="submit">Add Match</button>
      </form>
    </div>
  );
};

export default AdminPage;
