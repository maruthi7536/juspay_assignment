import React, { useLayoutEffect } from 'react';
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

// Stepped Bar Graph Component
const SteppedBarGraph: React.FC = () => {
  const theme = useTheme();

  useLayoutEffect(() => {
    let root = am5.Root.new('steppedBarChartDiv');

    // Apply themes
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        paddingRight: 20,
      })
    );

    // Create X-axis (Category Axis)
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'month',
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
        }),
      })
    );

    // Create Y-axis (Value Axis)
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Data for the chart
    let data = [
      { month: 'Jan', base: 8, top: 4 },
      { month: 'Feb', base: 12, top: 8 },
      { month: 'Mar', base: 15, top: 7 },
      { month: 'Apr', base: 10, top: 5 },
      { month: 'May', base: 13, top: 7 },
      { month: 'Jun', base: 16, top: 8 },
    ];

    xAxis.data.setAll(data);

    // Create Column Series for Base (Solid Color)
    let baseSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Base',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'base',
        categoryXField: 'month',
        stacked: true, // Enable stacking
        fill:am5.color('#A8C5DA'),
        stroke: am5.color('#A8C5DA'),
      })
    );

    baseSeries.columns.template.setAll({
      width: am5.percent(40),

    });

    baseSeries.data.setAll(data);

    // Create Column Series for Top (50% Opacity)
    let topSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Top',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'top',
        categoryXField: 'month',
        stacked: true, // Enable stacking
      })
    );

    topSeries.columns.template.setAll({
      width: am5.percent(40),
      fill: am5.color('#A8C5DA'), // Same color as base
      stroke: am5.color('#A8C5DA'), // Same color as base
    });

    // Set 50% opacity for the top series
    topSeries.columns.template.set('fillOpacity', 0.5);
    topSeries.columns.template.set('strokeOpacity', 0.5);

    topSeries.data.setAll(data);

    // Add chart cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    // Add legend (optional)
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    return () => {
      root.dispose(); // Cleanup chart instance
    };
  }, []);

  return (
    <Card sx={{ width: '100%', borderRadius: '16px', bgcolor:'#F7F9FB' }}>
      <CardContent>
        <Typography color={theme.palette.mode ==="light"?"black":"black"} variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Stepped Bar Graph
        </Typography>
        <div id="steppedBarChartDiv" style={{ width: '100%', height: '250px' }}></div>
      </CardContent>
    </Card>
  );
};

export default SteppedBarGraph;
