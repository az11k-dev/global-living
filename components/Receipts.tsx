"use client";

import React, {useState, useEffect} from "react";
import {House, Utensils, Bus, Dumbbell, ChevronsUpDown, ThumbsUp} from 'lucide-react';

const LOCAL_STORAGE_KEY = "receipts_discussion_data";

interface Reply {
    id: number;
    user: string;
    avatar: string;
    text: string;
    time: string;
    likes: number;
    isAuthor?: boolean;
}

interface Comment {
    id: number;
    user: string;
    avatar: string;
    text: string;
    time: string;
    likes: number;
    replies: Reply[];
}

const Receipts = () => {
    const [commentText, setCommentText] = useState("");
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const savedComments = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedComments) {
            try {
                setComments(JSON.parse(savedComments));
            } catch (e) {
                console.error("LocalStorage ma'lumotlarini o'qishda xato:", e);
            }
        } else {
            const initialComments: Comment[] = [
                {
                    id: 1,
                    user: "Mark Wilson",
                    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                    text: "Great review! Did you find it difficult to find an apartment for just 3 months?",
                    time: "2d ago",
                    likes: 0,
                    replies: [
                        {
                            id: 101,
                            user: "Sarah Jenkins",
                            isAuthor: true,
                            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                            text: "Hey Mark! Yes, it was tricky.",
                            time: "1d ago",
                            likes: 0,
                        }
                    ]
                },
                {
                    id: 2,
                    user: "Elena Rodriguez",
                    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                    text: "Totally agree about the coffee culture! The 'bicas' are the best.",
                    time: "5h ago",
                    likes: 0,
                    replies: []
                }
            ];
            setComments(initialComments);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialComments));
        }
    }, []);


    const updateAndSave = (newComments: Comment[]) => {
        setComments(newComments);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newComments));
    };

    const displayComments = showAll ? comments : comments.slice(0, 2);

    const handlePostComment = () => {
        if (!commentText.trim()) return;
        const newComment: Comment = {
            id: Date.now(),
            user: "You (Guest)",
            avatar: "https://randomuser.me/api/portraits/men/44.jpg",
            text: commentText,
            time: "Just now",
            likes: 0,
            replies: []
        };
        updateAndSave([newComment, ...comments]);
        setCommentText("");
    };

    const handlePostReply = (parentId: number) => {
        if (!replyText.trim()) return;
        const newReply: Reply = {
            id: Date.now(),
            user: "You (Guest)",
            avatar: "https://randomuser.me/api/portraits/men/44.jpg",
            text: replyText,
            time: "Just now",
            likes: 0,
        };
        const updatedComments = comments.map((c) =>
            c.id === parentId ? {...c, replies: [...(c.replies || []), newReply]} : c
        );
        updateAndSave(updatedComments);
        setReplyText("");
        setReplyingTo(null);
    };

    const toggleLike = (id: number, isReply = false, parentId: number | null = null) => {
        const updatedComments = comments.map(c => {
            if (!isReply && c.id === id) return {...c, likes: c.likes + 1};
            if (isReply && c.id === parentId) {
                return {
                    ...c,
                    replies: c.replies.map(r => r.id === id ? {...r, likes: r.likes + 1} : r)
                };
            }
            return c;
        });
        updateAndSave(updatedComments);
    };

    return (
        <div className="flex justify-between bg-gray-50 mx-27 gap-7 mb-5 ">
            <div className="flex-1">
                <div className="bg-white rounded-lg p-7 shadow-sm border border-gray-200 mt-10">
                    <p className="text-[18px] font-bold">Photos & Receipts</p>
                    <div className="flex gap-10 pt-7">
                        {[1, 2, 3, 4].map((img) => (
                            <img key={img} src="/images/tree.png" className="w-[274px] rounded-[10px]" alt="receipt"/>
                        ))}
                    </div>
                </div>

                <div className="bg-white mt-10 rounded-lg p-7 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-[18px] font-bold">Discussion ({comments.length})</p>
                        <ChevronsUpDown size={20} className="text-gray-400 cursor-pointer"/>
                    </div>

                    <div className="flex gap-6 mb-12">
                        <img
                            src="https://randomuser.me/api/portraits/men/44.jpg"
                            className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm"
                            alt="user"
                        />
                        <div
                            className="flex-1 border border-gray-200 rounded-lg overflow-hidden shadow-sm focus-within:border-blue-400 transition-all">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Ask Sarah a question or share your thoughts..."
                                className="w-full p-4 outline-none min-h-[110px] resize-none text-[15px] text-gray-600 placeholder:text-gray-300"
                            />
                            <button
                                onClick={handlePostComment}
                                className="bg-[#3B82F6] ml-3 mb-3 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold text-[14px] transition-colors shadow-sm"
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {displayComments.map((comment) => (
                            <div key={comment.id} className="space-y-4">
                                <div className="flex gap-4">
                                    <img src={comment.avatar} className="w-11 h-11 rounded-full border border-gray-100"
                                         alt={comment.user}/>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[15px]">{comment.user}</h4>
                                        <p className="text-gray-700 mt-1 leading-relaxed text-[15px]">{comment.text}</p>
                                        <div
                                            className="flex items-center gap-5 mt-3 text-[13px] text-gray-400 font-medium">
                                            <span>{comment.time}</span>
                                            <button onClick={() => setReplyingTo(comment.id)}
                                                    className="hover:text-blue-600 font-bold uppercase text-[11px]">Reply
                                            </button>
                                            <button onClick={() => toggleLike(comment.id)}
                                                    className="flex items-center gap-1.5 hover:text-blue-600 font-bold transition-colors">
                                                <ThumbsUp size={14}/> {comment.likes}
                                            </button>
                                        </div>

                                        {replyingTo === comment.id && (
                                            <div className="mt-4 flex gap-2">
                                                <input
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    className="flex-1 border rounded-lg p-2 text-sm outline-none focus:border-blue-400"
                                                    placeholder="Write a reply..."
                                                />
                                                <button onClick={() => handlePostReply(comment.id)}
                                                        className="bg-blue-500 text-white px-4 py-1 rounded-md text-xs font-bold">Reply
                                                </button>
                                                <button onClick={() => setReplyingTo(null)}
                                                        className="text-gray-400 text-xs px-2">Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {comment.replies.map(reply => (
                                    <div key={reply.id}
                                         className="ml-14 flex gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-gray-50">
                                        <img src={reply.avatar} className="w-9 h-9 rounded-full" alt={reply.user}/>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-[14px]">{reply.user}</span>
                                                {reply.isAuthor && <span
                                                    className="bg-[#DBEAFE] text-[#2563EB] text-[10px] font-extrabold px-2 py-0.5 rounded tracking-tight">AUTHOR</span>}
                                            </div>
                                            <p className="text-gray-700 text-[14px] mt-1">{reply.text}</p>
                                            <div
                                                className="flex items-center gap-5 mt-2 text-[12px] text-gray-400 font-medium">
                                                <span>{reply.time}</span>
                                                <button onClick={() => toggleLike(reply.id, true, comment.id)}
                                                        className="flex items-center gap-1 font-bold hover:text-blue-600">
                                                    <ThumbsUp size={12}/> {reply.likes}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center border-t border-gray-100 pt-6">
                        {showAll ? (
                            <button onClick={() => setShowAll(false)}
                                    className="text-[#2563EB] font-medium text-[14px] hover:underline">
                                Show less
                            </button>
                        ) : (
                            comments.length > 2 && (
                                <button onClick={() => setShowAll(true)}
                                        className="text-[#2563EB] font-medium text-[14px] hover:underline">
                                    View all {comments.length} comments
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className="w-[23%] flex flex-col gap-8">
                {/* Monthly Costs */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h2 className="text-[22px] font-bold pb-4 mb-6">Monthly Costs</h2>
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-gray-500 font-medium">Total Spent</span>
                        <span className="text-[28px] font-bold">€2,150</span>
                    </div>
                    <div className="space-y-3">
                        {[
                            {
                                id: 1,
                                title: "Rent & Utilities",
                                desc: "1 Bedroom Center",
                                amount: "€1,200",
                                icon: House,
                                iconColor: "text-blue-500",
                                bgColor: "bg-blue-50"
                            },
                            {
                                id: 2,
                                title: "Food & Dining",
                                desc: "Groceries + Eating out",
                                amount: "€600",
                                icon: Utensils,
                                iconColor: "text-green-500",
                                bgColor: "bg-green-50"
                            },
                            {
                                id: 3,
                                title: "Transport",
                                desc: "Metro pass + Uber",
                                amount: "€150",
                                icon: Bus,
                                iconColor: "text-yellow-500",
                                bgColor: "bg-yellow-50"
                            },
                            {
                                id: 4,
                                title: "Other",
                                desc: "Gym, SIM, Fun",
                                amount: "€200",
                                icon: Dumbbell,
                                iconColor: "text-purple-500",
                                bgColor: "bg-purple-50"
                            },
                        ].map(item => {
                            const Icon = item.icon;
                            return (
                                <div key={item.id}
                                     className="flex items-center justify-between p-4 bg-[#F8F9FB] rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center`}>
                                            <Icon className={item.iconColor} size={20}/>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[15px]">{item.title}</h4>
                                            <p className="text-gray-400 text-[13px]">{item.desc}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold">{item.amount}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h2 className="text-[20px] font-bold mb-6">Similar Reviews</h2>
                    <div className="space-y-6">
                        {[
                            {
                                id: 1,
                                title: "Porto: The Underrated Gem",
                                rating: "4.9",
                                user: "Mike T.",
                                date: "Jan 2023"
                            },
                            {
                                id: 2,
                                title: "Madeira for Remote Work",
                                rating: "4.7",
                                user: "Jessica L.",
                                date: "Sep 2023"
                            },
                            {id: 3, title: "Barcelona vs Lisbon", rating: "4.2", user: "Alex R.", date: "Aug 2023"},
                        ].map(review => (
                            <div key={review.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                <div className="flex justify-between items-start gap-2">
                                    <h4 className="text-[#2563EB] font-bold text-[15px] leading-tight hover:underline cursor-pointer">{review.title}</h4>
                                    <span
                                        className="bg-green-50 text-green-600 text-[12px] font-bold px-2 py-0.5 rounded-full">{review.rating}</span>
                                </div>
                                <div
                                    className="flex justify-between items-center mt-3 text-gray-400 text-[12px] font-medium">
                                    <span>👤 {review.user}</span>
                                    <span>📅 {review.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Receipts;