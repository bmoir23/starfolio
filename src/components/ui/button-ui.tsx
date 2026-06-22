import React from "react";

interface ButtonUiProps {
  label?: string;
  children?: React.ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  "aria-label"?: string;
  className?: string;
}

const ButtonUi: React.FC<ButtonUiProps> = ({
  label,
  children,
  href,
  target,
  rel,
  "aria-label": ariaLabel,
  className,
}) => {
  const display = children ?? label ?? "Button";
  const isLink = Boolean(href);

  const Inner = isLink ? "a" : "button";
  const innerProps = isLink
    ? { href, target, rel, "aria-label": ariaLabel }
    : { "aria-label": ariaLabel };

  return (
    <div
      className={[
        "rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full",
        "hover:scale-105 transition duration-300 active:scale-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Inner
        {...(innerProps as any)}
        className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur"
      >
        {display}
      </Inner>
    </div>
  );
};

export { ButtonUi };
