const TAGS = [
  'ความรัก',
  'สุขภาพ',
  'การงาน',
  'เงิน',
  'เรียน',
  'ครอบครัว',
  'เพื่อน'
];

interface TagSelectorProps {
  selected?: string[];
  onChange: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selected = [],
  onChange
}) => {

  const toggle = (tag: string) => {

    let newSelected: string[];

    if (selected.includes(tag)) {

      newSelected =
        selected.filter(t => t !== tag);

    } else {

      newSelected =
        [...selected, tag];

    }

    onChange(newSelected);

  };

  return (

    <div className="tag-selector">

      {TAGS.map(tag => (

        <button
          type="button"
          key={tag}
          className={`tag ${selected.includes(tag) ? 'active' : ''}`}
          onClick={() => toggle(tag)}
        >
          {tag}
        </button>

      ))}

      <button
        type="button"
        className="tag add"
      >
        + เพิ่มรายการ
      </button>

    </div>

  );

};

export default TagSelector;