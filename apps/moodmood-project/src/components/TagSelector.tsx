import { useState, useEffect } from 'react';

const TAGS = ['ความรัก', 'สุขภาพ', 'การงาน', 'เงิน', 'เรียน', 'ครอบครัว', 'เพื่อน'];

interface TagSelectorProps {
  selected?: string[];
  onChange: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selected = [],
  onChange
}) => {

  const [activeTags, setActiveTags] = useState<string[]>(selected);

  // sync ค่าเวลามี selected จากภายนอก
  useEffect(() => {
    setActiveTags(selected);
  }, [selected]);

  const toggle = (tag: string) => {

    const newSelected =
      activeTags.includes(tag)
        ? activeTags.filter(t => t !== tag)
        : [...activeTags, tag];

    setActiveTags(newSelected);

    onChange(newSelected);
  };

  return (

    <div className="tag-selector">

      {TAGS.map(tag => (

        <button
          key={tag}
          className={`tag ${activeTags.includes(tag) ? 'active' : ''}`}
          onClick={() => toggle(tag)}
        >
          {tag}
        </button>

      ))}

      <button className="tag add">
        + เพิ่มรายการ
      </button>

    </div>

  );

};

export default TagSelector;