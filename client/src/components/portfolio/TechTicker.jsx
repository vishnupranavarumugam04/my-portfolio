import React from 'react';

const MECHATRONICS_TECH = [
  'ROS 2 & Gazebo',
  'AI / ML & Computer Vision',
  'YOLOv8 & OpenCV',
  'Full-Stack Software',
  'ESP32 & Embedded IoT',
  'CAD 3D Modeling (SolidWorks)',
  'C / C++ & Python',
  'Autonomous Navigation',
  'A* Path Planning',
  'Edge AI & Robotics',
  'PLC & Industrial Automation',
  'Microcontrollers & Sensors'
];

export const TechTicker = () => {
  return (
    <div className="relative overflow-hidden border-y border-slate-200/80 dark:border-white/10 py-4 bg-slate-100/90 dark:bg-slate-900/60 backdrop-blur-md">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap marquee-mask">
        {MECHATRONICS_TECH.map((item, idx) => (
          <span
            key={`ticker-1-${idx}`}
            className="font-mono text-xs uppercase tracking-widest text-slate-800 dark:text-slate-300 font-bold flex items-center gap-10 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-default"
          >
            <span>{item}</span>
            <span className="text-sky-600 dark:text-sky-400 text-sm">✦</span>
          </span>
        ))}

        {MECHATRONICS_TECH.map((item, idx) => (
          <span
            key={`ticker-2-${idx}`}
            className="font-mono text-xs uppercase tracking-widest text-slate-800 dark:text-slate-300 font-bold flex items-center gap-10 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-default"
          >
            <span>{item}</span>
            <span className="text-sky-600 dark:text-sky-400 text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
