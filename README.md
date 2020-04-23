# Comp 307 Final Project: Marketplace Project

Marie Cornellier, 260805212\
Ruth Silcoff, 260773460


## About our marketplace:
Debate Academy is a website where individual users can sign up as a student or as a teacher. Teachers are able to register for various subjects that they have experience in, add availabilities for classes, set their class sizes, and upload note sets to sell. Students are able to create a profile, purchase classes and note sets, and rate their teachers.There is also a built in messenger for teachers and students to interact.

# Build Setup

## Get the Backend Requirements
* First make sure you have python 3.7, django, and redis
* Create a venv
* Set the venv as the project interpreter
### Install the requirements in the venv:
```
source venv/bin/activate
pip install -r requirements.txt
```

## Get Node Modules
```
cd frontend
npm install
```

### Compiles and hot-reloads for development
```
# In the frontend folder
npm run serve
```

## Run django server
```
# In the root folder
python3 manage.py runserver 8707
```

## Optional: Reset the django database
* Delete the db.sqlite3 file from the root folder
* Create a new one:
```
python3 manage.py migrate
```

## Minimum Project Requirements:
Requirement | How we meet it 
--- | --- 
Control panel that allows users to list products to sell. A listed product should include at least a photo, a name, a description, a price and an inventory count. Users should be able to add, update and delete product listings.  | In the case of Debate Academy, the product you are selling is you as a teacher, your classes, and your note sets. We allow teachers to edit their profile with a photo, name, biography, hourly rate, and subjects taught. They then create available courses with class sizes (this is the inventory count). When a class is booked, teachers can confirm or reject a request, giving them a final say on that product listing. Teachers can also update their product listing by editing their current availability, and they can close enrollment in courses to make them no longer available for students to sign up (“deleting the listing”). Teachers can also add and delete note sets that they have published. 
Allow users to browse products, add products to cart, view total price of the cart, input shipping address, and finish check out. Upon check out, product inventory count must be updated, and users must not be allowed to purchase items that are out of stock. | Students are able to browse the various courses on Debate Academy, and request to take them (this is like “add to cart” since we wanted teachers to be able to confirm). A class is officially “checked out” when it is confirmed by a teacher, and at that point the enrollment count is updated. When a class is full (out of stock) it is no longer available for students to register. Until a lesson is confirmed (checked out), students are able to cancel their pending lesson request. Students also have a tab of “lessons requested” to see their current “cart.”
Users should be able to see their order history, which includes the products that have been purchased. | Students get invoices from classes they register for, providing them a history of products. This also contains the teacher, payment information, and cost of classes.
The basic requirements of all 3 topic rely on user authentication. For all 3 topics, you need to allow users to create accounts, log in, and log out. | Sign up / sign in page, with password security
Use WebSocket to allow buyers to chat with sellers in real time. It’s up to you how you want to implement this. One approach is to have a chat room for each seller, which anyone can join. | We have a messenger feature for students and teachers to interact. There is a pop up mini messenger that can be used on any page of the website, and a full page messenger app.

## Self Study
* Vue: This gave us a reactive framework. We were able to instantly update data on a page and within the database at once. 
* Vuex: This was helped in having data and various attributes accessible on various pages throughout the site, as well as re-usable functions, used by websocket functions as well to update and store information
* Vuetify: This was the main CSS framework on our site. We used a color scheme throughout which can be easily adjusted, and a dark theme available on all pages that is remembered in local storage. We also used vuetify icons throughout the site for calendar, messenger, etc.
* Vue Router: Allows us to remember history of pages despite the website being a one-page application, we can also pass props to the path, so that users can easily share their profile with others since the username is in the url

## Features
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
    * Sign up for classes
    * Receive invoice
    * Review teachers
* Subjects
    * Displays teachers, notesets, and upcoming lessons for each subject
* Instant chat
    * Send messages directly from profile page, or search for them
    * Chat bubbles at bottom of the screen
    * Messenger page to view all chats in fullscreen


