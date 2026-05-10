const contact = require('../model/UserContactModel')


const getContact = async (req,res)=>{
    try{
        const contactData = await contact.find({});
        res.status(201).json({
            success:true,
            length:contactData.length,
            data:contactData,
            message:"Contact details fetched successfully."
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }


};
const addContact = async (req,res)=>{
    try{
        const {number,email,about,facebook,twitter,
            linkedin,instagram,github
        } = req.body;

        if(!number || !email || !about || !facebook || !twitter || 
            !linkedin  || !instagram  || !github){
                res.status(400).json({
                    success:false,
                    message:'one or multiple fields are empty.'
                })
            }

        const contactData = await contact.create({
            phone_number:number,
            email:email,
            about_admin:about,
            social_links:{
                facebook:facebook,
                twitter:twitter,
                linkedin:linkedin,
                instagram:instagram,
                github:github,
            }
            })
            res.status(201).json({
                success:true,
                message:"Contact details added successfully."
            })
        }
   catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    })
   }

};
const editContact = async (req,res)=>{
    try{
        const{id} = req.params;
        const {number,email,about,facebook,twitter,
                linkedin,instagram,github} = req.body;

        console.log({number,email,about,facebook,twitter,
                linkedin,instagram,github} )
        const fieldToUpdate = {};
        if(number!== undefined) fieldToUpdate.phone_number = number;
        if(email!== undefined) fieldToUpdate.email = email;
        if(about!== undefined) fieldToUpdate.about_admin = about;
        if(facebook!== undefined) fieldToUpdate.facebook = facebook;
        if(twitter!== undefined) fieldToUpdate.twitter = twitter;
        if(linkedin!== undefined) fieldToUpdate.linkedin = linkedin;
        if(instagram!== undefined) fieldToUpdate.instagram = instagram;
        if(github!== undefined) fieldToUpdate.github = github;

        const updatedContact = await contact.findByIdAndUpdate(id,fieldToUpdate,{ new: true });
        if(!updatedContact){
            res.status(404).json({
                success:false,
                message:"Cannot update the info"
            })
        }
        res.status(200).json(
            {   success: true,
                message: "contact details updated successfully", 
                data: updatedContact 
            });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

};

module.exports={
    getContact,
    addContact,
    editContact
}
