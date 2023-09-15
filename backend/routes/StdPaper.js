const express = require("express");
const router = express.Router();
const { StdPaper, Student, Sequelize } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken, async (req, res) => {
    const stdPaperList = await StdPaper.findAll();
    res.json(stdPaperList);
});

/* router.get("/:paperId", validateToken, async (req, res) => {
    try {
        const paperId = req.params.paperId; // Get the paperId from the URL parameter

        const studentIds = await StdPaper.findAll({
            attributes: ['studentId'],
            where: { paperId },
        });

        // Extract the studentIds from the result and create an array
        const studentIdList = studentIds.map(student => student.studentId);

        res.json(studentIdList);
    } catch (error) {
        console.error('Error fetching student IDs for paperId:', error);
        res.status(500).json({ error: 'An error occurred while fetching student IDs for paperId' });
    }
}); */

router.get("/", validateToken, async (req, res) => {
    const studentList = await Student.findAll();
    res.json(studentList);
});


/* router.get("/studentCount", validateToken, async (req, res) => {
    try {
        const studentCounts = await StdPaper.findAll({
            attributes: ['paperId', [Sequelize.fn('COUNT', Sequelize.col('studentId')), 'studentCount']],
            group: ['paperId'],
        });

        res.json(studentCounts);
    } catch (error) {
        console.error('Error fetching student counts by paperId:', error);
        res.status(500).json({ error: 'An error occurred while fetching student counts by paperId' });
    }
}); */

router.get("/studentCount/:paperId", validateToken, async (req, res) => {
    try {
        const paperId = req.params.paperId; // Get the paperId from the URL parameter

        const studentCount = await StdPaper.count({
            where: { paperId }, // Count records where paperId matches
        });

        res.json({ paperId, studentCount });
    } catch (error) {
        console.error('Error fetching student count by paperId:', error);
        res.status(500).json({ error: 'An error occurred while fetching student count by paperId' });
    }
});




router.post("/", validateToken, async (req, res) => {

    const { paperId } = req.body;
    console.log(paperId);

    try {
        const studentNIC = req.user; // Assuming req.user contains the student's NIC
        console.log(studentNIC);

        const student = await Student.findOne({ where: { nic: studentNIC } });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const studentId = student.id;
        console.log(studentId);

        // Check if the record already exists
        const existingRecord = await StdPaper.findOne({ where: { studentId, paperId } });

        if (existingRecord) {
            // A record with the same studentId and paperId already exists
            return res.status(400).json({ error: 'Record already exists' });
        }

        const stdPaper = req.body;

        stdPaper.studentId = studentId;

        await StdPaper.create(stdPaper);

        res.json('success');


    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ error: 'An error occurred while submitting the answer' });
    }

});

router.put("/:paperId", validateToken, async (req, res) => {
    const { paperId } = req.body;
  
    try {
      const studentNIC = req.user; // Assuming req.user contains the student's NIC
      const student = await Student.findOne({ where: { nic: studentNIC } });
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const studentId = student.id;
  
      // Check if the record already exists
      const existingRecord = await StdPaper.findOne({ where: { studentId, paperId } });
  
      if (!existingRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      // Update the record with the new data
      const updatedRecord = req.body;
  
      await StdPaper.update(updatedRecord, { where: { studentId, paperId } });
  
      res.json('success');
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ error: 'An error occurred while updating the record' });
    }
  });

  router.get("/", validateToken, async (req, res) => {
    try {
        const studentList = await Student.findAll();
        res.json(studentList);
    } catch (error) {
        console.error('Error fetching student list:', error);
        res.status(500).json({ error: 'An error occurred while fetching student list' });
    }
});

router.get("/:paperId", validateToken, async (req, res) => {
    try {
        const paperId = req.params.paperId; // Get the paperId from the URL parameter

        const studentIds = await StdPaper.findAll({
            attributes: ['studentId'],
            where: { paperId },
        });

        // Extract the studentIds from the result and create an array
        const studentIdList = studentIds.map(student => student.studentId);

        // Fetch student names for the retrieved studentIds
        const studentNames = await Student.findAll({
            attributes: ['name'], // Adjust this to match your Student model
            where: {
                id: studentIdList // Filter by the retrieved studentIds
            }
        });

        res.json(studentNames);

    } catch (error) {
        console.error('Error fetching student names for paperId:', error);
        res.status(500).json({ error: 'An error occurred while fetching student names for paperId' });
    }
});

router.get("/status/:paperId", validateToken, async (req, res) => {
    try {
        const paperId = req.params.paperId; // Get the paperId from the URL parameter

        const studentIds = await StdPaper.findAll({
            attributes: ['studentId'],
            where: { paperId },
        });

        // Extract the studentIds from the result and create an array
        const studentIdList = studentIds.map(student => student.studentId);

        // Fetch student names and progressStatus for the retrieved studentIds and paperId
        const studentData = await StdPaper.findAll({
            attributes: ['studentId', 'progressStatus'], // Adjust this to match your StdPaper model
            where: {
                studentId: studentIdList, // Filter by the retrieved studentIds
                paperId : paperId, // Match the paperId
            },
            order: [['studentId', 'ASC']],
        });

        res.json(studentData);

    } catch (error) {
        console.error('Error fetching student data for paperId:', error);
        res.status(500).json({ error: 'An error occurred while fetching student data for paperId' });
    }
});


  

module.exports = router;
