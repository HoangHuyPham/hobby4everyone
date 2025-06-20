"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const HomeSideLeft = () => {
  const { t } = useTranslation();

  return (
    <div className="md:w-2/10 md:block border-1 hidden border-gray-300 border-b-0 h-screen sticky left-0 top-25">
      <div className="text-center">
        <div className="p-1 font-bold border-gray-300 border-b-1">
          {t("exchange")}
        </div>
        <div className="px-5 py-1">
          <div className="ml-5 text-start">
            <div className="my-5">{t("exchangeRequest")}</div>
            <div className="my-5">{t("pendingResponse")}</div>
            <div className="my-5">{t("rejectedRequest")}</div>
            <div className="my-5">{t("scheduleRequest")}</div>
            <div className="my-5">{t("schedule")}</div>
            <div className="my-5">{t("inProgress")}</div>
            <div className="my-5">{t("deliveryStatus")}</div>
            <div className="my-5">{t("history")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSideLeft;
