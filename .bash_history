node app.js
cd v2
node app.js
clear
node app.js
touch models/events.js
cd v2
touch models/events.js
touch views/editEvent.ejs
touch views/indexEvent.ejs
touch views/newEvent.ejs
touch views/showEvent.ejs
node app.js
npm install express-sanitizer --save
npm install method-override --save
cd ..
rm data/mongod.lock 
./mongod 
