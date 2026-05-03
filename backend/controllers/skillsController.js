const Skills = require("../model/SkillsModel") 

const addSkills = async (req, res) => {
    try{
        const {skill_name,is_major,icon} = req.body();
       if (!skill_name || !icon){
            return res.status(400).json({ 
                success: false, 
                message: "skill name and icon is required" 
            });
        }

        const newSkills = await Skills.create({
                skills_name: skill_name,
                is_major_skill: is_major,
                skill_icon: icon
        });
        res.status(201).json({
            success: true,
            message: `${skill_name} added successfully.`,
            data: newSkills
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to add skills",
            error: error.message
        });
    }

};

const deleteSkill = async (req, res) => {
    console.log("Delete skill request received");
};

const updateSkill = async (req, res) => {
    console.log("Update skill request received");
};

const getSkills = async (req, res) => {
    try{
        const skillData = await Skills.find({});
        res.status(200).json(
            {
                success:true,
                count : skillData.length,
                data: skillData
            }
        )

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to fetch the skills"
        })
    }
};

module.exports = {
    addSkills,
    deleteSkill,
    updateSkill,
    getSkills
};