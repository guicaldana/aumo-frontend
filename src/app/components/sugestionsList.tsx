import { SugestionCard } from "./sugestion-card";

export const SugestionList = () =>{
    return (
        <div>
            <h2 className="text-xl font-semibold">Sugestions</h2>
            <p className="text-gray-500">People you may know</p>
        <div className="flex gap-4 ">
            <div className="flex flex-row ">
                <div className="pr-1">
                        <SugestionCard />
                </div>
                <div className="pr-1">
                        <SugestionCard />
                </div>
                <div className="pr-1">
                        <SugestionCard />
                </div>
                <div className="pr-1">
                        <SugestionCard />
                </div>
                <div className="pr-1">
                        <SugestionCard />
                </div>
            </div>
        </div>
        </div>
    );
};