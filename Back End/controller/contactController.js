import asyncHandler from "express-async-handler";
import contactModel from "../models/contactModel.js";
import {addContactFun, getContactFun , editContactFun, deleteContactFun} from "../services/contactService.js";


const addContact = asyncHandler(async (req, res) => {
  const newContact = req.body;
  console.log(newContact);
  const createdContact = await addContactFun(newContact)
  res
    .status(201)
    .json({ message: "New Contact added", contact: createdContact });
});

const getContacts = asyncHandler(async (req, res) => {
  console.log(req.query)
  let search = req.query.search?String(req.query.search) : '';
  let limit = parseInt(req.query.limit);
  let page = parseInt(req.query.page);
  let skip = (page-1)*limit;
  console.log("skip", skip,"limit", limit);
  

  const contacts = await getContactFun(limit, search , skip)
  // const searchString = search? {
  //   $or: [
  //     { name: { $regex: search, $options: "i" } },
  //     { email: { $regex: search, $options: "i" } },
  //     { phone: { $regex: search } }, 
  //   ],  
  // } : {}
  // const contacts = await contactModel.aggregate([ 
  //   {  
  //     $match: searchString 
  //   },
  //   {
  //     $facet: { 
  //         count: [{$count: "count"}],
  //         data: [
  //           { $skip: skip },
  //           { $sort: { name: 1 } },
  //           { $limit: limit },
  //         ],
  //       },
  //     }
  // ]);
//   console.log(
//     {contacts:contacts[0].data,
//       page: page,
//       limit: limit,
//       search : search,
//       count :  contacts[0].count[0]?.count || 0  ,
//       totalPages: Math.ceil(contacts[0].count[0]?.count / limit || 0),
//       startIndex : (page-1)* limit
// }

//   );
  
 
  res.json({contacts:contacts[0].data,
           page: page,
           limit: limit,
           search : search,
           count : contacts[0].count[0]?.count || 0 ,
           totalPages: Math.ceil(contacts[0].count[0]?.count / limit || 0),
           startIndex : (page-1)* limit
  });
});

const editContact = asyncHandler(async (req, res) => {
  const Contact = await contactModel.findById(req.params.id);

  if (!Contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  const updatedContact = await editContactFun( req.params.id,  req.body )
 
  res.status(201).json({ message: "Contact updated", contact: updatedContact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const deletedContact = await deleteContactFun(req.params.id)
  res.status(200).json({ message: "Contact deleted", deletedContact });
});

export { addContact, getContacts, editContact, deleteContact };
 

