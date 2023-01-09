import React from "react";
import Tag from "../../atoms/Tag";

const TagBox = ({ className, tagsData, onChange }) => {
  return (
    <div className={`text-primary-900 ${className}`}>
      {tagsData &&
        tagsData.map(({ tag }) => (
          <Tag key={`tag_${tag}`} className="mr-1 bg-orange-300">
            {tag}
          </Tag>
        ))}
    </div>
  );
};

export default TagBox;
