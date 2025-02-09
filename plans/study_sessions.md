# Plan for Implementing the `/study_sessions` POST Route

## Overview
We need to implement the `POST /api/study-sessions` endpoint that will allow users to create new study sessions. The route will receive the necessary data for the session and store it in the database.

---

### Steps

#### 1. **Understand the Data Model**
   - ✅ Study Sessions are stored in the `study_sessions` table.
   - ✅ You should look at the schema of the `study_sessions` table to know which fields are required to create a new session (e.g., `group_id`, `study_activity_id`, `created_at`).
   - ✅ You should also be aware of the foreign key relationships with other tables (`groups`, `study_activities`).

#### 2. **Add the `/study_sessions` POST Route**
   - ✅ Define a new route in the `load` function: `@app.route('/api/study-sessions', methods=['POST'])`.
   - ✅ This route will be responsible for accepting the session data in the request body, validating it, and saving it to the database.

#### 3. **Extract Data from the Request**
   - ✅ Use `request.json` to extract the data from the body of the `POST` request.
   - ✅ Extract required fields: `group_id`, `study_activity_id`, and any optional fields like `created_at`.

#### 4. **Validate the Incoming Data**
   - ✅ Check that the necessary fields (`group_id`, `study_activity_id`) are provided.
   - ✅ Ensure that `group_id` and `study_activity_id` are valid and exist in the `groups` and `study_activities` tables.
   - ✅ If any validation fails, return a 400 status code with a descriptive error message.

#### 5. **Insert Data into the Database**
   - ✅ After validating the data, insert a new record into the `study_sessions` table.
   - ✅ If the `created_at` field is not provided, set it to the current timestamp using `datetime.now()`.

#### 6. **Return a Response**
   - ✅ Once the session is successfully created, return a 201 status code along with the details of the newly created session.
   - ✅ Include the session's `id`, `group_id`, `activity_id`, `start_time`, and any other relevant data in the response.

#### 7. **Handle Errors**
   - ✅ If any error occurs during the insertion, catch the exception and return a 500 status code with a descriptive error message.

---

### Example Code Implementation

```python
@app.route('/api/study-sessions', methods=['POST'])
@cross_origin()
def create_study_session():
    try:
        # Step 1: Extract the data from the request
        data = request.get_json()
        group_id = data.get('group_id')
        study_activity_id = data.get('study_activity_id')
        created_at = data.get('created_at', datetime.now())

        # Step 2: Validate the data
        if not group_id or not study_activity_id:
            return jsonify({"error": "group_id and study_activity_id are required"}), 400

        # Ensure group exists
        cursor = app.db.cursor()
        cursor.execute('SELECT id FROM groups WHERE id = ?', (group_id,))
        if not cursor.fetchone():
            return jsonify({"error": f"Group with id {group_id} not found"}), 404
        
        # Ensure activity exists
        cursor.execute('SELECT id FROM study_activities WHERE id = ?', (study_activity_id,))
        if not cursor.fetchone():
            return jsonify({"error": f"Activity with id {study_activity_id} not found"}), 404

        # Step 3: Insert the new study session
        cursor.execute('''
            INSERT INTO study_sessions (group_id, study_activity
