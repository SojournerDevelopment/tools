"use client";
import React, {useImperativeHandle, useState, forwardRef, useEffect} from 'react';
import nextConfig from "../../../next.config";

interface OperatorPosition {
    id: number;
    cx: number;
    cy: number;
    number: number | null; // null means no number is displayed
    name: string | null;
}

interface SvgPlanProps {
    hideUnused: boolean;
}

// Define the ref methods interface
export interface SvgPlanRef {
    resetAllPlaceholders: () => void;
}

const LOCAL_STORAGE_VERSION_KEY = "svgPlanVersion";
const LOCAL_STORAGE_VERSION = "0.0.1";

const LOCAL_STORAGE_KEY = "svgPlanPlaceholders";

const SvgPlan = forwardRef<SvgPlanRef, SvgPlanProps>(({hideUnused}, ref) => {
        const [placeholders, setPlaceholders] = useState<OperatorPosition[]>([]);
        const [counter, setCounter] = useState(0);

        // Load placeholders from localStorage on mount (only in the browser)
        useEffect(() => {
            if (typeof window !== "undefined") {
                const savedPlaceholders = localStorage.getItem(LOCAL_STORAGE_KEY);
                const savedVersion = localStorage.getItem(LOCAL_STORAGE_VERSION_KEY);

                if (savedVersion !== LOCAL_STORAGE_VERSION) {
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                    localStorage.removeItem(LOCAL_STORAGE_VERSION_KEY);
                    populateInitial();

                }

                if (savedPlaceholders && savedVersion === LOCAL_STORAGE_VERSION) {
                    const parsedPlaceholders = JSON.parse(savedPlaceholders);
                    if (parsedPlaceholders.length < 64) {
                        populateInitial();
                    } else {
                        setPlaceholders(parsedPlaceholders);

                        // Update the counter based on the highest number in the saved data
                        const highestNumber = parsedPlaceholders.reduce(
                            (max: number, placeholder: OperatorPosition) =>
                                placeholder.number !== null && placeholder.number > max
                                    ? placeholder.number
                                    : max,
                            0
                        );
                        setCounter(highestNumber);
                    }
                } else {
                    // Set default placeholders if no saved data exists
                    populateInitial();
                }
            }
        }, []);

        const populateInitial = () => {
            setPlaceholders([
                // Eingang Raucherzone mitte
                {id: 70, cx: 689, cy: 105, number: null, name: "Raucherterasse Mitte Ost"},
                {id: 71, cx: 730, cy: 105, number: null, name: "Raucherterasse Mitte West"},

                // Halle Mitte
                {id: 72, cx: 708, cy: 400, number: null, name: "Ebene A Hallenmitte"},

                // Ebene B: 6-7, 7-8
                {id: 73, cx: 651, cy: 171, number: null, name: "Ebene B Süd zwischen Sektor 6 und 7"},
                {id: 74, cx: 760, cy: 171, number: null, name: "Ebene B Süd zwischen Sektor 7 und 8"},

                // Eingang Raucherzone oben links
                {id: 1, cx: 422, cy: 105, number: null, name: "Raucherterasse Süd Ost Pos 1"},
                {id: 2, cx: 514, cy: 105, number: null, name: "Raucherterasse Süd Ost Pos 2"},

                // Eingang Raucherzone oben rechts
                {id: 3, cx: 905, cy: 105, number: null, name: "Raucherterasse Süd West Pos 1"},
                {id: 4, cx: 997, cy: 105, number: null, name: "Raucherterasse Süd West Pos 2"},

                // Eingang Haupteingang unten links
                {id: 12, cx: 458, cy: 765, number: null, name: "Stiegenaufgang Ebene A (gegenüber Portier) Osttribüne"},
                {id: 13, cx: 499, cy: 765, number: null, name: "Eingangsbereich Haupteingang"},

                // Eingang Nord Mitte
                {id: 5, cx: 689, cy: 765, number: null, name: "Ebene A Foyer Nord Ost"},
                {id: 6, cx: 724, cy: 765, number: null, name: "Ebene A Foyer Nord West"},

                // Eingang Innen Nord Links
                {id: 7, cx: 376, cy: 702, number: null, name: "Wandelhalle Ost Pos 1"},
                {id: 8, cx: 417, cy: 702, number: null, name: "Wandelhalle Ost Pos 2"},

                // Eingang Innen Nord Rechts Doppel
                {id: 9, cx: 956, cy: 702, number: null, name: "Wandelhalle West Pos 1"},
                {id: 10, cx: 997, cy: 702, number: null, name: "Wandelhalle West Pos 2"},

                // Eingang Innen Nord Rechts Einzel
                {id: 11, cx: 1079, cy: 702, number: null, name: "Stiegenaufgang West (Raucherterasse)"},

                // Innenfeld von oben nach unten
                {id: 14, cx: 603, cy: 279, number: null, name: "Ebene A Süd Ost"},
                {id: 15, cx: 813, cy: 279, number: null, name: "Ebene A Süd West"},

                {id: 16, cx: 654, cy: 309, number: null, name: "Ebene A mobile Tribüne Süd Ost"},
                {id: 17, cx: 760, cy: 309, number: null, name: "Ebene A mobile Tribüne Süd West"},

                // Innenfeld OST
                {id: 18, cx: 618, cy: 381, number: null, name: "Ebene A Stiegenaufgang Tribüne Ost Pos 1"},
                {id: 19, cx: 618, cy: 418, number: null, name: "Ebene A Stiegenaufgang Tribüne Ost Pos 2"},

                // Innenfeld WEST
                {id: 20, cx: 798, cy: 381, number: null, name: "Ebene A Stiegenaufgang Tribüne West Pos 2"},
                {id: 21, cx: 798, cy: 418, number: null, name: "Ebene A Stiegenaufgang Tribüne West Pos 1"},

                {id: 22, cx: 654, cy: 491, number: null, name: "Ebene A mobile Tribüne Nord Ost"},
                {id: 23, cx: 760, cy: 491, number: null, name: "Ebene A mobile Tribüne Nord West"},

                {id: 24, cx: 708, cy: 565, number: null, name: "Ebene A mobile Tribüne Nord"},

                {id: 25, cx: 603, cy: 590, number: null, name: "Ebene A Nord Ost"},
                {id: 26, cx: 813, cy: 590, number: null, name: "Ebene A Nord West"},

                // Ebene B - 15 + 14
                {id: 27, cx: 639, cy: 624, number: null, name: "Nord Ebene B Ost"},
                {id: 28, cx: 775, cy: 624, number: null, name: "Nord Ebene B West"},

                // Ebene C - 15 + 14
                {id: 29, cx: 573, cy: 653, number: null, name: "Nord Ebene C Ost"},
                {id: 30, cx: 708, cy: 653, number: null, name: "Nord Ebene C Mitte"},
                {id: 31, cx: 843, cy: 653, number: null, name: "Nord Ebene C West"},

                // Ebene D - 15 + 14
                {id: 32, cx: 573, cy: 687, number: null, name: "Nord Ebene D Ost"},
                {id: 33, cx: 843, cy: 687, number: null, name: "Nord Ebene D West"},

                // Ebene B - 6,5,4,3,2,1
                {id: 34, cx: 519, cy: 176, number: null, name: "Ost Ebene B  südlich Sektor 5"},
                {id: 35, cx: 519, cy: 270, number: null, name: "Ost Ebene B  zwischen Sektor 4 und 5"},
                {id: 36, cx: 519, cy: 358, number: null, name: "Ost Ebene B  zwischen Sektor 3 und 4"},
                {id: 37, cx: 519, cy: 443, number: null, name: "Ost Ebene B  zwischen Sektor 2 und 3"},
                {id: 38, cx: 519, cy: 533, number: null, name: "Ost Ebene B  zwischen Sektor 1 und 2"},
                {id: 39, cx: 519, cy: 624, number: null, name: "Ost Ebene B  nördlich Sektor 1"},

                // Ebene B - 8,9,10,11,12,13
                {id: 40, cx: 896, cy: 176, number: null, name: "West Ebene B südlich Sektor 9"},
                {id: 41, cx: 896, cy: 270, number: null, name: "West Ebene B zwischen Sektor 9 und 10"},
                {id: 42, cx: 896, cy: 358, number: null, name: "West Ebene B zwischen Sektor 10 und 11"},
                {id: 43, cx: 896, cy: 443, number: null, name: "West Ebene B zwischen Sektor 11 und 12"},
                {id: 44, cx: 896, cy: 533, number: null, name: "West Ebene B zwischen Sektor 12 und 13"},
                {id: 45, cx: 896, cy: 624, number: null, name: "West Ebene B nördlich Sektor 13"},

                // Ebene C - 5,4,3,2,1
                {id: 60, cx: 459, cy: 224, number: null, name: "Ost Ebene B Sektor 5"},
                {id: 61, cx: 459, cy: 312, number: null, name: "Ost Ebene B Sektor 4"},
                {id: 62, cx: 459, cy: 400, number: null, name: "Ost Ebene B Sektor 3"},
                {id: 63, cx: 459, cy: 488, number: null, name: "Ost Ebene B Sektor 2"},
                {id: 64, cx: 459, cy: 576, number: null, name: "Ost Ebene B  Sektor 1"},

                // Ebene C - 9,10,11,12,13
                {id: 67, cx: 956, cy: 224, number: null, name: "West Ebene C Sektor 9"},
                {id: 46, cx: 956, cy: 312, number: null, name: "West Ebene C Sektor 10"},
                {id: 47, cx: 956, cy: 400, number: null, name: "West Ebene C Sektor 11"},
                {id: 48, cx: 956, cy: 488, number: null, name: "West Ebene C Sektor 12"},
                {id: 49, cx: 956, cy: 576, number: null, name: "West Ebene C Sektor 13"},

                // Ebene D - 5,4,3,2,1
                {id: 50, cx: 368, cy: 201, number: null, name: "Ost Ebene D Sektor 5"},
                {id: 51, cx: 368, cy: 338, number: null, name: "Ost Ebene D Sektor 4"},
                {id: 52, cx: 368, cy: 428, number: null, name: "Ost Ebene D Sektor 3"},
                {id: 53, cx: 368, cy: 518, number: null, name: "Ost Ebene D Sektor 2"},
                {id: 54, cx: 368, cy: 600, number: null, name: "Ost Ebene D Sektor 1"},

                // Ebene D - 9,10,11,12,13
                {id: 55, cx: 1054, cy: 201, number: null, name: "West Ebene D Sektor 9"},
                {id: 56, cx: 1054, cy: 338, number: null, name: "West Ebene D Sektor 10"},
                {id: 57, cx: 1054, cy: 428, number: null, name: "West Ebene D Sektor 11"},
                {id: 58, cx: 1054, cy: 518, number: null, name: "West Ebene D Sektor 12"},
                {id: 59, cx: 1054, cy: 600, number: null, name: "West Ebene D Sektor 13"},


            ]);
        }

        // Save placeholders to localStorage whenever they change
        useEffect(() => {
            if (typeof window !== "undefined") {
                if (placeholders.length > 0) {
                    localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, LOCAL_STORAGE_VERSION);
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(placeholders));
                } else {
                    console.log("Not saving placeholders, empty")
                }
            }
        }, [placeholders]);

        const handlePlaceholderClick = (id: number) => {
            setPlaceholders((prevPlaceholders) => {
                let updatedCounter = counter;
                const updatedPlaceholders = prevPlaceholders.map((placeholder) => {
                    if (placeholder.id === id) {
                        console.log(placeholder);
                        if (placeholder.number === null) {
                            updatedCounter += 1;
                            return {...placeholder, number: updatedCounter};
                        } else if (placeholder.number === counter) {
                            updatedCounter -= 1;
                            return {...placeholder, number: null};
                        }
                    }
                    return placeholder;
                });
                setCounter(updatedCounter);
                return updatedPlaceholders;
            });
        };

        // Expose methods to the parent via the ref
        useImperativeHandle(ref, () => ({
            resetAllPlaceholders() {
                setPlaceholders((prev) =>
                    prev.map((placeholder) => ({
                        ...placeholder,
                        number: null,
                    }))
                );
                setCounter(0);
            },
            logCurrentState() {
                console.log("Placeholders:", placeholders);
                console.log("Counter:", counter);
            },
        }));

        return (
            <svg
                id="svg-plan"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1300 900"
                className={"max-h-screen min-h-screen h-screen mx-auto w-screen lg:w-full"}
            >
                {/* Background image */}
                <image
                    href={nextConfig.basePath + "/assets/planner_map.jpg"} // Replace with your image URL
                    width="1300"
                    height="900"
                />

                {/* Placeholder circles */}
                {placeholders.map((placeholder) => (
                    (!hideUnused || placeholder.number !== null) && (
                        <g
                            key={placeholder.id}
                            onClick={() => handlePlaceholderClick(placeholder.id)}
                            style={{cursor: 'pointer'}}
                        >
                            <ellipse
                                cx={placeholder.cx}
                                cy={placeholder.cy}
                                rx="15"
                                ry="15"
                                fill="#fff"
                                fillOpacity="0.6"
                                stroke="#000"
                                strokeWidth={placeholder.number !== null ? "2" : "0.5"} // Thicker border if clicked
                            />
                            {placeholder.number !== null && (
                                <text
                                    x={placeholder.cx}
                                    y={placeholder.cy}
                                    fill="#000"
                                    className="font-bold font-mono"
                                    fontSize="20"
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                >
                                    {placeholder.number}
                                </text>
                            )}
                            {placeholder.name !== null && (
                                <title>
                                    {placeholder.name}
                                </title>
                            )}
                        </g>
                    )
                ))}
            </svg>
        );
    })
;

export default SvgPlan;
