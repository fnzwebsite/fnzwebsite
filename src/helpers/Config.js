var config = {
 'default': {
   url: 'http://localhost:3000/',
   socketurl: 'http://localhost:3700/',
   ApiUrl:'35.178.56.52',
   fnzUrl:'http://35.178.56.52:8081/api/v1/'
 },
 'default1': {
   url: 'http://ec2-35-178-56-52.eu-west-2.compute.amazonaws.com:3000/',
   socketurl: 'http://ec2-35-178-56-52.eu-west-2.compute.amazonaws.com:3700/',
   ApiUrl:'35.178.56.52'
 }
}

var test = () => {
 return 'test'
}

var objectTest = (response) => {
 response({
   test: 'test'
 })
}

module.exports = { config, test, objectTest }
