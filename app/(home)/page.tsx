'use client';
import React, { useState, useEffect, useRef } from "react";
import '../globals.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import _ from "lodash";
import * as echarts from 'echarts';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [myChart, setMyChart] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      setMyChart(chartInstance);

      const option: echarts.EChartsOption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          },
        ],
      };

      chartInstance.setOption(option);

      // Cleanup on unmount
      return () => {
        chartInstance.dispose();
      };
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (myChart) {
        myChart.resize();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [myChart]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }} // Use 100% width and height
    />
  );
};

interface ShowcaseLayoutProps {
  onLayoutChange: (layout: Layout[], layouts: { lg: Layout[] }) => void;
  initialLayout: Layout[];
}

const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({ onLayoutChange, initialLayout }) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<"lg" | "md" | "sm" | "xs" | "xxs">("lg");
  const [compactType, setCompactType] = useState<"vertical" | "horizontal" | null>("vertical");
  const [layouts, setLayouts] = useState<{ lg: Layout[] }>({ lg: initialLayout });

  useEffect(() => {
    setLayouts({ lg: initialLayout });
  }, [initialLayout]);

  const generateDOM = () => {
    return _.map(layouts.lg, (l, i) => (
      <div key={i} className={l.static ? "static" : ""}
           style={{
             border: "1px solid lightgray",
             boxSizing: "border-box",
             padding: "10px"
           }}
      >
        {l.static ? (
          <span
            className="text"
            title="This item is static and cannot be removed or resized."
          >
            Static - {i}
          </span>
        ) : (
          <span className="text">
            <BarChart />
          </span>
        )}
      </div>
    ));
  };

  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint as "lg" | "md" | "sm" | "xs" | "xxs");
  };

  const onCompactTypeChange = () => {
    setCompactType(prevCompactType =>
      prevCompactType === "horizontal"
        ? "vertical"
        : prevCompactType === "vertical"
          ? null
          : "horizontal"
    );
  };

  const handleLayoutChange = (layout: Layout[], layouts: { lg: Layout[] }) => {
    setLayouts(layouts);
    onLayoutChange(layout, layouts);
  };

  return (
    <div>
      <div>
        Current Breakpoint: {currentBreakpoint} ({layouts[currentBreakpoint as keyof typeof layouts]?.length || 0} columns)
      </div>
      <div>
        Compaction type: {compactType || "No Compaction"}
      </div>
      <button onClick={onCompactTypeChange}>
        Change Compaction Type
      </button>
      <ResponsiveReactGridLayout
        style={{
          border: "1px solid lightgray",
        }}
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        isResizable={true}
        isDraggable={true}
        resizeHandles={['se', 'e', 'w']}
        compactType={compactType}
        preventCollision={false}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={handleLayoutChange}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
};

ShowcaseLayout.defaultProps = {
  initialLayout: generateLayout(),
};

function generateLayout(): Layout[] {
  return _.map(_.range(0, 25), (item, i) => {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

export default function HomePage() {
  const [layouts, setLayouts] = useState<{ lg: Layout[] }>({
    lg: [
      { i: '1', x: 0, y: 0, w: 4, h: 2, minW: 2, minH: 2, maxW: 12 },
      { i: '2', x: 4, y: 0, w: 4, h: 2, minW: 2, minH: 2, maxW: 12 },
      { i: '3', x: 8, y: 0, w: 4, h: 2, minW: 2, minH: 2, maxW: 12 },
    ],
  });

  const onLayoutChange = (layout: Layout[], allLayouts: { lg: Layout[] }) => {
    setLayouts(allLayouts);
  };

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 80px)', padding: '20px', overflowY: 'auto' ,overflowX:'hidden'}}>
      <ShowcaseLayout onLayoutChange={onLayoutChange} initialLayout={layouts.lg} />
    </div>
  );
}
