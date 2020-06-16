import React from "react";

export const Logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("accessTokenSecret");
  window.location.href = "/";
  return <div />;
};
