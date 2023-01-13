import React, { useCallback, useState } from "react";
import Tag from "../../atoms/Tag";

const TagBox = ({ className, tagsData, onChange }) => {
  const [tags, setTags] = useState([]);
  const [tagsIgnored, setTagsIgnored] = useState([]);
  const onClickHandler = useCallback(
    (clickedTag) => {
      const checkedTag = tags.includes(clickedTag);
      const checkedIgnore = tagsIgnored.includes(clickedTag);
      if (!checkedTag && !checkedIgnore) {
        const clonedTags = [...tags];
        clonedTags.push(clickedTag);
        setTags(clonedTags);
        onChange(clonedTags, tagsIgnored);
      } else if (checkedTag && !checkedIgnore) {
        const filteredTags = tags.filter((t) => t !== clickedTag);
        const clonedIgnoreds = [...tagsIgnored];
        clonedIgnoreds.push(clickedTag);
        setTags(filteredTags);
        setTagsIgnored(clonedIgnoreds);
        onChange(filteredTags, clonedIgnoreds);
      } else {
        const filteredTags = tags.filter((t) => t !== clickedTag);
        const filteredIgnoreds = tagsIgnored.filter((t) => t !== clickedTag);
        setTags(filteredTags);
        setTagsIgnored(filteredIgnoreds);
        onChange(filteredTags, filteredIgnoreds);
      }
    },
    [tags, setTags, tagsIgnored, setTagsIgnored, onChange]
  );
  return (
    <div className={`text-primary-900 h-[54px] overflow-y-scroll scrollbar-hide ${className}`}>
      {tagsData &&
        tagsData.map(({ tag }) => (
          <Tag
            key={`tag_${tag}`}
            tags={tags}
            tagsIgnored={tagsIgnored}
            className={`inline-block mr-1 mb-1`}
            onClick={onClickHandler}
          >
            {tag}
          </Tag>
        ))}
    </div>
  );
};

export default TagBox;
