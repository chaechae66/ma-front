import { useState, useRef, useEffect } from "react";

function Tooltip({
  show,
  children,
}: {
  show: React.ReactNode;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  useEffect(() => {
    if (visible && tooltipRef.current && triggerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      let top = -tooltipRect.height - 8;
      let left = triggerRect.width / 2 - tooltipRect.width / 2;

      if (triggerRect.top < tooltipRect.height) {
        top = triggerRect.height + 8;
      }

      if (viewportHeight - triggerRect.top < tooltipRect.height) {
        top = -tooltipRect.height - 8;
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
          className="absolute bg-gray-900 text-white p-4 rounded-lg z-50 whitespace-nowrap"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          {show}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
