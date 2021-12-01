import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  actionChangeGlobalRedux,
  actionOwnArticle,
} from "../../config/redux/action";

const OwnArticle = (props) => {
    const history = useHistory()
  useEffect(() => {
    if (props.ownArticle.length <= 0) {
      console.log("call mee");
      props
        .ownArticleProcess({ id: props.user.id })

        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }); 
  const handleOnClickEdit = (event) => {
    let target = event.currentTarget;
    let index = target.getAttribute("data-index");
    history.push('/editblog/'+index)

  };

  return (
    <div>
      <h3>Your Article</h3>
      <div className=" card-article mt-5 mb-5 col-12">
        <div className="row">
          {props.ownArticle.length > 0 &&
            props.ownArticle.map((item, index) => {
              return (
                <div key={index} className="card col-4">
                  <img
                    className="card-img-top"
                    src={item.thumbnail}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <div
                      className="card-text"
                      dangerouslySetInnerHTML={{
                        __html: item.description.split("</p>")[0] + "</p>",
                      }}
                    />
                    <p className="card-text">
                      <button
                        className="btn btn-primary"
                        onClick={handleOnClickEdit}
                        data-index={index}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger">Delete</button>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const reduxState = (state) => ({
  isLogin: state.isLogin,
  user: state.user,
  ownArticle: state.ownArticle,
});
const reduxDispatch = (dispatch) => ({
  changeGlobalRedux: (data) => dispatch(actionChangeGlobalRedux(data)),
  ownArticleProcess: (data) => dispatch(actionOwnArticle(data)),
});

export default connect(reduxState, reduxDispatch)(OwnArticle);
