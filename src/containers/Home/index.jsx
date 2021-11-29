import React, { Component } from "react";
import "./index.css";
import {
  actionChangeGlobalRedux,
  actionGetAllFeeds,
  actionGetAllFeedsMostlyViewed,
} from "../../config/redux/action";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import moment from "moment";
import Loading from "../../assets/img/icon/loading.gif";
library.add(faCalendar);

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 50,
      offset: 0,
      isLoading: false,
      isLoadingCarousel: false,
    };
  }
  componentDidMount() {
    if (this.props.feeds.length <= 0) {
      this.setState((state) => ({
        ...state,
        isLoading: true,
      }));
      this.props
        .fetchFeeds({ limit: this.state.limit, offset: this.state.offset })
        .then((result) => {
          this.setState((state) => ({
            ...state,
            isLoading: false,
          }));
        })
        .catch((err) => {
          this.setState((state) => ({
            ...state,
            isLoading: false,
          }));
        });
    }
    if (this.props.feedMostlyViewed.length <= 0) {
      this.setState((state) => ({
        ...state,
        isLoadingCarousel: true,
      }));
      this.props
        .fetchFeedMostlyViewed({
          limit: this.state.limit,
          offset: this.state.offset,
        })
        .then((result) => {
          this.setState((state) => ({
            ...state,
            isLoadingCarousel: false,
          }));
        })
        .catch((err) => {
          this.setState((state) => ({
            ...state,
            isLoadingCarousel: false,
          }));
        });
    }
  }

  render() {
    return (
      <div>
        <Carousel responsive={responsive}>
          {this.props.feedMostlyViewed.length > 0 &&
            this.props.feedMostlyViewed.map((item, index) => (
              <div key={index} className="wrap-carousel-item">
                <div className="custom-carousel-item shadow-sm">
                  <img src={item.thumbnail} alt="" />
                  <div className="custom-carousel-config">
                    <p>{moment(item.created_at).format("MM/DD/YYYY")}</p>
                    <h4>{item.title}</h4>
                    <div className="custom-author-profile">
                      <div className="rounded-profile shadow-sm">
                        {item.user.fname.substring(0, 1)}
                      </div>
                      <h6>{item.user.fname}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Carousel>
        <div className="divide-content mt-5">
          <div className="content">
            {this.state.isLoading && (
              <div className="loading-container">
                <img src={Loading} alt="" className="loading-icon" />
              </div>
            )}
            {this.props.feeds.length > 0 &&
              this.props.feeds.map((item, index) => {
                return (
                  <div className="card mb-3" key={index}>
                    <div className="image-holder-card">
                      <img
                        className="card-img-top"
                        src={item.thumbnail}
                        alt=""
                      />
                    </div>
                    <div className="card-body">
                      <div className="card-title-custom">
                        <h4>{item.title}</h4>
                        <div className="title-custom-info">
                          <div className="custom-author-profile">
                            <div className="rounded-profile shadow-sm">
                              {item.user.fname.substring(0, 1)}
                            </div>{" "}
                            <h6>{item.user.fname}</h6>
                          </div>
                          <div className="date-info">
                            <FontAwesomeIcon icon={faCalendar} />{" "}
                            <span>
                              {moment(item.created_at).format("MM/DD/YYYY")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="card-text-custom mt-3">
                        {item.description.substring(0, 255)}
                      </p>
                    </div>
                    <div className="card-footer-custom ">
                      <button className="btn-primary-custom">
                        Continue Reading
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="side">
            <div className="card">
              <div className="card-header">Category</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Technology</li>
                <li className="list-group-item">Story</li>
                <li className="list-group-item">Social</li>
                <li className="list-group-item">Traditional</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const reduxState = (state) => ({
  isLogin: state.isLogin,
  feeds: state.feeds,
  feedMostlyViewed: state.feedMostlyViewed,
});
const reduxDispatch = (dispatch) => ({
  changeGlobalRedux: (data) => dispatch(actionChangeGlobalRedux(data)),
  fetchFeeds: (data) => dispatch(actionGetAllFeeds(data)),
  fetchFeedMostlyViewed: () => dispatch(actionGetAllFeedsMostlyViewed()),
});

export default connect(reduxState, reduxDispatch)(Home);
