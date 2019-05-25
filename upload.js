// ****it is configured for file uploading functionality
const csv = require('fast-csv')
const fs = require('fs')/* node js file system*/
const Grades = require('./DBmodel/grades')
/*1.we require formidable for incomming form*/
const IncomingForm = require('formidable').IncomingForm;
/*2.we need a callback function for uploading(/upload in server.js) , so we export here*/
// 'req' object stores info about request made 
 //'res' object can be used by us to send responses 
module.exports = function upload(req, res) {
	var form = new IncomingForm();
	/*we now register call backs on the form*/
	/*we parse input fields and uploaded file here*/
	/* NOTE: The uploaded file is stored somewhere in our computer
	we copy it from there using node.js file-system API
	*/
	form.parse(req,function(err,fields,FILE){
		/*here we read file*/
		var stream = fs.createReadStream(FILE["file"].path);

		/*next we need to write the file into MONGO Db 
		so we use concept of piping to perform write operation i.e stream.pipe(csvStream)*/

var csvStream = csv().on("data",function(data){
	  Grades.findOne({courseId:fields["courseId"],studentId:data[0]}, (err, result)=>{
            if (err) console.log(err)
            if(result){
                /* we can update mentor also here*/
                result.grade = data[2]
                result.save((error, results)=>{
                    if(error) console.log(error)
                    else console.log(results)

                })
            }else{
                /* if new form comes all fields are updated here*/
                grade = new Grades({courseId:fields["courseId"],studentId:data[0],mentor:data[1], grade:data[2] })
                grade.save((e, result)=>{
                if(e) console.log(e)
                console.log(result)
         })
            }
        })
})
.on("end",function(){
	console.log("done");
});
stream.pipe(csvStream);

});
	res.end();

};