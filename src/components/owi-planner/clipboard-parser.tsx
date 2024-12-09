import { useState } from 'react';
import {Button} from "@/components/ui/button";
import {ClipboardCopy} from "lucide-react";

export interface EventData {
    eventName: string;
    day: string;
    date: string;
    lastName: string;
    firstName: string;
    position: string;
    start: string;
    end: string;
    fromStart: string;
    toEnd: string;
}

interface ClipboardParserProps {
    availablePositions: string[];
}

const ClipboardParser: React.FC<ClipboardParserProps> = ({ availablePositions }) => {
    const [parsedData, setParsedData] = useState<EventData[]>([]);

    const handlePositionChange = (rowIndex: number, newPosition: string) => {
        setParsedData((prevData) =>
            prevData.map((data, index) =>
                index === rowIndex ? { ...data, position: newPosition } : data
            )
        );
    };

    const handlePasteFromClipboard = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();

            const rows = clipboardText.split('\n');
            const parsedRows: EventData[] = rows
                .map(row => {
                    const columns = row.split('\t'); // Excel data is tab-separated
                    if (columns.length === 10) {
                        return {
                            eventName: columns[0],
                            day: columns[1],
                            date: columns[2],
                            lastName: columns[3],
                            firstName: columns[4],
                            position: columns[5],
                            start: columns[6],
                            end: columns[7],
                            fromStart: columns[8],
                            toEnd: columns[9],
                        };
                    }
                    return null; // Ignore invalid rows
                })
                .filter(row => row !== null) as EventData[];

            setParsedData(parsedRows);
        } catch (error) {
            console.error('Failed to read clipboard contents:', error);
        }
    };

    return (
        <div className="p-6 min-h-screen flex flex-col items-center">
            <Button onClick={handlePasteFromClipboard} className={"rounded-none"} variant={"outline"} size={"block"}>
                Paste from Clipboard <ClipboardCopy/>
            </Button>
            <table className="table-auto border-collapse border border-gray-300 bg-white shadow-lg w-full max-w-4xl pb-16">
                <thead className="bg-gray-200 text-gray-700">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Event Name</th>
                    <th className="border border-gray-300 px-4 py-2">Day</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Last Name</th>
                    <th className="border border-gray-300 px-4 py-2">First Name</th>
                    <th className="border border-gray-300 px-4 py-2">Position</th>
                    <th className="border border-gray-300 px-4 py-2">Start</th>
                    <th className="border border-gray-300 px-4 py-2">End</th>
                    <th className="border border-gray-300 px-4 py-2">From Start</th>
                    <th className="border border-gray-300 px-4 py-2">To End</th>
                </tr>
                </thead>
                <tbody>
                {parsedData.map((data, index) => (
                    <tr
                        key={index}
                        className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition`}
                    >
                        <td className="border border-gray-300 px-4 py-2">{data.eventName}</td>
                        <td className="border border-gray-300 px-4 py-2">{data.day}</td>
                        <td className="border border-gray-300 px-4 py-2">{data.date}</td>
                        <td className="border border-gray-300 px-4 py-2">{data.lastName}</td>
                        <td className="border border-gray-300 px-4 py-2">{data.firstName}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            {data.position || (
                                <select
                                    onChange={(e) => handlePositionChange(index, e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select Position
                                    </option>
                                    {availablePositions.map((pos, i) => (
                                        <option key={i} value={pos}>
                                            {pos}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">{data.start}</td>
                        <td className="border border-gray-300 px-4 py-2">{data.end}</td>
                        <td className="border border-gray-300 px-4 py-2">{data.fromStart}</td>
                        <td className="border border-gray-300 px-4 py-2">{data.toEnd}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

};

export default ClipboardParser;
