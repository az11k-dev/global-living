import React from 'react';
import {Star, Bookmark, Share2, MapPin, Calendar} from 'lucide-react';
import Receipts from "@/components/Receipts";

interface Rating {
    name: string;
    score: number;
    color: string;
}

const Reviews: React.FC = () => {
    const ratings: Rating[] = [
        {name: 'Cost of Living', score: 3.5, color: 'bg-yellow-500'},
        {name: 'Safety', score: 5.0, color: 'bg-green-500'},
        {name: 'Healthcare', score: 4.0, color: 'bg-blue-600'},
        {name: 'Transport', score: 4.5, color: 'bg-blue-600'},
        {name: 'Friendly People', score: 5.0, color: 'bg-green-500'},
        {name: 'Climate', score: 4.8, color: 'bg-green-500'},
        {name: 'Bureaucracy', score: 2.0, color: 'bg-red-500'},
    ];

    return (
        <div>
            <div className=" mx-27 pt-10 bg-gray-50 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
                    <div className="flex justify-between items-center mb-6">
                        <span
                            className="bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full border border-green-100">Verified Stay</span>
                        <span className="text-gray-400 text-sm">Posted on Oct 12, 2023</span>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800 leading-tight mb-8">Living in Lisbon: A Digital
                        Nomad's Dream for 3 Months</h1>
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-50">
                        <div className="flex items-center gap-4">
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="Sarah"
                                className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                            />
                            <div>
                                <h4 className="text-lg font-bold text-slate-700 leading-none">Sarah Jenkins</h4>
                                <div className="flex items-center gap-4 mt-1 text-slate-400 text-sm">
                                    <span className="flex items-center gap-1.5"><MapPin size={14}
                                                                                        className="text-blue-500"/> Lisbon, Portugal</span>
                                    <span className="flex items-center gap-1.5"><Calendar size={14}
                                                                                          className="text-blue-500"/> 3 Months Stay</span>
                                </div>
                            </div>

                        </div>
                        <div className="flex gap-4 text-slate-400">
                            <Bookmark className="cursor-pointer hover:text-slate-600 transition-colors" size={22}/>
                            <Share2 className="cursor-pointer hover:text-slate-600 transition-colors" size={22}/>
                        </div>
                    </div>

                    <div className="text-slate-600 text-lg leading-relaxed space-y-6">
                        <p>Lisbon has completely stolen my heart. I came here expecting good weather and nice tiles,
                            but I
                            found a vibrant community, incredible food, and a pace of life that just makes sense. The
                            digital nomad scene here is massive, perhaps a bit too crowded in some coworking spaces, but
                            that means it's incredibly easy to make friends.
                        </p>
                        <p>
                            <span className="font-bold text-slate-800">The Good:</span> The weather is fantastic, even
                            in
                            October.
                            Public transport is affordable and reliable (mostly). The coffee culture is top-notch and
                            very affordable compared to London or NYC.
                        </p>
                        <p>
                            <span className="font-bold text-slate-800">The Challenges:</span> Bureaucracy can be a
                            nightmare
                            if
                            you need to deal with visas or official paperwork. Rent prices have skyrocketed in the last
                            year,
                            pushing locals out of the center, which is a sensitive topic you should be aware of.
                        </p>
                        <p className="pt-4">
                            Overall, I highly recommend Lisbon for a 1-3 month stint. It's safe, walkable, and visually
                            stunning
                            at every turn. Just be respectful of the local culture and try to learn some Portuguese!
                        </p>
                        <p className="pt-4">
                            Overall, I highly recommend Lisbon for a 1-3 month stint. It's safe, walkable, and visually
                            stunning
                            at every turn. Just be respectful of the local culture and try to learn some Portuguese!
                        </p>
                    </div>
                </div>


                <div className="w-full md:w-96 flex flex-col ">

                    <div className="bg-blue-500 rounded-t-2xl p-8 text-center text-white shadow-xl shadow-blue-100">
                        <div className="text-7xl font-bold ">4.8</div>
                        <div className="flex justify-center gap-1.5 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={22}
                                    fill={i < 4 ? "rgb(250 204 21)" : "none"}
                                    className={i < 4 ? "text-yellow-400" : "text-yellow-400"}
                                />
                            ))}

                        </div>
                        <p>Excellent Score</p>
                    </div>

                    <div className="bg-white rounded-b-2xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-8">Category Ratings</h3>
                        <div className="space-y-6">
                            {ratings.map((item) => (
                                <div key={item.name}>
                                    <div
                                        className="flex justify-between items-center text-sm font-bold text-slate-700 mb-2">
                                        <span>{item.name}</span>
                                        <span className="text-slate-800">{item.score.toFixed(1)}/5</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${item.color} rounded-full transition-all duration-500`}
                                            style={{width: `${(item.score / 5) * 100}%`}}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Receipts/>

        </div>
    );
};

export default Reviews;




