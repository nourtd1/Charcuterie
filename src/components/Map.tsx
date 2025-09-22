"use client";

import * as React from "react";

type MapProps = {
  latitude: number;
  longitude: number;
  zoom?: number;
  className?: string;
  title?: string;
};

export default function Map({ latitude, longitude, zoom = 15, className, title = "Emplacement" }: MapProps) {
  // Build OpenStreetMap embed URL using a small bounding box around the point
  const delta = 0.005; // ~500m
  const bbox = [longitude - delta, latitude - delta, longitude + delta, latitude + delta].join(",");
  const marker = `${latitude},${longitude}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}&zoom=${zoom}`;

  return (
    <iframe
      title={title}
      className={className}
      src={src}
      style={{ border: 0, width: "100%", height: "100%" }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      aria-label={title}
    />
  );
}


