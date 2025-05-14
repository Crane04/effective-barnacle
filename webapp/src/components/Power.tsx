import React from "react";
import "../css/PowerBIEmbed.css";

interface PowerBIEmbedProps {
  title: string;
  src: string;
  width?: string;
  height?: string;
}

const PowerBIEmbed: React.FC<PowerBIEmbedProps> = ({
  title,
  src,
  width = "100%",
  height = "600px",
}) => {
  return (
    <div className="powerbi-container">
      <iframe
        title={title}
        width={width}
        height={height}
        src={src}
        frameBorder="0"
        allowFullScreen
        className="powerbi-iframe"
      />
    </div>
  );
};

export default PowerBIEmbed;
