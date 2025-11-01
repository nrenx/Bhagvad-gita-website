declare module 'web-vitals' {
  type WebVitalMetric = {
    name: string;
    value: number;
    id: string;
    delta: number;
    entries: PerformanceEntry[];
    attribution?: unknown;
  };

  type ReportCallback = (metric: WebVitalMetric) => void;

  export function onCLS(callback: ReportCallback): void;
  export function onFID(callback: ReportCallback): void;
  export function onFCP(callback: ReportCallback): void;
  export function onLCP(callback: ReportCallback): void;
  export function onTTFB(callback: ReportCallback): void;
}
