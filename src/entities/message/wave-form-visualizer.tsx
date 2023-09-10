import React, { FC, useEffect, useRef } from 'react';

export interface IWaveFormVisualizerProps {
  waveform: number[];
  svgWidth: number;
  svgHeight: number;
  duration: number;
  currentTime: number;
}

export const WaveformVisualizer: FC<IWaveFormVisualizerProps> = ({
  waveform,
  svgWidth,
  svgHeight,

  duration,
  currentTime,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);


  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const maxAmplitude = Math.max(...waveform);
    const minLineHeight = 1;
    const scaleY = (svgHeight / 2 - minLineHeight) / maxAmplitude;
    const columnWidth = svgWidth / waveform.length;


    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }


    for (let i = 0; i < waveform.length; i++) {
      const x = i * columnWidth;
      const y1 = svgHeight / 2 - Math.max(waveform[i] * scaleY, minLineHeight / 2);
      const y2 = svgHeight / 2 + Math.max(waveform[i] * scaleY, minLineHeight / 2);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x.toString());
      line.setAttribute('y1', y1.toString());
      line.setAttribute('x2', x.toString());
      line.setAttribute('y2', y2.toString());
      line.setAttribute('stroke', '#7D7463');

      if (x <= ((currentTime * 1000) / (duration * 1000)) * svgWidth) {
        line.setAttribute('stroke', '#84D2C5');
      } else {
        line.setAttribute('stroke', '#7D7463');
      }

      svg.appendChild(line);
    }
  }, [waveform, svgWidth, svgHeight, currentTime]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight}></svg>;
};
