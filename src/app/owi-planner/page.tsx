"use client";
import {useRef, useState} from "react";
import {toPng} from "html-to-image";
import SvgPlan from "@/components/owi-planner/svg-plan";
import {Button} from "@/components/ui/button";
import {EyeClosed, EyeOff, ImageDown, RotateCcw} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Background from "@/components/owi-planner/background";
import nextConfig from "../../../next.config";
import {ModeToggle} from "@/components/theme-toggle";

export default function Index() {
    const [hideUnused, setHideUnused] = useState(false);
    const svgPlanRef = useRef<any>(null);

    const resetPlaceholders = () => {
        if (svgPlanRef.current) {
            svgPlanRef.current.resetAllPlaceholders();
        }
    };

    const handleDownload = () => {
        const svgElement = document.getElementById("svg-plan");
        if (svgElement) {
            toPng(svgElement)
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = "plan.png";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch((error) => {
                    console.error("Error generating PNG:", error);
                });
        }
    };

    return (
        <main>
            <TooltipProvider>
                <Background>
                    <div className="lg:container mx-auto flex justify-stretch max-h-screen min-h-screen h-screen">
                        <div className="border-r bg-background lg:w-full flex flex-col lg:flex-row justify-stretch border-muted border-l">
                            <div className="lg:w-16 bg-background">
                                <div
                                    className={"flex-row lg:flex-col justify-self-center lg:justify-self-auto justify-stretch"}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button className={"rounded-none border-b border-muted"} variant={"ghost"}
                                                    size={"block"} onClick={() => setHideUnused(!hideUnused)}>
                                                {hideUnused ? <EyeClosed/> : <EyeOff/>}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{hideUnused ? "Show all positions" : "Hide unused positions"}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button className={"rounded-none border-b border-muted"} variant={"ghost"}
                                                    size={"block"} onClick={resetPlaceholders}><RotateCcw/></Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Reset all positions</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button className={"rounded-none border-b border-muted"} variant={"ghost"}
                                                    size={"block"} onClick={handleDownload}><ImageDown/></Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Download as PNG</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="border-muted border-l">
                                <SvgPlan ref={svgPlanRef} hideUnused={hideUnused}/>
                            </div>
                        </div>
                    </div>
                    <footer>
                        <div
                            className="lg:container bg-background border border-muted backdrop-blur-lg flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
                            <a href="#">
                                <img className="w-auto h-3 dark:invert" src={nextConfig.basePath+"/sojourner-dev-logo.svg"} alt="Sojourner Development Logo"/>
                            </a>

                            <p className="text-sm text-gray-600 dark:text-gray-300">© Copyright 2025. All Rights
                                Reserved.</p>

                            <div className="flex -mx-2">
                                <ModeToggle/>
                            </div>
                        </div>
                    </footer>
                </Background>
            </TooltipProvider>
        </main>
    )
        ;
}
