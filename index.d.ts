import * as L from "leaflet";

declare module "leaflet" {
  namespace control {
    /**
     * Creates a new elevation control instance
     * @param options - Configuration options for the elevation control
     */
    function elevation(
      options?: L.Control.ElevationOptions
    ): L.Control.Elevation;
  }

  namespace Control {
    interface ElevationOptions extends L.ControlOptions {
      /** Automatically fit map bounds to track extent */
      autofitBounds?: boolean;
      /** Auto hide chart on mouse leave */
      autohide?: boolean;
      /** Auto hide marker when chart is not hovered */
      autohideMarker?: boolean;
      /** Enable "almost over" integration for better mouse tracking */
      almostover?: boolean;
      /** Display altitude data */
      altitude?: boolean | "disabled" | "enabled" | "summary";
      /** Show close/toggle button */
      closeBtn?: boolean;
      /** Start collapsed */
      collapsed?: boolean;
      /** Detached chart (not as map control) */
      detached?: boolean;
      /** Display distance data */
      distance?: boolean | "disabled" | "enabled" | "summary";
      /** Distance markers configuration */
      distanceMarkers?:
        | boolean
        | { lazy?: boolean; distance?: boolean; direction?: boolean };
      /** Enable chart dragging/brushing */
      dragging?: boolean;
      /** Download link type */
      downloadLink?: boolean | "link" | "modal";
      /** Elevation chart container selector (when detached) */
      elevationDiv?: string;
      /** Edge scale configuration */
      edgeScale?: boolean | { bar?: boolean; icon?: boolean; coords?: boolean };
      /** Follow marker on map */
      followMarker?: boolean;
      /** Use imperial units */
      imperial?: boolean;
      /** Show chart legend */
      legend?: boolean;
      /** Data handlers to load */
      handlers?: string[];
      /** Hotline visualization property */
      hotline?: boolean | string;
      /** Marker type */
      marker?: string;
      /** Custom marker icon */
      markerIcon?: L.DivIcon;
      /** Polyline style options */
      polyline?: L.PolylineOptions & { className?: string };
      /** Polyline segments style for highlighting */
      polylineSegments?: L.PolylineOptions & { className?: string };
      /** Prefer canvas renderer */
      preferCanvas?: boolean;
      /** Reverse coordinate order */
      reverseCoords?: boolean;
      /** Enable ruler/brush functionality */
      ruler?: boolean;
      /** Chart theme */
      theme?: string;
      /** Summary display mode */
      summary?: boolean | "inline" | "multiline";
      /** Display slope data */
      slope?: boolean | "disabled" | "enabled" | "summary";
      /** Display speed data */
      speed?: boolean | "disabled" | "enabled" | "summary";
      /** Display time data */
      time?: boolean | "disabled" | "enabled" | "summary";
      /** Time factor for calculations */
      timeFactor?: number;
      /** Show timestamps */
      timestamps?: boolean;
      /** Track start marker options */
      trkStart?: L.CircleMarkerOptions;
      /** Track end marker options */
      trkEnd?: L.CircleMarkerOptions;
      /** Display waypoints */
      waypoints?: boolean | "dots" | "markers";
      /** Waypoint icon configuration */
      wptIcons?: boolean | { [key: string]: L.DivIcon };
      /** Show waypoint labels */
      wptLabels?: boolean | "dots" | "markers";
      /** X-axis attribute */
      xAttr?: string;
      /** X-axis label */
      xLabel?: string;
      /** Y-axis attribute */
      yAttr?: string;
      /** Y-axis label */
      yLabel?: string;
      /** Zoom level for follow marker */
      zFollow?: boolean | number;
      /** Enable chart zooming */
      zooming?: boolean;

      // Advanced options
      /** Chart margins */
      margins?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
      };
      /** Chart height */
      height?: number;
      /** Chart width */
      width?: number;
      /** Number of X-axis ticks */
      xTicks?: number;
      /** Number of Y-axis ticks */
      yTicks?: number;
      /** X-axis decimal places */
      decimalsX?: number;
      /** Y-axis decimal places */
      decimalsY?: number;
      /** Force axis bounds */
      forceAxisBounds?: boolean;
      /** D3 interpolation method */
      interpolation?: string;
      /** Y-axis maximum value */
      yAxisMax?: number;
      /** Y-axis minimum value */
      yAxisMin?: number;
    }

    interface ElevationTrackInfo {
      /** Track name */
      name?: string;
      /** Elevation statistics */
      elevation_min?: number;
      elevation_max?: number;
      elevation_avg?: number;
      /** Distance statistics */
      distance?: number;
      /** Time statistics */
      time?: number;
      /** Slope statistics */
      slope_min?: number;
      slope_max?: number;
      slope_avg?: number;
      /** Speed statistics */
      speed_min?: number;
      speed_max?: number;
      speed_avg?: number;
      /** Ascent/descent */
      ascent?: number;
      descent?: number;
      [key: string]: any;
    }

    interface ElevationPoint {
      /** Latitude */
      x: number;
      /** Longitude */
      y: number;
      /** Elevation */
      z: number;
      /** Leaflet LatLng object */
      latlng: L.LatLng;
      /** Distance from start */
      dist?: number;
      /** Time from start */
      time?: number;
      /** Slope */
      slope?: number;
      /** Speed */
      speed?: number;
      /** Additional metadata */
      [key: string]: any;
    }

    interface ElevationEventData {
      /** Event data point */
      data?: ElevationPoint;
      /** Chart X coordinate */
      xCoord?: number;
      /** Track layer */
      layer?: L.Layer;
      /** Track name */
      name?: string;
      /** Track information */
      track_info?: ElevationTrackInfo;
      /** Track index */
      index?: number;
    }

    class Elevation extends L.Control {
      /** Elevation control options */
      options: ElevationOptions;
      /** Current elevation data points */
      _data: ElevationPoint[];
      /** Track information and statistics */
      track_info: ElevationTrackInfo;

      constructor(options?: ElevationOptions);

      /**
       * Add elevation data to the control
       * @param data - Elevation data (GeoJSON, GPX, KML, TCX)
       * @param layer - Optional layer to associate with data
       */
      addData(data: any, layer?: L.Layer): void;

      /**
       * Clear all elevation data and reset the control
       */
      clear(): void;

      /**
       * Load elevation data from URL or object
       * @param data - URL string or data object
       */
      load(data: string | object): void;

      /**
       * Hide the elevation chart
       */
      hide(): void;

      /**
       * Show the elevation chart
       */
      show(): void;

      /**
       * Redraw the elevation chart
       */
      redraw(): void;

      /**
       * Enable chart brushing/selection
       */
      enableBrush(): void;

      /**
       * Disable chart brushing/selection
       */
      disableBrush(): void;

      /**
       * Enable chart zooming
       */
      enableZoom(): void;

      /**
       * Disable chart zooming
       */
      disableZoom(): void;

      /**
       * Fit map bounds to elevation track
       * @param bounds - Optional bounds to fit to
       */
      fitBounds(bounds?: L.LatLngBounds): void;

      /**
       * Get track bounds
       * @param data - Optional data to get bounds from
       */
      getBounds(data?: ElevationPoint[]): L.LatLngBounds;

      /**
       * Get zoom level for follow marker
       */
      getZFollow(): boolean | number;

      /**
       * Set zoom level for follow marker
       * @param zoom - Zoom level
       */
      setZFollow(zoom: boolean | number): void;

      // Events
      on(type: "add", fn: (e: L.LeafletEvent) => void, context?: any): this;
      on(type: "remove", fn: (e: L.LeafletEvent) => void, context?: any): this;
      on(
        type: "modules_loaded",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      on(
        type: "eledata_added",
        fn: (e: ElevationEventData) => void,
        context?: any
      ): this;
      on(
        type: "eledata_loaded",
        fn: (e: ElevationEventData) => void,
        context?: any
      ): this;
      on(
        type: "eledata_clear",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      on(
        type: "eledata_updated",
        fn: (e: ElevationEventData) => void,
        context?: any
      ): this;
      on(
        type: "elechart_init",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      on(
        type: "elechart_change",
        fn: (e: ElevationEventData) => void,
        context?: any
      ): this;
      on(
        type: "elechart_hover",
        fn: (e: ElevationEventData) => void,
        context?: any
      ): this;
      on(
        type: "elechart_enter",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      on(
        type: "elechart_leave",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      on(
        type: "elechart_updated",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      on(
        type: "elechart_dragged",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      on(type: string, fn: (e: any) => void, context?: any): this;

      off(type: "add", fn?: (e: L.LeafletEvent) => void, context?: any): this;
      off(
        type: "remove",
        fn?: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      off(
        type: "modules_loaded",
        fn?: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      off(
        type: "eledata_added",
        fn?: (e: ElevationEventData) => void,
        context?: any
      ): this;
      off(
        type: "eledata_loaded",
        fn?: (e: ElevationEventData) => void,
        context?: any
      ): this;
      off(
        type: "eledata_clear",
        fn?: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      off(
        type: "eledata_updated",
        fn?: (e: ElevationEventData) => void,
        context?: any
      ): this;
      off(
        type: "elechart_init",
        fn?: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      off(
        type: "elechart_change",
        fn?: (e: ElevationEventData) => void,
        context?: any
      ): this;
      off(
        type: "elechart_hover",
        fn?: (e: ElevationEventData) => void,
        context?: any
      ): this;
      off(
        type: "elechart_enter",
        fn?: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      off(
        type: "elechart_leave",
        fn?: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      off(
        type: "elechart_updated",
        fn?: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      off(
        type: "elechart_dragged",
        fn?: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      off(type: string, fn?: (e: any) => void, context?: any): this;

      once(type: "add", fn: (e: L.LeafletEvent) => void, context?: any): this;
      once(
        type: "remove",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      once(
        type: "modules_loaded",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      once(
        type: "eledata_added",
        fn: (e: ElevationEventData) => void,
        context?: any
      ): this;
      once(
        type: "eledata_loaded",
        fn: (e: ElevationEventData) => void,
        context?: any
      ): this;
      once(
        type: "eledata_clear",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      once(
        type: "eledata_updated",
        fn: (e: ElevationEventData) => void,
        context?: any
      ): this;
      once(
        type: "elechart_init",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      once(
        type: "elechart_change",
        fn: (e: ElevationEventData) => void,
        context?: any
      ): this;
      once(
        type: "elechart_hover",
        fn: (e: ElevationEventData) => void,
        context?: any
      ): this;
      once(
        type: "elechart_enter",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      once(
        type: "elechart_leave",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      once(
        type: "elechart_updated",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      once(
        type: "elechart_dragged",
        fn: (e: L.LeafletEvent) => void,
        context?: any
      ): this;
      once(type: string, fn: (e: any) => void, context?: any): this;

      fire(type: string, data?: any, propagate?: boolean): this;
    }
  }
}

// Global registration functions for internationalization
declare global {
  namespace L {
    /**
     * Register a locale for internationalization
     * @param locale - Locale code
     * @param translations - Translation object
     */
    function registerLocale(
      locale: string,
      translations: { [key: string]: string }
    ): void;

    /**
     * Set the active locale
     * @param locale - Locale code
     */
    function setLocale(locale: string): void;
  }
}

export = L;
export as namespace L;
