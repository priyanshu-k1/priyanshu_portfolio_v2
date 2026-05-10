const Skills = require("../model/SkillsModel")

const addSkills = async (req, res) => {
    try {
        const { skill_name, is_major, sub_skills, icon } = req.body;

        if (!skill_name || !icon || !icon.icon_url) {
            return res.status(400).json({
                success: false,
                message: "skill_name and icon.icon_url are required"
            });
        }

        const newSkill = await Skills.create({
            skills_name: skill_name,
            is_major_skill: is_major ?? false,
            sub_skills: sub_skills ?? [],
            skill_icon: {
                icon_url: icon.icon_url,
                is_monochrome: icon.is_monochrome ?? false,
            },
        });

        res.status(201).json({
            success: true,
            message: `${skill_name} added successfully.`,
            data: newSkill
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add skill",
            error: error.message
        });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Skills.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Skill not found" });
        }
        res.status(200).json({ success: true, message: "Skill deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete skill", error: error.message });
    }
};

const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { skill_name, is_major, sub_skills, icon } = req.body;

        const updateFields = {};
        if (skill_name !== undefined) updateFields.skills_name = skill_name;
        if (is_major !== undefined) updateFields.is_major_skill = is_major;
        if (sub_skills !== undefined) updateFields.sub_skills = sub_skills;
        if (icon !== undefined) updateFields.skill_icon = icon;

        const updated = await Skills.findByIdAndUpdate(id, updateFields, { new: true,runValidators: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Skill not found" });
        }
        res.status(200).json({ success: true, message: "Skill updated successfully", data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update skill", error: error.message });
    }
};

const getSkills = async (req, res) => {
    try {
        const skillData = await Skills.find({});
        res.status(200).json({
            success: true,
            count: skillData.length,
            data: skillData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch skills",
            error: error.message
        });
    }
};

module.exports = { addSkills, deleteSkill, updateSkill, getSkills };