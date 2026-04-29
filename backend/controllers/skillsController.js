const addSkills = async (req, res) => {
    console.log("Add skill request received");
    res.status(200).json({ message: "Skill added" }); 
};

const deleteSkill = async (req, res) => {
    console.log("Delete skill request received");
};

const updateSkill = async (req, res) => {
    console.log("Update skill request received");
};

const getSkills = async (req, res) => {
    console.log("Get skills request received");
};

module.exports = {
    addSkills,
    deleteSkill,
    updateSkill,
    getSkills
};