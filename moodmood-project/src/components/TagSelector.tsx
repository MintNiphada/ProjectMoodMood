import { useState } from 'react';

const TAGS = ['ความรัก', 'สุขภาพ', 'การงาน', 'เงิน', 'เรียน', 'ครอบครัว', 'เพื่อน'];

const TagSelector: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (tag: string) => {
    setSelected(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
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
