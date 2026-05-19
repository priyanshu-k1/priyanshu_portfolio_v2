const project = require('../model/ProjectModel')


const fetchProjects = async (req, res)=>{
    try{
        const projectsData = await project.find({});
        res.status(200).json({
            success:true,
            count: projectsData.length,
            data: projectsData
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error: error.message
        })
    }
};

const addProject = async (req, res) => {
    try {
        const { 
            name, description, img_url, is_major, 
            is_featured, tech_stack, project_link 
        } = req.body;
        if (
            !name || 
            !description || 
            !img_url || 
            !tech_stack || 
            !project_link || 
            is_major === undefined || 
            is_featured === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "One or multiple required fields are missing or empty."
            });
        }
        const newProjectData = await project.create({
            project_name: name,
            project_description: description,
            project_url: project_link,
            project_image_url: img_url,
            project_type: {
                is_major_project: is_major,
                is_featured_project: is_featured
            },
            tech_stack: tech_stack,
        });
        return res.status(201).json({
            success: true,
            message: `${name} added successfully to ${is_major ? "major" : "minor"} projects list.`,
            data: newProjectData
        });
    } catch (error) {
        console.error("[addProject Error]:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const updateProject = async (req, res)=>{
    try{
        const { id } = req.params;
        const { name , decription , img_url, is_major ,
             is_featured ,tech_stack,project_link} = req.body;
        const updateFields = {};
        
        if(name!==undefined) updateFields.project_name = name;
        if(decription!==undefined) updateFields.project_description = decription;
        if(img_url!==undefined) updateFields.project_image_url = img_url;
        if(is_major!==undefined) updateFields.is_major_project = is_major;
        if(is_featured!==undefined) updateFields.is_featured_project = is_featured;
        if(tech_stack!==undefined) updateFields.tech_stack = tech_stack;
        if(project_link!==undefined) updateFields.project_url = project_link;

        const updatedProject = await project.findByIdAndUpdate(id,updateFields,{ new: true });
        if(updatedProject){
            res.status(200).json({
                success:true,
                message:"Project updated successfully.",
                data:updatedProject,
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"Could't able to find project.",
            })
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
const deleteProject = async (req, res)=>{
    try{
        const { id } = req.params;

        const deletedProject = await project.findByIdAndDelete(id);
        if(!deletedProject){
            res.status(404).json({
                success:false,
                message:"Project not found!"
            })
        }
        res.status(200).json({ success: true, message: "Project deleted successfully" });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};


module.exports ={
    addProject,
    fetchProjects,
    updateProject,
    deleteProject
}