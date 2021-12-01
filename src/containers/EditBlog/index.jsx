import {React, useState} from "react";
import { CKEditor } from "ckeditor4-react";
import storage from "../../config/firebase/index.js"
import { actionChangeGlobalRedux, actionUpdateArticle,  } from "../../config/redux/action/index.jsx";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";

const EditBlog = (props) => {
    const [tmpFile, setTmpFile] = useState(null)
    const { index} = useParams();
    const history = useHistory()
  const [field, setField] = useState({
    title: props.ownArticle[Number(index)].title,
    description: props.ownArticle[Number(index)].description,
    thumbnail: props.ownArticle[Number(index)].thumbnail,
    category_id: props.ownArticle[Number(index)].category_id,
    created_by: props.ownArticle[Number(index)].created_by,
    id : props.ownArticle[Number(index)].id,
  });
  const handleOnSubmit = (event) => {
    event.preventDefault()
      console.log(field, tmpFile)
      

      const uploadTask = storage.ref(`/images/${tmpFile.name}`).put(tmpFile)
      uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(tmpFile.name).getDownloadURL()
       .then(fireBaseUrl => {
        let tmp = field;
        tmp.thumbnail = fireBaseUrl
        tmp.created_by = props.user.id
        setField(tmp)
        
        props.editBlogProcess(tmp)
        .then((result)=>{
          console.log("sukses")
          alert("Berhasil Mengedit Article")
          history.push("/")
        })
        .catch((err)=>{

        })
       })
    })
  };


  const handleOnChange = (event) => {
    let tmp = field;
    tmp[event.currentTarget.name] = event.currentTarget.value;
    setField(tmp);
  };

  const handleOnChangeCKEditor = (event) => {
      let tmp = field;
      tmp.description = event.editor.getData()
      setField(tmp)
     
  };
  const handleOnChangeFile = (event) => {
    setTmpFile(event.target.files[0])
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}  > 
        <div className="form-group">
          <label htmlFor="formGroupExampleInput mt-3 ">Title</label>
          <input
            type="form-control form-control-lg"
            className="form-control "
            id=""
            name="title"
            placeholder="Enter title"
            onChange={handleOnChange}
            value= {field.title}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleFormControlFile1">Add Thumbnail</label>
          <br />
          <input
            type="file"
            name="thumbnail"
            className="form-control-file mb-3"
            id="exampleFormControlFile1"
            onChange={handleOnChangeFile}
          />
        </div>
        <div>
          <CKEditor onChange={handleOnChangeCKEditor}
            
          />
        </div>
        <select className="form-select mt-3" name="category_id" defaultValue="0" onChange={handleOnChange}>
          <option disabled >Choose Category</option>
          <option value="1">Technology</option>
          <option value="2">Story</option>
          <option value="3">Social</option>
          <option value="5">Traditional</option>
        </select>
        <button type="submit" onSubmit={handleOnSubmit} className="btn btn-primary mt-3 mb-3">
          Edit
        </button>
      </form>
    </div>
  );
};

const reduxState = (state) => ({
  isLogin: state.isLogin,
  user : state.user,
  ownArticle: state.ownArticle,
});
const reduxDispatch = (dispatch) => ({
  changeGlobalRedux: (data) => dispatch(actionChangeGlobalRedux(data)),
  editBlogProcess: (data) => dispatch(actionUpdateArticle(data)),
});

export default connect(reduxState, reduxDispatch) (EditBlog);
