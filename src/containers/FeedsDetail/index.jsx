import React, { useEffect, useState } from "react";
import moment from "moment";
import "./index.css";
import { useParams, useHistory } from "react-router-dom";
import { actionChangeGlobalRedux } from "../../config/redux/action";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const FeedsDetail = (props) => {
  const { index, type } = useParams();
  const history = useHistory();
  const source =
    type === "card"
      ? props.feeds
      : type === "carousel"
      ? props.feedMostlyViewed
      : [];
  const [currentActive] = useState(source[Number(index)]);
  useEffect(() => {
    if (type !== "card" && type !== "carousel") {
      history.push("/");
    }
    if (
      (type === "card" && props.feeds.length <= 0) ||
      (type === "carousel" && props.feeds.feedMostlyViewed <= 0)
    ) {
      history.push("/");
    }
  });
  return (
    <div className="divide-content mt-5">
      <div className="content detail">
        {source.length > Number(index) + 1 && <h4> {currentActive.title}</h4>}
        <hr />
        {source.length > Number(index) + 1 && (
          <img src={currentActive.thumbnail} className="card-img-top" alt="" />
        )}
        <div className="d-flex config-card-detail justify-content-center mt-4 gap-20">
          {source.length > Number(index) + 1 && (
            <div className="rounded-profile shadow-sm">
              {currentActive.user.fname.substring(0, 1)}
            </div>
          )}
          {source.length > Number(index) + 1 && (
            <span>{currentActive.user.fname}</span>
          )}
          {source.length > Number(index) + 1 && (
            <div className=" flex-center gap-20">
              <FontAwesomeIcon icon={faCalendar} />
              <span>{moment(currentActive.created_at).format("LL")}</span>
            </div>
          )}
        </div>
        {source.length > Number(index) + 1 && (
          <div
            className="card-text-custom-detail mt-3"
            dangerouslySetInnerHTML={{
              __html: currentActive.description.split("</p>")+ "</p>",
            }}
          ></div>
        )}
      </div>

      <div className="side">
        <div className="card">
          <div className="card-header bolder ">Category</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Technology</li>
            <li className="list-group-item">Story</li>
            <li className="list-group-item">Social</li>
            <li className="list-group-item">Traditional</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const reduxState = (state) => ({
  isLogin: state.isLogin,
  feeds: state.feeds,
  feedMostlyViewed: state.feedMostlyViewed,
});
const reduxDispatch = (dispatch) => ({
  changeGlobalRedux: (data) => dispatch(actionChangeGlobalRedux(data)),
});

export default connect(reduxState, reduxDispatch)(FeedsDetail);
