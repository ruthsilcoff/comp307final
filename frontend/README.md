# Features
* Teachers
    * Profile bio
        * Price
        * Location
        * Subjects
    * Add availabilities
        * Group classes
        * Calendar
    * Add notesets
        * Works with jpg files
        * Can be edited after to add subjects (courses)
* Students
    * Sign up for courses
* Subjects
    * Displays teachers, notesets, and upcoming lessons for each subject
* Instant chat
    * Send messages directly from profile page, or search for them
    * Chat bubbles at bottom of the screen
    * Messenger page to view all chats in fullscreen

# Build Setup

## Get Requirements
* First make sure you have python 3.7, django, and redis
* Create a venv
```
source venv/bin/activate
pip install -r requirements.txt
```

## Get node modules
```
cd frontend
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Run django server
```
python3 manage.py runserver 8707
```