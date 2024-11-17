import { useState, useRef, useEffect } from "react";

function Tooltip({
  show,
  children,
}: {
  show: React.ReactNode;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  useEffect(() => {
    if (visible && tooltipRef.current && triggerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;

      let top = triggerRect.height - triggerRect.height / 2;
      let left = triggerRect.width / 2 - tooltipRect.width / 2;

      if (triggerRect.top < tooltipRect.height) {
        top = triggerRect.height - triggerRect.height / 2;
        setPosition({ top, left });
        return;
      }

      if (viewportHeight - triggerRect.top < tooltipRect.height) {
        top = -tooltipRect.height + triggerRect.height / 2;
        setPosition({ top, left });
        return;
      }

      if (
        scrollTop + viewportHeight >= documentHeight ||
        tooltipRect.bottom > viewportHeight
      ) {
        top = -tooltipRect.height + triggerRect.height / 2;
        setPosition({ top, left });
        return;
      }

      setPosition({ top, left });
    }
  }, [visible]);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative"
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className="absolute bg-gray-900 text-white p-4 rounded-lg z-40 whitespace-nowrap"
          style={{
            top: position?.top,
            left: position?.left,
          }}
        >
          {show}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
