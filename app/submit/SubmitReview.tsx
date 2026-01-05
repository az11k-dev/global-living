"use client";

import React, {useState, useEffect} from "react";
import {ArrowLeft, ArrowRight, Check, Send} from "lucide-react";
import ReviewContent from "@/components/ReviewContent";
import RatingsStep from "@/components/RatingsStep";
import PricesStep from "@/components/PricesStep";
import MediaStep from "@/components/MediaStep";

const LS_KEY = "review_form_storage";

const SubmitReview = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showError, setShowError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        country: "",
        city: "",
        status: "",
        years: "",
        months: "",
        reviewTitle: "",
        reviewText: "",
        ratings: {
            overall: 5,
            value: 5,
            service: 5,
            recommend: 5
        },
        prices: [
            {id: Date.now(), category: "", label: "", amount: "", currency: "USD"}
        ],
        images: []
    });

    useEffect(() => {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
            try {
                setFormData(JSON.parse(saved));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    useEffect(() => {
        if (!isSubmitted) {
            localStorage.setItem(LS_KEY, JSON.stringify(formData));
        }
    }, [formData, isSubmitted]);

    const isStepValid = () => {
        if (currentStep === 1) {
            return formData.country && formData.city && formData.status && formData.years && formData.months;
        }
        if (currentStep === 2) {
            return formData.reviewTitle.trim() !== "" && formData.reviewText.length >= 100;
        }
        return true;
    };

    const handleNext = () => {
        if (isStepValid()) {
            if (currentStep < 5) {
                setCurrentStep((prev) => prev + 1);
                setShowError(false);
            } else {
                handleSubmit();
            }
        } else {
            setShowError(true);
        }
    };

    const handleSubmit = () => {
        console.log("Final Data:", formData);
        localStorage.removeItem(LS_KEY);
        setIsSubmitted(true);
    };

    const steps = [
        {id: 1, label: "Basic Info"},
        {id: 2, label: "Content"},
        {id: 3, label: "Ratings"},
        {id: 4, label: "Prices"},
        {id: 5, label: "Media"},
    ];

    // Progress bar kengligini 100% dan oshib ketmasligi uchun cheklaymiz
    const progressWidth = isSubmitted ? 100 : ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className="flex justify-center items-center bg-[#f8fafc] p-6 font-sans min-h-screen text-[#111827]">
            <div className="w-full max-w-[800px] bg-white rounded-2xl shadow-md border border-gray-200 p-10">
                {!isSubmitted ? (
                    <>
                        <h2 className="text-3xl font-bold mb-2 text-[#0f172a]">Submit Your Review</h2>
                        <p className="text-[#64748b] text-[15px] mb-10 font-medium">Share your experience and help
                            others make informed decisions</p>

                        {/* Stepper */}
                        <div className="relative flex items-center justify-between mb-16 ">
                            <div className="absolute top-5 left-0 w-full h-[3px] bg-gray-100 -z-0"></div>
                            <div
                                className="absolute top-5 left-0 h-[3px] bg-[#2563eb] transition-all duration-500 -z-0"
                                style={{width: `${progressWidth}%`}}
                            ></div>

                            {steps.map((step) => (
                                <div key={step.id} className="relative z-10 flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2
                                        ${currentStep > step.id ? "bg-[#2563eb] border-[#2563eb] text-white" :
                                        currentStep === step.id ? "bg-[#2563eb] border-[#2563eb] text-white shadow-[0_0_0_4px_rgba(37,99,235,0.1)]" :
                                            "bg-white border-gray-200 text-[#94a3b8]"}`}>
                                        {currentStep > step.id ? <Check size={18} strokeWidth={3}/> : step.id}
                                    </div>
                                    <span
                                        className={`absolute -bottom-8 whitespace-nowrap text-[13px] font-bold ${currentStep >= step.id ? "text-[#0f172a]" : "text-[#94a3b8]"}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="min-h-[400px]">
                            {currentStep === 1 && (
                                <div className="animate-in fade-in duration-500">
                                    <h3 className="text-[19px] font-bold mb-8 text-[#0f172a]">Basic Information</h3>
                                    <div className="grid grid-cols-2 gap-8 mb-8">
                                        <div>
                                            <label
                                                className="block text-sm font-bold text-[#334155] mb-2.5">Country</label>
                                            <select
                                                className={`w-full border rounded-[12px] p-3.5 outline-none focus:ring-2 focus:ring-blue-100 bg-white transition-all appearance-none cursor-pointer ${showError && !formData.country ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                                value={formData.country}
                                                onChange={(e) => setFormData({...formData, country: e.target.value})}
                                            >
                                                <option value="" disabled>Select country</option>
                                                <option value="Uzbekistan">Uzbekistan</option>
                                                <option value="USA">USA</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="Turkey">Turkey</option>
                                                <option value="UAE">UAE</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-bold text-[#334155] mb-2.5">City</label>
                                            <input
                                                type="text" placeholder="Enter city"
                                                className={`w-full border rounded-[12px] p-3.5 outline-none focus:ring-2 focus:ring-blue-100 transition-all ${showError && !formData.city ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                                value={formData.city}
                                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-bold text-[#334155] mb-3">Living
                                            Status</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {["Resident", "Visitor", "Expat"].map((status) => (
                                                <label
                                                    key={status}
                                                    className={`flex items-center gap-3 p-4 border rounded-[14px] cursor-pointer transition-all border-2
                                                    ${formData.status === status ? "border-[#2563eb] bg-[#eff6ff]" : (showError && !formData.status ? "border-red-500 bg-red-50" : "border-gray-100")}`}
                                                >
                                                    <div
                                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.status === status ? "border-[#2563eb]" : "border-gray-300"}`}>
                                                        {formData.status === status && <div
                                                            className="w-2.5 h-2.5 bg-[#2563eb] rounded-full"></div>}
                                                    </div>
                                                    <input type="radio" className="hidden" name="status"
                                                           checked={formData.status === status}
                                                           onChange={() => setFormData({...formData, status})}/>
                                                    <span
                                                        className="text-[15px] font-semibold text-[#334155]">{status}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-bold text-[#334155] mb-3">Duration of
                                            Stay</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="number" placeholder="Years"
                                                className={`border rounded-[12px] p-3.5 outline-none focus:ring-2 focus:ring-blue-100 ${showError && !formData.years ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                                value={formData.years}
                                                onChange={(e) => setFormData({...formData, years: e.target.value})}
                                            />
                                            <input
                                                type="number" placeholder="Months"
                                                className={`border rounded-[12px] p-3.5 outline-none focus:ring-2 focus:ring-blue-100 ${showError && !formData.months ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                                value={formData.months}
                                                onChange={(e) => setFormData({...formData, months: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 &&
                                <ReviewContent formData={formData} setFormData={setFormData} showError={showError}/>}
                            {currentStep === 3 && <RatingsStep formData={formData} setFormData={setFormData}/>}
                            {currentStep === 4 && <PricesStep formData={formData} setFormData={setFormData}/>}
                            {currentStep === 5 && <MediaStep formData={formData} setFormData={setFormData}/>}
                        </div>

                        <div className="flex flex-col items-end mt-12 pt-8 border-t border-gray-100">
                            <div className="flex justify-between w-full">
                                <button
                                    onClick={() => setCurrentStep((prev) => prev - 1)}
                                    className={`flex items-center gap-2 px-7 py-3 font-bold text-[#475569] border border-gray-200 rounded-xl hover:bg-gray-50 transition-all ${currentStep === 1 ? "invisible" : ""}`}
                                >
                                    <ArrowLeft size={18}/> Previous
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 px-10 py-3.5 font-bold bg-[#2563eb] text-white rounded-xl hover:bg-blue-700 shadow-md transition-all active:scale-95"
                                >
                                    {currentStep === 5 ? (
                                        <>Submit Review <Send size={18} className="ml-1"/></>
                                    ) : (
                                        <>Next <ArrowRight size={18}/></>
                                    )}
                                </button>
                            </div>
                            {showError && (
                                <p className="text-red-500 text-sm font-bold mt-4 animate-bounce">
                                    Please fill out all fields correctly.
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    <div
                        className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in duration-500">
                        <div
                            className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-sm">
                            <Check size={48} strokeWidth={3}/>
                        </div>
                        <h2 className="text-3xl font-bold text-[#0f172a] mb-4">Submission Successful!</h2>
                        <p className="text-[#64748b] text-lg max-w-[450px] leading-relaxed">
                            Thank you for your review. Your contribution helps thousands of people make better travel
                            and living decisions.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-10 px-10 py-4 bg-[#0f172a] text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                        >
                            Submit Another Review
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmitReview;