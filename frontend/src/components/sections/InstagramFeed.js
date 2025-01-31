import React from "react";
import InstagramFeed from "react-instagram-feed";

const InstagramSection = () => {
  return (
    <InstagramFeed
      userName="iaranoivas"
      className="instagram-feed"
      limit={6}
    />
  );
};

export default InstagramSection;
