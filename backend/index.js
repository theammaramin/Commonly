import express from "express"
import multer from "multer";
import cors from "cors"
import mysql from "mysql"
import request from 'request';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' , methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin",
    database:"test"
    
})
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.listen(8800, () => {
    console.log("Listening");
})
app.get('/user',(req,res)=>{
    const q="SELECT * FROM user";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    });
});
app.post('/user', (req, res) => {
  // Check if email already exists
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM user WHERE email = ?";
  db.query(checkEmailQuery, [req.body.email], (err, result) => {
      if (err) {
          return res.status(500).json({ error: "Internal server error" });
      }

      const emailExists = result[0].count > 0;
      if (emailExists) {
          return res.status(400).json({ error: "Email already exists" });
      }

      // If email does not exist, proceed with inserting new user
      const insertQuery = "INSERT INTO user (`Name`, `email`, `password`, `ContactInformation`, `type`) VALUES (?, ?, ?, ?, ?)";
      const values = [
          req.body.Name,
          req.body.email,
          req.body.password,
          req.body.ContactInformation,
          req.body.type,
      ];

      db.query(insertQuery, values, (err, data) => {
          if (err) {
              return res.status(500).json({ error: "Failed to insert user" });
          }
          return res.json(data);
      });
  });
});




app.post('/api/getid', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT id FROM user WHERE email = ? AND password = ?';
  const values = [email, password];

  db.query(query, values, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      const userId = results[0].id;

      // Send the id in the response
      return res.json({ id: userId });


  });
});

app.get('/api/college-status/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT colleges.name AS CollegeName, status.ReviewStatus FROM colleges INNER JOIN status ON colleges.id = status.SchoolID WHERE status.UserId = ?';

  db.query(query, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json(data);
  });
});










app.delete("/user/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM user WHERE id = ?";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});


app.put("/user/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE user SET `Name`= ?, `email`= ?,  `password`=?  WHERE id = ?";
  
    const values = [
      req.body.Name,
      req.body.email,
      req.body.password,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    const values = [email, password];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const user = results[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Authentication successful, you may generate and send a token here

       
        return res.json(results);
    });
});
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const q = 'SELECT * FROM user WHERE id = ?';

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const user = data[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  });
});


app.get('/college',(req,res)=>{
  const q="SELECT * FROM colleges";
  db.query(q,(err,data)=>{
      if(err) return res.json(err)
      return res.json(data);
  });
});

app.post('/api/apply',(req,res)=>{
  const q= "INSERT into status (`UserId`, `SchoolID`,`SubmissionDate`,`ReviewStatus`) VALUES (?)";
  const values = [
      req.body.uid,
      req.body.cid,
      req.body.sdate,
      req.body.status,
      
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data); });
});

app.delete('/api/withdraw', (req, res) => {
  const collegeId = req.query.collegeId;
  const userId = req.query.userId;
  const q = 'DELETE FROM status WHERE SchoolID = ? AND UserId = ?';;

  db.query(q, [collegeId,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.post('/student',(req,res)=>{
  const q= "INSERT into student (`UserID`, `DOB`,`gender`) VALUES (?)";
  const values = [
      req.body.userid,
      req.body.DateOfBirth,
      req.body.Gender,
 ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data); });
});

app.post('/grades',(req,res)=>{
  const q= "INSERT into grades (`userID`, `math_grade`,`english_grade`,`urdu_grade`,`Pak_studies_grade`,`islamiat_grade`,`optional_subject1_name`,`optional_subject1_grade`,`optional_subject2_name`,`optional_subject2_grade`,`optional_subject3_name`,`optional_subject3_grade`,`optional_subject4_name`,`optional_subject4_grade`) VALUES (?)";
  const values = [
      req.body.userid,
      req.body.Math,
      req.body.Eng,
      req.body.Pak,
      req.body.Urdu,
      req.body.Isl,
      req.body.Sub1,
      req.body.Sub1Grade,
      req.body.Sub2,
      req.body.Sub2Grade,
      req.body.Sub3,
      req.body.Sub3Grade,
      req.body.Sub4,
      req.body.Sub4Grade,
 ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data); });
});

app.post('/college',(req,res)=>{
  const q= "INSERT into colleges (`userID`,`name`,`area`,`number_of_A`,`number_of_B`,`number_of_C`,`number_of_D`,`number_of_E`,`scholarship`,`extracurricular`,`sport`) VALUES (?)";
  const values = [
      req.body.userid,
      req.body.name,
      req.body.area,
      req.body.nA,
      req.body.nB,
      req.body.nC,
      req.body.nD,
      req.body.nE,
      req.body. scholarship,
      req.body.extracurricular,
      req.body.sport
 ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data); });
});


app.get('/api/college/:id', (req, res) => {
  const userId = req.params.id;
  const q = 'SELECT * FROM colleges WHERE userID = ?';

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const user = data[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  });
});




app.post('/form', (req, res) => {
  const q = "INSERT into questions (`CollegeID`, `QuestionText`) VALUES ?";
  const values = req.body;

  db.query(q, [values], (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(data);
  });
});


app.get('/api/status/:id', (req, res) => {
  const userId = req.params.id;
  console.log('userId:', userId);

  const q = 'SELECT * FROM status WHERE SchoolID = ?';

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Query result:', data);

    if (data.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(data);
  });
});


// fetch grades for each user

app.get('/api/grades/:id', (req, res) => {
  const userId = req.params.id;
  const q = 'SELECT * FROM grades WHERE userID = ?';

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const user = data[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  });
});


app.put("/reviewstatus/:userId/:schoolId", (req, res) => {
  const { userId, schoolId } = req.params;
  const q = "UPDATE status SET `ReviewStatus` = ? WHERE UserId = ? AND SchoolId = ?";

  const values = [
    req.body.ReviewStatus,
    userId,
    schoolId
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


////////////////////////////////TEST CODE/////////////////////////////////////////////////////

app.get('/api/questions', (req, res) => {
  const { collegeIds } = req.query;

  // Assuming collegeIds is a comma-separated string of college IDs
  const collegeIdsArray = collegeIds.split(',');

  // Construct the SQL query to fetch QuestionText based on CollegeID
  const query = 'SELECT QuestionID, CollegeID,QuestionText FROM questions WHERE CollegeID IN (?)';
  db.query(query, [collegeIdsArray], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(results);
  });
});



// Endpoint to insert answers into the answers table
app.post('/api/answers', (req, res) => {
  const { UserId, QuestionID, AnswerText, CollegeID } = req.body;

  // Construct the SQL query to insert the answer into the answers table
  const query = 'INSERT INTO answers (UserId, QuestionID, AnswerText, CollegeID) VALUES (?, ?, ?, ?)';
  const values = [UserId, QuestionID, AnswerText, CollegeID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json({ success: true, message: 'Answer inserted successfully' });
  });
});

app.get('/api/answers', (req, res) => {
  const { CollegeID, UserID } = req.query;

  // Construct the SQL query to fetch answers based on CollegeID and UserID
  const query = 'SELECT * FROM answers WHERE CollegeID = ? AND UserID = ?';
  const values = [CollegeID, UserID];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(results);
  });
});


/////////////////////////////////OCR//////////////////////////////////////////////////////


app.post('/api/ocr', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const form_data = {
    file: {
      value: req.file.buffer,
      options: {
        filename: req.file.originalname,
        contentType: req.file.mimetype
      }
    }
  };

  const options = {
    url: "https://app.nanonets.com/api/v2/OCR/Model/ee02aa34-9377-4f3e-98d2-42ad728d6c01/LabelFile/?async=false",
    formData: form_data,
    headers: {
      'Authorization': 'Basic ' + Buffer.from('5da15ee6-0655-11ef-91ff-1a54109542be' + ':').toString('base64')
    }
  };

  request.post(options, function (err, httpResponse, body) {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const responseBody = JSON.parse(body);
    const ocrTextName = responseBody.result[0].prediction.find(item => item.label === 'Name').ocr_text;
    console.log('Name:', ocrTextName);
    
    // Extract and log both ocr_text values
    responseBody.result[0].prediction.forEach(item => {
      if (item.label === 'Subjects') {
        console.log('Subjects:', item.ocr_text);
      } else if (item.label === 'Grades') {
        console.log('Grades:', item.ocr_text);
      }
    });
    
    // Send the original response back to the client
    return res.json(responseBody);
  });
});

///////////////////////////////////////////////////////////////////////

app.get('/api/managequestion/:id', (req, res) => {
  const CollegeID = req.params.id;
  const q = 'SELECT * FROM questions WHERE CollegeID = ?';

  db.query(q, [CollegeID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'No questions found for this CollegeID' });
    }
   

    return res.json(data);
  });
});

/////////////////////// 

// Endpoint to fetch school IDs associated with a user ID
app.get('/api/status/:userId/schoolIds', (req, res) => {
  const userId = req.params.userId;

  // Query to fetch schoolIds based on userId from the status table
  const query = 'SELECT SchoolID FROM status WHERE UserId = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if no schoolIds found for the given userId
    if (results.length === 0) {
      return res.status(404).json({ error: 'No schoolIds found for this userId' });
    }

    // Extract schoolIds from the results
    const schoolIds = results.map(result => result.SchoolID);

    // Send the schoolIds in the response
    return res.json({ schoolIds });
  });
});






// Add this route handler in your backend code

app.post('/api/ocr-data', (req, res) => {
  try {
    const { subjects, grades, name, userId } = req.body;

    // Validate data (optional)
    if (!subjects || !grades || !name || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Construct an array of values for each row to be inserted
    const values = subjects.map((subject, index) => [subject, grades[index], name, userId]);

    // Insert OCR data into the database
    const insertQuery = 'INSERT INTO ocr (subject, grade, name, userID) VALUES ?';

    db.query(insertQuery, [values], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to insert OCR data into the database' });
      }

      return res.json({ success: true, message: 'OCR data inserted successfully' });
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Backend API endpoint to fetch OCR data based on userID
app.get('/api/ocrf/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM ocr WHERE userID = ?';

  db.query(query, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json(data);
  });
});

