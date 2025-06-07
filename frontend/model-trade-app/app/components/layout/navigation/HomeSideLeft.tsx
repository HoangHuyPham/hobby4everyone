import React from "react";

const HomeSideLeft = () => {
  return (
    <div className="lg:w-2/10 border-1  border-gray-300 border-b-0 h-screen sticky left-0 top-25">
      <div className=" text-center ">
        <div className="p-1 font-bold  border-gray-300 border-b-1">
          {" "}
          Trao đổi
        </div>
        <div className="px-5 py-5">
          <div className=" ml-5     text-start">
            <div className="my-5">Yêu cầu trao đổi</div>
            <div className="my-5">Yêu cầu trao đổi cần phản hồi</div>
            <div className="my-5">Yêu cầu trao đổi bị từ chối</div>
            <div className="my-5">Yêu cầu lịch hẹn</div>
            <div className="my-5">Lịch hẹn</div>
            <div className="my-5">Cuộc hẹn đang diễn ra</div>
            <div className="my-5">Trạng thái giao hàng</div>
            <div className="my-5">Lịch sử trao đổi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSideLeft;
