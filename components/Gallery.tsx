"use client";

import React, { useEffect } from "react";

type GridCell = { src: string; alt: string; col?: number };

type GalleryRow =
    | { kind: "single"; src: string; alt: string }
    | { kind: "grid"; cells: GridCell[] };

const rows: GalleryRow[] = [
    {
        kind: "single",
        src: "/images/gallery/lisa-marie-theck-bP1rDWiCXcU-unsplash.jpg",
        alt: "Séance de boxe et entraînement au sac – galerie RG Fight Club",
    },
    {
        kind: "single",
        src: "/images/gallery/roman-aguila-nfZKyKlGujs-unsplash.jpg",
        alt: "Gants de boxe et préparation à l'effort – coaching sportif 93",
    },
    {
        kind: "grid",
        cells: [
            {
                src: "/images/gallery/jonathan-tomas-Wyta6ocqCSQ-unsplash.jpg",
                col: 2,
                alt: "Exercices et renforcement en salle – RG Fight Club Seine-Saint-Denis",
            },
            {
                src: "/images/gallery/asma-butt-cAFaaIDXzLE-unsplash.jpg",
                alt: "Entraînement cardio et boxe pour tous les niveaux",
            },
            {
                src: "/images/gallery/jonathan-tomas-TaQ2Q7Sn448-unsplash.jpg",
                alt: "Cours collectif dynamique – esprit d'équipe RG Fight Club",
            },
        ],
    },
    {
        kind: "single",
        src: "/images/gallery/michael-starkie-7Jc5OwXwfWw-unsplash.jpg",
        alt: "Technique et impact au sac – cours de boxe Île-de-France",
    },
    {
        kind: "single",
        src: "/images/gallery/gold-touch-nutrition-c8rFJrImUgQ-unsplash.jpg",
        alt: "Préparation physique et nutrition du sportif – RG Fight Club",
    },
    {
        kind: "single",
        src: "/images/gallery/michael-deubner-X7ZAtrJHuCE-unsplash.jpg",
        alt: "Ambiance ring et motivation – association RG Fight Club",
    },
    {
        kind: "grid",
        cells: [
            {
                src: "/images/gallery/logan-weaver-lgnwvr-MR2vi-J-520-unsplash.jpg",
                col: 2,
                alt: "Shadow boxing et travail technique – coach sportif Btisam Rguibi",
            },
            {
                src: "/images/gallery/sunday-ii-sunday-DeM9l5sHeFE-unsplash.jpg",
                alt: "Échauffement et mobilité avant séance de boxe",
            },
            {
                src: "/images/gallery/michael-deubner-X7ZAtrJHuCE-unsplash.jpg",
                alt: "Communauté et entraînement – RG Fight Club Bobigny et alentours",
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
    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init({ duration: 800, once: true });
        }
    }, []);

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
