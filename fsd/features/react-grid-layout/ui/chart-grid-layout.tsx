import {Responsive, WidthProvider, Layouts, Layout} from "react-grid-layout";
import {useState, useCallback, useEffect, useLayoutEffect} from "react";
import _ from "lodash";
import {useBreakpoint} from "../hooks/use-breakpoint";
import {useCompactType} from "../hooks/use-compact-type";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {generateChartInitialState} from "@/fsd/features/react-grid-layout/utils/generate-chart-initial-state";
import {useGroupActions} from "@/fsd/entities/group";
import {useSearchParams} from "next/navigation";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface ChartGridLayoutProps {
  children: React.ReactNode[];
}

export const ChartGridLayout: React.FC<ChartGridLayoutProps> = ({children}) => {
  const {isEditableMode} = useGroupActions()
  const searchParams = useSearchParams();

  const {currentBreakpoint, onBreakpointChange} = useBreakpoint("lg");
  const {compactType, onCompactTypeChange} = useCompactType("vertical");

  const [layouts, setLayouts] = useState<Layouts>(generateChartInitialState(children.length));

  useLayoutEffect(() => {
    setTimeout(() => {
      setLayouts(generateChartInitialState(children.length));
    }, 50)
  }, [searchParams]);

  const generateDOM = () => {
    return _.map(layouts.lg, (l, index) => (
      <div
        key={l.i}
        className={l.static ? "static" : ""}
        style={{
          border: isEditableMode ? "1px solid lightgray" : 'none',
          boxSizing: "border-box"
        }}>
        {l.static ? (
          <span className="text" title="This item is static and cannot be removed or resized.">
            Static - {l.i}
          </span>
        ) : (
          <span className="text" style={{height: '100%', display: 'block', width: '100%'}}>
            {children[index]} {/* Отображаем соответствующий элемент children */}
          </span>
        )}
      </div>
    ));
  };

  const handleLayoutChange = (layout: Layout[], updatedLayouts: Layouts) => {
    setLayouts(updatedLayouts);
  };

  return (
    <div>
      <ResponsiveReactGridLayout
        style={{border: isEditableMode ? "1px solid lightgray" : ''}}
        className="layout"
        layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 12, sm: 6, xs: 4, xxs: 2}}
        rowHeight={200}
        isResizable={isEditableMode}
        isDraggable={isEditableMode}
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
