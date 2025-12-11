import Link from "next/link";

const data = [
    {
        id: 1,
        name: "Namangan",
        description: "Lorem ipsum is placeholder",
        rating: 4,
        image: "https://pub-396d22cca10644eeba822f5e89000a8a.r2.dev/pecs.webp"
    },
    {
        id: 2,
        name: "Namangan",
        description: "Lorem ipsum is placeholder",
        rating: 4,
        image: "https://pub-396d22cca10644eeba822f5e89000a8a.r2.dev/pecs.webp"
    },
    {
        id: 3,
        name: "Namangan",
        description: "Lorem ipsum is placeholder",
        rating: 4,
        image: "https://pub-396d22cca10644eeba822f5e89000a8a.r2.dev/pecs.webp"
    },
    {
        id: 4,
        name: "Namangan",
        description: "Lorem ipsum is placeholder",
        rating: 4,
        image: "https://pub-396d22cca10644eeba822f5e89000a8a.r2.dev/pecs.webp"
    }
]
export default function PopularCities() {
    return (
        <div>
            <div>
                <div className={"flex items-center justify-between"}>
                    <h1 className={"text-[20px] font-[700]"}>
                        Popular Cities
                    </h1>
                    <Link href={"/cities?country=uzbekistan"} className={"text-[18px] font-[600] text-blue-600"}>View
                        All </Link>
                </div>
                <div className={"flex items-center justify-between py-[20px] gap-5"}>
                    {data.map((item, index) => (
                        <div key={index}
                             className={"flex flex-col bg-white rounded-xl shadow-sm   cursor-pointer overflow-hidden border border-gray-100  h-full"}>
                            <img src={item.image} alt=""/>
                            <div className={"p-[20px]"}>
                                <h1 className={"text-[20px] font-[600]"}>{item.name}</h1>
                                <h1 className={"text-gray-700"}>{item.description}</h1>
                                <div className={"py-[10px] flex items-center justify-between"}>
                                    <h1 className={"text-[18px]"}>{item.rating}</h1>
                                    <h1 className={"text-gray-700"}>1,234 reviews</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
