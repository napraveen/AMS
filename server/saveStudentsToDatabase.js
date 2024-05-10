const {
  IECE2023A,
  IECE2023B,
  IECE2023C,
  IIECE2022A,
  IIECE2022B,
  IIECE2022C,
  IIIECE2021A,
  IIIECE2021B,
  IIIECE2021C,
  IVECE2020A,
  IVECE2020B,
  IVECE2020C,
} = require('./db');

const saveStudentsToDatabase = async (
  modelName,
  department,
  year,
  section,
  batch
) => {
  try {
    const studentsData = [
      {
        department,
        name: 'ABC D',
        section,
        rollNo: '21AB123',
        registerNo: '1234567890',
        mobileNo: '1234567890',
        year,
        departmentId: 'ECE' + 'B',
        batch,
      },
      {
        department,
        name: 'xyz a',
        section,
        rollNo: '21AB123',
        registerNo: '1234567891',
        mobileNo: '1234567890',
        year,
        departmentId: 'ECE' + 'B',
        batch,
      },
      {
        department,
        name: 'mno p',
        section,
        rollNo: '21AB123',
        registerNo: '1234567892',
        mobileNo: '1234567890',
        year,
        departmentId: 'ECE' + 'B',
        batch,
      },
      {
        department,
        name: 'qrs t',
        section,
        rollNo: '21AB123',
        registerNo: '1234567893',
        mobileNo: '1234567890',
        year,
        departmentId: 'ECE' + 'B',
        batch,
      },
      {
        department,
        name: 'uvw x',
        section,
        rollNo: '21AB123',
        registerNo: '1234567894',
        mobileNo: '1234567890',
        year,
        departmentId: 'ECE' + 'B',
        batch,
      },

      {
        department,
        name: 'EFG H',
        section,
        rollNo: '21CD123',
        registerNo: '1234567895',
        mobileNo: '1234567891',
        year,
        departmentId: 'ECE' + 'B',
        batch,
      },
    ];

    // Save data to different collections using different models
    const Model = eval(modelName); // Use eval to dynamically get the model based on the model name
    await Model.create(studentsData);

    console.log('Students saved successfully.');
  } catch (error) {
    console.error('Error saving Students:', error);
  }
};

saveStudentsToDatabase('IECE2023A', 'ECE', '1', 'A', '2023');
saveStudentsToDatabase('IECE2023B', 'ECE', '1', 'B', '2023');
saveStudentsToDatabase('IECE2023C', 'ECE', '1', 'C', '2023');
saveStudentsToDatabase('IIECE2022A', 'ECE', '2', 'A', '2022');
saveStudentsToDatabase('IIECE2022B', 'ECE', '2', 'B', '2022');
saveStudentsToDatabase('IIECE2022C', 'ECE', '2', 'C', '2022');
saveStudentsToDatabase('IIIECE2021A', 'ECE', '3', 'A', '2021');
saveStudentsToDatabase('IIIECE2021B', 'ECE', '3', 'B', '2021');
saveStudentsToDatabase('IIIECE2021C', 'ECE', '3', 'C', '2021');
saveStudentsToDatabase('IVECE2020A', 'ECE', '4', 'A', '2020');
saveStudentsToDatabase('IVECE2020B', 'ECE', '4', 'B', '2020');
saveStudentsToDatabase('IVECE2020C', 'ECE', '4', 'C', '2020');

module.exports = saveStudentsToDatabase;
