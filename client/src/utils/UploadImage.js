import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'


const uploadImage = async(image)=>{
    try {
        const formData = new FormData()
        formData.append('image',image)

        const response = await Axios({
            ...SummaryApi.uploadImage,
            data : formData
        })
//            const response = await Axios({
//     url: "http://localhost:8080/api/file/upload",
//     method: "post",
//     data: data
//   })


        return response
    } catch (error) {
        return error
    }
}

export default uploadImage