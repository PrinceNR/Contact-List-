import  contactModel  from '../models/contactModel.js'


const addContactFun = async (data) => {
    console.log(data);
    
    const newContact = await contactModel.create(data)
    return newContact
}; 

const getContactFun = async (limit, search, skip) => {
    const searchString = search? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search } }, 
        ],  
      } : {}
      const contacts = await contactModel.aggregate([ 
        {  
          $match: searchString 
        },
        {
          $facet: {
              count: [{$count: "count"}],
              data: [
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit },
              ],
            },
          }
      ]);

      return contacts;

}
const editContactFun = async (id , body) => {
     return  await contactModel.findByIdAndUpdate(
        id, body, { new: true }
      );
       
}
 const deleteContactFun = async (id) => {
    return await contactModel.findByIdAndDelete(id);
     
}

export {addContactFun, getContactFun, editContactFun, deleteContactFun}   