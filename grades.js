
/* NOTE: here if input file .csv has data in format as studentId(or with our request if it finds studentId from schema) only then response is sent properly,*/
var Grades = require('./DBmodel/grades')

module.exports = function grades(req,res){
	id=req.params.id
	console.log(id)
	Grades.find({studentId:id},(error,result)=>{
		if (error) console.log(error)
        res.send(result) 
	})
}
