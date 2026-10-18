"use client";

import React from "react";

type GridCell = { src: string; alt: string; col?: number };

type GalleryRow =
    | { kind: "single"; src: string; alt: string }
    | { kind: "grid"; cells: GridCell[] };

const rows: GalleryRow[] = [
    {
        kind: "single",
        src: "/images/gallery/20260617_143615.jpg",
        alt: "RG Fight Club",
    },
    {
        kind: "single",
        src: "/images/gallery/DSC_4445.jpg",
        alt: "RG Fight Club",
    },
    {
        kind: "grid",
        cells: [
            {
                src: "/images/gallery/jonathan-tomas-Wyta6ocqCSQ-unsplash.jpg",
                col: 2,
                alt: "RG Fight Club",
            },
            {
                src: "/images/gallery/asma-butt-cAFaaIDXzLE-unsplash.jpg",
                alt: "RG Fight Club",
            },
            {
                src: "/images/gallery/IMG-20240308-WA0032.jpg",
                alt: "RG Fight Club",
            },
        ],
    },
    {
        kind: "single",
        src: "/images/gallery/20260408_143912.jpg",
        alt: "RG Fight Club",
    },
    {
        kind: "single",
        src: "/images/gallery/20260606_122741-1.jpg",
        alt: "RG Fight Club",
    },
    {
        kind: "single",
        src: "/images/gallery/michael-deubner-X7ZAtrJHuCE-unsplash.jpg",
        alt: "RG Fight Club",
    },
    {
        kind: "grid",
        cells: [
            {
                src: "/images/gallery/DSC_1720-1.jpg",
                col: 2,
                alt: "RG Fight Club",
            },
            {
                src: "/images/gallery/20260614_103217.jpg",
                alt: "RG Fight Club",
            },
            {
                src: "/images/gallery/20260905_123542.jpg",
                alt: "RG Fight Club",
            },
        ],
    },
];

function GridElement({ cells }: { cells: GridCell[] }) {
    return (
        <div className="grid h-full grid-cols-2 grid-rows-2 gap-4">
            {cells.map((cell, index) => (
                <div
                    className="flex items-center justify-center overflow-hidden rounded-sm shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                    style={{ gridColumn: cell.col ? `span ${cell.col}` : "span 1" }}
                    key={`grid-${cell.src}-${index}`}
                >
                    <img
                        src={cell.src}
                        className="h-full w-full shrink-0 object-cover"
                        alt={cell.alt}
                    />
                </div>
            ))}
        </div>
    );
}

const Gallery: React.FC = () => {
    return (
        <div className="w-full overflow-hidden bg-white py-10" data-aos="fade-up">
            <div className="flex h-[300px] w-max animate-marquee gap-4">
                {[1, 2, 3].map((group) => (
                    <div className="flex gap-4" key={`group-${group}`}>
                        {rows.map((row, i) => (
                            <React.Fragment key={`${group}-${i}`}>
                                {row.kind === "grid" ? (
                                    <GridElement cells={row.cells} />
                                ) : (
                                    <img
                                        src={row.src}
                                        className="max-h-full shrink-0 overflow-hidden rounded-sm object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                                        alt={row.alt}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
