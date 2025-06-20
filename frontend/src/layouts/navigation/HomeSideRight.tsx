// import React from "react";
// import Link from "next/link";

// const HomeSideRight = () => {
//   return (
//     <div className="md:w-2/10 md:block border-1 hidden border-gray-300 border-b-0 h-screen sticky right-0 top-25 ">
//       <div>
//         <div>
//           <div className=" text-center ">
//             <div className="p-1 font-bold  border-gray-300 border-b-1">
//               Lối tắt
//             </div>
//             <div>
//               <div className="ml-5 text-start">
//                 <Link href="/inventory">
//                   <div className="my-5">Cửa hàng của bạn</div>
//                 </Link>
//                 <div className="my-5">Lịch sử giao dịch</div>
//                 <div className="my-5">Người liên hệ</div>
//                 <div className="my-5">Sự kiện</div>
//                 <div className="my-5">Quản lý mô hình</div>
//                 <div className="my-5">Quản lý kho quà tặng</div>
//                 <div className="my-5">Quản lý túi tiền</div>
//                 <div className="my-5">Đổi thưởng</div>
//                 <div className="my-5">Quản lý bài viết</div>
//                 <div className="my-5">Dịch vụ tài khoản</div>
//                 <div className="my-5">Hỗ trợ khách hàng</div>
//                 <div className="my-5">Báo cáo</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
// import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HomeSideRight = () => {
  const { t } = useTranslation();

  return (
    <div className="md:w-2/10 md:block border-1 hidden border-gray-300 border-b-0 h-screen sticky right-0 top-25 ">
      <div>
        <div>
          <div className=" text-center ">
            <div className="p-1 font-bold  border-gray-300 border-b-1">
              {t("shortcut")}
            </div>
            <div>
              <div className="ml-5 text-start">
                <Link 
                // href="/inventory" 
                to="/inventory"
                className="hover:underline">
                  <div className="my-5">{t("yourStore")}</div>
                </Link>
                <Link 
                // href="/exchange-history"
                to="/inventory"
                >
                  <div className="my-5">{t("transactionHistory")}</div>
                </Link>
                <div className="my-5">{t("contacts")}</div>
                <div className="my-5">{t("events")}</div>
                <div className="my-5">{t("modelManagement")}</div>
                <div className="my-5">{t("giftWarehouseManagement")}</div>
                <div className="my-5">{t("walletManagement")}</div>
                <div className="my-5">{t("redeemRewards")}</div>
                <div className="my-5">{t("postManagement")}</div>
                <div className="my-5">{t("accountServices")}</div>
                <div className="my-5">{t("customerSupport")}</div>
                <div className="my-5">{t("reports")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSideRight;
