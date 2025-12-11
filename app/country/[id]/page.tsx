import CountryDetails from "@/components/CountryDetails";
import AggregetedPrice from "@/components/AggregetedPrice";
import PopularCities from "@/components/PopularCities";

export default function CountryPage() {
 return(
     <div className={"px-[100px] py-[40px] bg-gray-100"}>
         <CountryDetails/>
         <AggregetedPrice/>
         <PopularCities/>
     </div>
 )
}
