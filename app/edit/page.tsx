'use client'

import {Country, City} from "country-state-city";
import {useCallback, useEffect, useState} from "react";
import {User} from "@/types";
import Image from "next/image";
import {Camera, Check} from "lucide-react";
import {useRouter} from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const token = localStorage.getItem("token");

export default function EditPage() {
    const router = useRouter();
    const [file ,setFile]=useState<File | null >(null)
    const [position, setPosition] = useState<string>("");
    const [star, setStar] = useState<string>("Student");
    const [checked, setChecked] = useState<boolean>(false);
    const [checked2, setChecked2] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState(user?.name || "");
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('UZ');
    const [monthlyBudget, setMonthlyBudget] = useState('');
    const [interestedCountries, setInterestedCountries] = useState("");


    const countries = Country.getAllCountries();
    const cities = City.getCitiesOfCountry(country);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${BASE_URL}/api/user/me`;
        try {
            const res = await fetch(url, {cache: "no-cache", headers: {"Authorization": `Bearer ${token}`}});
            if (!res.ok) throw new Error("Failed to fetch country details");
            const data: User = await res.json();
            setUser(data);
        } catch (error) {
            console.error(`Error fetching user `, error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchUser();
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [fetchUser]);

    const fetchEdit = useCallback(async () => {
        try {
            setIsLoading(true);
            if (!file) return;
            const formData = new FormData();
            formData.append("image", file);
            formData.append("name", name);
            const response = await fetch(`${BASE_URL}/api/user/8`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name,
                    city: city,
                    country: country,
                    monthlyBudget: monthlyBudget,
                    interestedCountries: interestedCountries,
                    position: position,

                }),

            })
            router.push("/profile");
            return response.json();
        } catch (error) {
            console.error(`Error fetching edit: ${error}`);
        } finally {
            setIsLoading(false);
        }

    }, [name, city, country, monthlyBudget, interestedCountries, position ])
    if (isLoading) {
        return <div className="p-10 text-center min-h-screen flex items-center justify-center">Loading.</div>;
    }
    if (!user) {
        return <div className="p-10 text-center text-red-600">Oops! No results found.</div>;
    }


    return (
        <div key={user.id} className={"bg-gray-100 min-h-screen flex  flex-col gap-4 py-[40px] px-[150px] "}>
            <div className={"flex flex-col gap-2"}>
                <h1 className={"text-[30px] font-[600]"}>Edit Profile</h1>
                <h1 className={"text-[17px] text-gray-600"}>Update your personal information and preferences </h1>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                fetchEdit()
            }}>
                <div
                    className={" bg-gradient-to-r from-blue-50 to-green-50  rounded-xl  shadow-sm overflow-hidden border border-gray-100 pt-[20px]"}>
                    <div className={"flex justify-center "}>
                        <div className={'flex flex-col gap-4 '}>
                            <div className={'relative'}>
                                <Image src={user?.image} alt={user?.name} width={140} height={10}
                                       className={"rounded-full"}/>
                                <label
                                    className={'cursor-pointer absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors border-2 boder-white'}>
                                    <Camera/>
                                </label>
                            </div>
                            <label
                                className={"text-center cursor-pointer text-[#2563EB] font-[600] bg-white rounded-xl  shadow-sm overflow-hidden border border-gray-100 p-[10px]"}>
                                Change Photo
                                <input
                                    type="file"
                                    accept={"image/*"}
                                    onChange={(e)=>setFile(e.target.files?.[0] || null)}
                                    className={'hidden'}/>
                            </label>
                            <h1 className={'text-center text-[20px] font-[600]'}>{user?.name}</h1>
                        </div>
                    </div>
                    <div className={'bg-white mt-[10px] p-[20px]'}>
                        <h1 className={' text-[20px] font-[600]'}>Personal Information</h1>
                        <div className={'py-[10px] border-b border-gray-200'}></div>
                        <div className={'grid grid-cols-2 justify-between gap-5'}>
                            <div>
                                <div className={'flex flex-col gap-2 py-[10px]'}>
                                    <label htmlFor="name">Full Name</label>
                                    <input className={' border-1 border-gray-400 p-[10px] rounded-xl mt-[5px]'}
                                           type="text"
                                           value={name}
                                           id="name"
                                           onChange={(e) => setName(e.target.value)} placeholder="Full Name"/>
                                </div>

                            </div>
                            <div>
                                <div className={'flex flex-col gap-2 py-[10px]'}>
                                    <label htmlFor="name">Email Address</label>
                                    <div className={' border-1 border-gray-400 p-[10px] rounded-xl'}>{user?.email}</div>
                                </div>
                                <h1 className={'text-[12px] text-gray-600 mt-[5px]'}>Email cannot be changed</h1>
                            </div>
                            <div>
                                <div className={'flex flex-col gap-2 py-[10px]'}>
                                    <label htmlFor="name">Country</label>
                                    <select value={country} onChange={(e) => setCountry(e.target.value)}
                                            className="border-1 border-gray-400 p-[10px] rounded-xl mt-[5px]">
                                        {countries.map((c) => (
                                            <option key={c.isoCode} value={c.isoCode}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className={'flex flex-col gap-2 py-[10px]'}>
                                    <label htmlFor="name">City</label>
                                    <select className=" border-1 border-gray-400 p-[10px] rounded-xl mt-[5px]">
                                        {cities?.map((city) => (
                                            <option key={city.name} value={city.name}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name">User Type</label>
                                <label
                                    className={`cursor-pointer mt-[20px] flex items-center gap-4  p-[10px] rounded-xl ${star === "Student" ? "bg-[#EFF6FF] border-2 border-[#3B82F6]" : "bg-white border-1 border-gray-400"} `}>
                                    <input type="radio" name={'userType'} value={'Student'} className={'w-5 h-5'}
                                           onChange={(e) => {
                                               setStar("Student");
                                               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                               // @ts-expect-error
                                               setPosition(e.target.value);
                                           }}
                                           checked={star === "Student"}

                                    />
                                    <div>
                                        <h1 className={'text-[18px] font-600'}>Student</h1>
                                        <h1>Studying abroad or planning to</h1>
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label
                                    className={`cursor-pointer mt-[45px] flex items-center gap-4  p-[10px] rounded-xl ${star === "Worker" ? "bg-[#EFF6FF]  border-2 border-[#3B82F6]" : "bg-white border-1 border-gray-400"}`}>
                                    <input type="radio" name={'userType'} value={'Worker'}
                                           checked={star === "Worker"}
                                           onChange={(e) => {
                                               setStar("Worker");
                                               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                               // @ts-expect-error


                                               setPosition(e.target.value);
                                           }}
                                           className={'w-5 h-5'}/>
                                    <div>
                                        <h1 className={'text-[18px] font-600'}>Worker</h1>
                                        <h1>Studying abroad or planning to</h1>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className={"py-[20px]"}>
                            <h1 className={' text-[20px] font-[600]'}>Preferences</h1>
                            <div className={'py-[10px] border-b border-gray-200'}></div>
                            <div className={'py-[10px]'}>
                                <h1 className={'text-[#374151] font-[600]'}>Interested Countries</h1>
                                <div className={'grid grid-cols-3 gap-4 py-[10px]'}>
                                    <label
                                        className={`cursor-pointer flex items-center gap-4    p-[10px] rounded-xl ${checked ? "bg-[#EFF6FF] border-2 border-[#3B82F6]" : "bg-white border-1 border-gray-400"}`}>
                                        <input type={"checkbox"} name={'userType'} className={'w-4 h-4'}
                                               checked={checked}
                                               onChange={(e) => {
                                                   setChecked(!checked);
                                                   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                   // @ts-expect-error
                                                   setInterestedCountries(e.target.checked);
                                               }}/>
                                        <span>France</span>
                                    </label>
                                    <label
                                        className={`cursor-pointer flex items-center gap-4   ${checked2 ? "bg-[#EFF6FF] border-2 border-[#3B82F6]" : "bg-white border-1 border-gray-400"} p-[10px] rounded-xl`}>
                                        <input type={"checkbox"} name={'userType'} className={'w-4 h-4'}
                                               checked={checked2}
                                               onChange={(e) => {
                                                   setChecked2(!checked2);
                                                   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                   // @ts-expect-error
                                                   setInterestedCountries(e.target.checked);
                                               }}/>
                                        <span> United States</span>
                                    </label>
                                </div>
                                <h1 className={'text-[12px] text-gray-600 mt-[5px]'}>{"Select countries you're interested in exploring"}</h1>
                                <div className={'py-[20px]'}>
                                    <label className={'text-[18px] font-[600] mt-[10px]'}>Monthly Budget Range
                                        (USD)</label>
                                    <select value={monthlyBudget} onChange={(e) => setMonthlyBudget(e.target.value)}
                                            className={'w-full mt-[10px] border-1 border-gray-400 p-[20px] rounded-xl'}>
                                        <option>$1,000</option>
                                        <option>$1,000-$2,000</option>
                                        <option>$2,000-$3,000</option>
                                        <option>$3,000</option>
                                    </select>
                                    <h1 className={'text-[12px] text-gray-600 mt-[5px]'}>This helps us show relevany
                                        cost
                                        comparisons</h1>
                                </div>
                                <div>
                                    <label className={'text-[18px] font-[600] mt-[10px]'}>Lifestyle Preferences</label>
                                    <textarea rows={4}
                                              placeholder={"Tell us about lifestyle preferences, hobbies,or what you're looking for in a city "}
                                              className={'w-full mt-[10px]  border-1 border-gray-400 p-[20px] rounded-xl'}></textarea>
                                </div>
                                <div className={'py-[10px] border-b border-gray-200'}></div>
                                <div className={'flex items-center justify-end gap-4 py-[20px]'}>
                                    <button type="button"
                                            className={' border-1 border-gray-400 px-6 py-3 rounded-xl cursor-pointer'}>
                                        Cancel
                                    </button>
                                    <button
                                        onClick={fetchEdit}
                                        className={'flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-[600] cursor-pointer'}>
                                        <Check/>
                                        <h1>Save Cahnges </h1>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>


    )
}
