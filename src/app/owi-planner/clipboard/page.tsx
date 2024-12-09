"use client";
import Background from "@/components/owi-planner/background";
import {ModeToggle} from "@/components/theme-toggle";
import ClipboardParser from "@/components/owi-planner/clipboard-parser";
import {TooltipProvider} from "@/components/ui/tooltip";
import nextConfig from "../../../../next.config";

export default function Index() {

    return (
        <main>
            <TooltipProvider>
                <Background>
                    <div className="lg:container mx-auto flex justify-stretch min-h-screen">
                        <div className="border-r bg-background lg:w-full flex flex-col lg:flex-row justify-stretch border-muted border-l">
                            <div className="lg:w-16 bg-background">
                                <div
                                    className={"flex-row lg:flex-col justify-self-center lg:justify-self-auto justify-stretch"}>

                                </div>
                            </div>
                            <div className="border-muted border-l">
                                <ClipboardParser />
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
