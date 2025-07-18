import { defaults } from "lodash";

import { Action } from "./base.ts";
import type { Zone } from "../types/zone.ts";

export interface RouteConfig {
  map: Zone | `${Zone}/${number}`;
  loop?: "on" | "off";
  ants?: "curved" | "straight";
  dist?: number;
  follow?: "smart";
}

export function route(
  config: RouteConfig,
  ...coordinates: [number, number][]
): Action {
  const { map, ...pathOptions } = defaults(config, {
    loop: "off",
    ants: "curved",
    follow: "smart",
  });

  const mapAction: Action = new Action(`|map ${config.map}`);

  const pathConfig: Action = new Action(
    `|path ${Object.entries(pathOptions)
      .map(([key, value]) => `${key} ${value}`)
      .join("; ")}`
  );

  const pathActions: Action[] = coordinates.map(
    ([x, y]) => new Action(`|path ${x},${y}`)
  );

  return new Action([mapAction, pathConfig, ...pathActions].join("\n"));
}
