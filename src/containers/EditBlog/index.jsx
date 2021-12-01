import { Component, React, useState } from "react";
import { CKEditor } from "ckeditor4-react";
import storage from "../../config/firebase/index.js";
import {
  actionChangeGlobalRedux,
  actionUpdateArticle,
} from "../../config/redux/action/index.jsx";
import { connect } from "react-redux";

class EditBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        title: "",
        description: "",
        thumbnail: "",
        category_id: "",
        created_by: "",
        id: "",
      },
      isLoading: false,
      tempFile: null,
      categories: [
        { name: "Tecnology", value: 1 },
        { name: "Story", value: 2 },
        { name: "Sosial", value: 3 },
        { name: "Tradisional", value: 5 },
      ],
    };
  }
  componentDidMount() {
    if (this.props.ownArticle.length <= 0) {
      const { history } = this.props;
      history.push("/yourarticle");
    } else {
      let index = Number(this.props.match.params.index);
      let fields = {
        title: this.props.ownArticle[index].title,
        description: this.props.ownArticle[index].description,
        thumbnail: this.props.ownArticle[index].thumbnail,
        category_id: Number(this.props.ownArticle[index].category.id),
        created_by: this.props.ownArticle[index].created_by,
        id: this.props.ownArticle[index].id,
        index: index,
      };
      this.setState((state) => ({
        ...state,
        fields: fields,
      }));
    }
  }
  handleOnChange = (event) => {
    let target = event.currentTarget;
    let fields = this.state.fields;
    fields[target.name] = target.value;
    this.setState((state) => ({
      ...state,
      fields: fields,
    }));
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    if (this.state.tempFile === null) {
      let data = this.state.fields;
      this.props
        .editBlogProcess(data)
        .then((res) => {
          this.setState((state) => ({
            ...state,
            isLoading: true,
          }));
          alert("Succes to update data");
          let { history } = this.props;
          history.push("/yourarticle");
        })
        .catch((err) => {
          this.setState((state) => ({
            ...state,
            isLoading: true,
          }));
        });
    } else {
      const uploadTask = storage
        .ref(`/images/${this.state.tempFile.name}`)
        .put(this.state.tempFile);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          //takes a snap shot of the process as it is happening
        },
        (err) => {
          //catches the errors
          console.log(err);
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .ref("images")
            .child(this.state.tempFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              let data = this.state.fields;
              data.thumbnail = fireBaseUrl;
              this.props
                .editBlogProcess(data)
                .then((res) => {
                  this.setState((state) => ({
                    ...state,
                    isLoading: true,
                  }));
                  alert("Succes to update data");
                  let { history } = this.props;
                  history.push("/yourarticle");
                })
                .catch((err) => {
                  this.setState((state) => ({
                    ...state,
                    isLoading: true,
                  }));
                });
            });
        }
      );
    }
  };
  handleOnChangeFile = (event) => {
    console.log(event.target.files[0]);
    let fileReader = new FileReader();
    this.setState((state) => ({
      ...state,
      tempFile: event.target.files[0],
    }));
    fileReader.onloadend = (data) => {
      let imageP = document.getElementById("preview");
      imageP.src = fileReader.result;
    };
    fileReader.readAsDataURL(event.target.files[0]);
  };
  handleOnChangeCKEditor = (event) => {
    let fields = this.state.fields;
    fields.description = event.editor.getData();
    this.setState((state) => ({
      ...state,
      fields: fields,
    }));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput mt-3 ">Title</label>
            <input
              type="form-control form-control-lg"
              className="form-control "
              id=""
              name="title"
              placeholder="Enter title"
              onChange={this.handleOnChange}
              value={this.state.fields.title}
            />
          </div>
          <img
            id="preview"
            src={this.state.fields.thumbnail}
            alt=""
            className="preview-edit mt-3"
          />
          <div className="form-group mt-3">
            <label htmlFor="exampleFormControlFile1">Add Thumbnail</label>
            <br />
            <input
              type="file"
              name="thumbnail"
              className="form-control-file mb-3"
              id="exampleFormControlFile1"
              onChange={this.handleOnChangeFile}
            />
          </div>
          <div>
            {this.state.fields.description !== "" && (
              <CKEditor
                onChange={this.handleOnChangeCKEditor}
                initData={this.state.fields.description}
              />
            )}
          </div>
          <select
            className="form-select mt-3"
            name="category_id"
            value={this.state.fields.category_id}
            onChange={this.handleOnChange}
          >
            <option disabled>Choose Category</option>
            {this.state.categories.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <button type="submit" className="btn btn-primary mt-3 mb-3">
            {this.state.isLoading ? "Loading ...." : "Edit"}
          </button>
        </form>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLogin: state.isLogin,
  user: state.user,
  ownArticle: state.ownArticle,
});
const reduxDispatch = (dispatch) => ({
  changeGlobalRedux: (data) => dispatch(actionChangeGlobalRedux(data)),
  editBlogProcess: (data) => dispatch(actionUpdateArticle(data)),
});

export default connect(reduxState, reduxDispatch)(EditBlog);
