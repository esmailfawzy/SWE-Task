import DoctorSchema from ""
import SubjectsSchema from ""

export const get_subjects = async (req, res) => {
    const {id} = req.body;
    try {
        const get_doctor = await DoctorSchema.findById(id);
        if (!get_doctor) {
            return res.json({
                msg: "Doctor Not Found"
            }, 400)
        }
         if (get_doctor.role=="Show"){
             const get_data=await  SubjectsSchema.find();
             return res.json({
                data:get_data
             },200);
         }else {
             return res.json({
                 msg:"Access Denied"
             },400);
         }

    } catch (err) {
        return res.json({
            error: err
        }, 500)
    }

}

export const add_pdf=async (req,res)=>{


}