import { useRef, useEffect } from "react";

const AutoGrowingTextarea = ({
  value,
  onChange,
  minRows = 1,
  maxRows = 6,
  ...props
}) => {
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.rows = minRows;
    const lineHeight = parseInt(
      getComputedStyle(textarea).lineHeight || "24",
      10
    );
    const currentRows = Math.floor(textarea.scrollHeight / lineHeight);

    if (currentRows >= maxRows) {
      textarea.rows = maxRows;
      textarea.style.overflowY = "auto";
    } else {
      textarea.rows = currentRows;
      textarea.style.overflowY = "hidden";
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e);
        resizeTextarea();
      }}
      onWheel={(e) => {
        const target = e.currentTarget;
        const delta = e.deltaY;

        const isScrollingUp = delta < 0;
        const isScrollingDown = delta > 0;

        const atTop = target.scrollTop === 0;
        const atBottom =
          target.scrollTop + target.clientHeight >= target.scrollHeight;

        if ((isScrollingUp && !atTop) || (isScrollingDown && !atBottom)) {
          e.stopPropagation();
        }
      }}
      style={{
        resize: "none",
        overflowY: "auto",
        lineHeight: "1.5",
        fontSize: "1rem",
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
      }}
    />
  );
};

export default AutoGrowingTextarea;
