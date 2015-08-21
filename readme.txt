NodeJS Template

1. Installed Libraries
	Mongoose -- MongoDB driver for Schemas/Models
	Compression -- Gzip compression of server content
	Node UUID - Generate global IDs
	Bower - Client library manager
	Sendgrid - Email client


2. Middleware
	EnableCORS -- Allow cross-browser requests

3. Templating 
	EJS -- Embedded Javascript (in the /views directory)
	HTML -- HTML files can be placed in the /public directory

4. App.js
	Main application file 

5. Default port configuration
	Default is 3000. But also reads server.address().port in case port is different. 
	This is best setup for Elastic Beanstalk. 
	Run application at http://localhost:3000

6. Run application
	npm install
	bower install
	nodemon app.js (if required, npm install -g nodemon)
