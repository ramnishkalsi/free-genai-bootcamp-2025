import sqlite3
import json
import os

def load_json(filepath):
    with open(filepath, 'r') as file:
        return json.load(file)

def import_data():
    # Create db directory if it doesn't exist
    if not os.path.exists('db'):
        os.makedirs('db')

    # Connect to database
    conn = sqlite3.connect('db/app.db')
    cursor = conn.cursor()
    
    try:
        # Import verbs
        verbs = load_json('seed/data_verbs.json')
        
        # Create Core Verbs group
        cursor.execute('INSERT INTO groups (name) VALUES (?)', ('Core Verbs',))
        verbs_group_id = cursor.lastrowid
        
        # Import each verb
        for verb in verbs:
            cursor.execute('''
                INSERT INTO words (kanji, romaji, english, parts)
                VALUES (?, ?, ?, ?)
            ''', (verb['kanji'], verb['romaji'], verb['english'], json.dumps(verb['parts'])))
            
            word_id = cursor.lastrowid
            
            # Create word-group association
            cursor.execute('''
                INSERT INTO word_groups (word_id, group_id)
                VALUES (?, ?)
            ''', (word_id, verbs_group_id))
        
        # Update group word count
        cursor.execute('''
            UPDATE groups 
            SET words_count = (
                SELECT COUNT(*) FROM word_groups 
                WHERE group_id = ?
            )
            WHERE id = ?
        ''', (verbs_group_id, verbs_group_id))
        
        # Import adjectives
        adjectives = load_json('seed/data_adjectives.json')
        
        # Create Core Adjectives group
        cursor.execute('INSERT INTO groups (name) VALUES (?)', ('Core Adjectives',))
        adj_group_id = cursor.lastrowid
        
        # Import each adjective
        for adj in adjectives:
            cursor.execute('''
                INSERT INTO words (kanji, romaji, english, parts)
                VALUES (?, ?, ?, ?)
            ''', (adj['kanji'], adj['romaji'], adj['english'], json.dumps(adj['parts'])))
            
            word_id = cursor.lastrowid
            
            # Create word-group association
            cursor.execute('''
                INSERT INTO word_groups (word_id, group_id)
                VALUES (?, ?)
            ''', (word_id, adj_group_id))
        
        # Update group word count
        cursor.execute('''
            UPDATE groups 
            SET words_count = (
                SELECT COUNT(*) FROM word_groups 
                WHERE group_id = ?
            )
            WHERE id = ?
        ''', (adj_group_id, adj_group_id))
        
        # Import study activities
        activities = load_json('seed/study_activities.json')
        for activity in activities:
            cursor.execute('''
                INSERT INTO study_activities (name, url, preview_url)
                VALUES (?, ?, ?)
            ''', (activity['name'], activity['url'], activity['preview_url']))
        
        conn.commit()
        print("Data imported successfully!")
        
    except Exception as e:
        conn.rollback()
        print(f"Error importing data: {str(e)}")
        
    finally:
        conn.close()

if __name__ == '__main__':
    import_data() 