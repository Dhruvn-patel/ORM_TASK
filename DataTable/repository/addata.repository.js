const db=require('../models');
const { User, Employee, Photo } = db;

const addDataFunction=async({firstName,lastName,email,position,office,startDate,salary,Name,url})=>{
    return await User.bulkCreate(    
        [
          {
            firstName,
            lastName,
            email,
            Photos: [
              {
                    Name,
                    url,
              },
                ],
                Employee: {
                    position,office,startDate,salary
            }
          },
        ],
        {
          include: [Photo,Employee],
        }
      );

}

module.exports={addDataFunction}