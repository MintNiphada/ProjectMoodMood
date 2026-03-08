import { useState } from 'react';

const TAGS = ['ความรัก', 'สุขภาพ', 'การงาน', 'เงิน', 'เรียน', 'ครอบครัว', 'เพื่อน'];

interface TagSelectorProps {
  onChange: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ onChange }) => {

  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (tag: string) => {

    const newSelected =
      selected.includes(tag)
        ? selected.filter(t => t !== tag)
        : [...selected, tag];

    setSelected(newSelected);

    // ส่งค่ากลับไป AddMood
    onChange(newSelected);
  };

  return (
    <div className="tag-selector">
      {TAGS.map(tag => (
        <button
          key={tag}
          className={`tag ${selected.includes(tag) ? 'active' : ''}`}
          onClick={() => toggle(tag)}
        >
          {tag}
        </button>
      ))}

      <button className="tag add">+ เพิ่มรายการ</button>
    </div>
  );
};

export default TagSelector;